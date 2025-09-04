import { promises as fs } from 'fs';
import * as dotenv from 'dotenv';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import * as readline from 'readline';
import * as nodefs from 'fs';
import * as path from 'path';


// 환경 변수 로드
dotenv.config();

// YouTube API 스코프
const SCOPES = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube'
];

// 토큰 저장 경로
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';

// 업로드 옵션 인터페이스
interface UploadOptions {
  title: string;
  description?: string;
  tags?: string[];
  privacy?: 'public' | 'public' | 'unlisted';
  shorts?: boolean;
}

// 슬라이드 데이터(=메타데이터) 타입
interface SlidesData {
  title: string;
  script?: string;
}

/**
 * YouTube 쇼츠 업로드 메인 함수
 */
export async function uploadShorts(
  videoFilePath: string,
  options: UploadOptions
): Promise<any> {
  console.log('🚀 YouTube 쇼츠 업로드 시작...');
  console.log(`📹 비디오 파일: ${videoFilePath}`);
  console.log(`📝 제목: ${options.title}`);
  
  try {
    // 1. 인증 설정
    console.log('\n🔐 YouTube API 인증 중...');
    const auth = await authenticate();
    
    // 2. YouTube API 클라이언트 생성
    const youtube = google.youtube({ version: 'v3', auth });
    
    // 3. 비디오 업로드
    console.log('\n📤 비디오 업로드 중...');
    const uploadResult = await uploadVideo(youtube, videoFilePath, options);
    
    console.log('\n✅ YouTube 쇼츠 업로드 완료!');
    console.log(`🎬 비디오 ID: ${uploadResult.id}`);
    console.log(`🔗 YouTube 링크: https://www.youtube.com/watch?v=${uploadResult.id}`);
    
    return uploadResult;
  } catch (error) {
    console.error('❌ YouTube 업로드 중 오류 발생:', error);
    throw error;
  }
}

/**
 * YouTube API 인증
 */
async function authenticate(): Promise<OAuth2Client> {
  // 클라이언트 시크릿 파일 확인
  const credentialsPath = 'client_secret.json';
  // 인증 파일명에 따라 토큰 경로를 동적으로 생성
  const tokenSuffix = credentialsPath.replace(/^client_secret_/, '').replace(/\.json$/, '');
  const TOKEN_PATH_DYNAMIC = TOKEN_DIR + `youtube-nodejs-upload-${tokenSuffix}.json`;
  
  try {
    await fs.access(credentialsPath);
  } catch {
    throw new Error(
      `❌ 클라이언트 시크릿 파일이 없습니다: ${credentialsPath}\n`
    );
  }

  // 클라이언트 시크릿 로드
  const credentials = JSON.parse(await fs.readFile(credentialsPath, 'utf-8'));
  
  // credentials 구조 확인
  if (!credentials.installed && !credentials.web) {
    throw new Error(
      `❌ 클라이언트 시크릿 파일의 구조가 올바르지 않습니다.\n` +
      `'installed' 또는 'web' 키가 필요합니다.\n` +
      `파일을 확인하고 올바른 OAuth 2.0 클라이언트 ID를 사용하세요.`
    );
  }
  
  const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
  
  // redirect_uris 안전성 검사
  if (!redirect_uris || !Array.isArray(redirect_uris) || redirect_uris.length === 0) {
    throw new Error(
      `❌ 클라이언트 시크릿 파일의 redirect_uris가 올바르지 않습니다.\n` +
      `파일을 확인하고 올바른 OAuth 2.0 클라이언트 ID를 사용하세요.\n` +
      `현재 redirect_uris: ${JSON.stringify(redirect_uris)}`
    );
  }
  
  const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

  // 기존 토큰 확인
  try {
    const token = await fs.readFile(TOKEN_PATH_DYNAMIC, 'utf-8');
    oAuth2Client.setCredentials(JSON.parse(token));
    console.log('✅ 기존 인증 토큰 사용');
    return oAuth2Client;
  } catch {
    // 새 토큰 생성
    console.log('🔑 새 인증 토큰 생성 중...');
    return await getNewToken(oAuth2Client, TOKEN_PATH_DYNAMIC);
  }
}
/**
 * 새 인증 토큰 생성
 */
async function getNewToken(oAuth2Client: OAuth2Client, TOKEN_PATH_DYNAMIC: string): Promise<OAuth2Client> {
  // 인증 URL 생성 시 로컬호스트 리디렉션 문제를 방지하기 위한 설정
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    // 로컬호스트 리디렉션 문제를 방지하기 위해 prompt 옵션 추가
    prompt: 'consent',
  });

  console.log('\n🌐 인증 과정 안내:');
  console.log('1. 아래 URL을 복사하여 브라우저에서 열어주세요:');
  console.log('\x1b[36m%s\x1b[0m', authUrl); // 파란색으로 URL 강조
  console.log('2. Google 계정으로 로그인하고 권한을 허용해주세요.');
  console.log('3. 인증 후 브라우저에 표시되는 코드를 복사하세요.');
  console.log('   (만약 "localhost에서 연결을 거부했습니다" 오류가 발생하면,');
  console.log('    브라우저 주소창에서 "code=" 다음에 오는 값을 복사하세요.)');
  console.log('4. 아래에 복사한 코드를 붙여넣고 Enter를 누르세요.\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question('인증 코드를 입력하세요: ', async (code) => {
      rl.close();
      
      // URL에서 코드를 추출한 경우 처리
      let authCode = code.trim();
      if (authCode.includes('code=')) {
        authCode = authCode.split('code=')[1].split('&')[0];
        console.log('URL에서 코드를 추출했습니다:', authCode);
      }
      
      try {
        const { tokens } = await oAuth2Client.getToken(authCode);
        oAuth2Client.setCredentials(tokens);

        // 토큰 저장
        await fs.mkdir(TOKEN_DIR, { recursive: true });
        await fs.writeFile(TOKEN_PATH_DYNAMIC, JSON.stringify(tokens));
        console.log('✅ 인증 토큰이 저장되었습니다:', TOKEN_PATH_DYNAMIC);
        
        resolve(oAuth2Client);
      } catch (error) {
        console.error('❌ 토큰 획득 실패:', error);
        console.error('인증 코드가 올바르지 않거나 만료되었을 수 있습니다.');
        console.error('다시 시도하려면 프로그램을 재실행하세요.');
        reject(error);
      }
    });
  });
}

/**
 * 비디오 업로드
 */
async function uploadVideo(
  youtube: any,
  videoFilePath: string,
  options: UploadOptions
): Promise<any> {
  // 파일 경로를 절대 경로로 변환

  const videoFile = path.join(__dirname, '..', '..', 'public', videoFilePath);
  // 비디오 파일 존재 확인
  try {
    await fs.access(videoFile);
    console.log(`✅ 파일 존재 확인됨: ${videoFile}`);
  } catch (error) {
    console.error(`❌ 파일 접근 오류:`, error);
    throw new Error(
      `❌ 비디오 파일을 찾을 수 없습니다.\n` +
      `원본 경로: ${videoFile}\n` +
      `현재 작업 디렉토리: ${process.cwd()}`
    );
  }

  // 업로드 메타데이터 설정
  const metadata = {
    snippet: {
      title: options.title,
      description: generateDescription(options),
      tags: options.tags || ['shorts', 'ai']
    },
    status: {
      privacyStatus: options.privacy || 'public', //공개로 설정
      madeForKids: false, // 아동용 아님 명시
    },
  };

  // 쇼츠 형식 설정
  if (options.shorts) {
    metadata.snippet.title = `#Shorts ${metadata.snippet.title}`;
    if (!metadata.snippet.tags.includes('shorts')) {
      metadata.snippet.tags.push('shorts');
    }
  }

  console.log('📋 업로드 메타데이터:', {
    title: metadata.snippet.title,
    description: metadata.snippet.description?.substring(0, 100) + '...',
    tags: metadata.snippet.tags,
    privacy: metadata.status.privacyStatus,
  });

  // 업로드 실행
  const fileStream = nodefs.createReadStream(videoFile);
  
  const uploadResponse = await youtube.videos.insert({
    part: ['snippet', 'status'],
    requestBody: metadata,
    media: {
      body: fileStream,
    },
  });

  return uploadResponse.data;
}

/**
 * 비디오 설명 생성
 */
function generateDescription(options: UploadOptions): string {
  let description = options.description || '';
  
  if (!description) {
    description = `🤖 AI로 자동 생성된 쇼츠입니다.`;
  }

  // 쇼츠 관련 해시태그 추가
  if (options.shorts && !description.includes('#Shorts')) {
    description += '\n\n#Shorts';
  }

  return description;
}

