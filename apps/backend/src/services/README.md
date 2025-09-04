# YouTube Service

YouTube API를 사용하여 비디오를 업로드하고 관리하는 서비스입니다.

## 설정

### 1. Google Cloud Console에서 프로젝트 생성

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성
3. YouTube Data API v3 활성화
4. OAuth 2.0 클라이언트 ID 생성

### 2. OAuth 2.0 클라이언트 설정

1. Google Cloud Console에서 "사용자 인증 정보" → "사용자 인증 정보 만들기" → "OAuth 2.0 클라이언트 ID"
2. 애플리케이션 유형: "데스크톱 앱" 선택
3. 클라이언트 ID와 클라이언트 보안 비밀번호 다운로드

### 3. credentials 파일 생성

`apps/backend/credentials/client_secret.json` 파일을 생성하고 다운로드한 OAuth 2.0 클라이언트 정보를 저장:

```json
{
  "installed": {
    "client_id": "your-client-id.apps.googleusercontent.com",
    "project_id": "your-project-id",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "your-client-secret",
    "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
  }
}
```

## 사용법

### 기본 사용법

```typescript
import { youtubeService } from './services/youtubeService';

// 1. 서비스 초기화
await youtubeService.initialize('./credentials/client_secret.json');

// 2. 비디오 업로드
const videoId = await youtubeService.uploadVideo({
  title: 'My Video Title',
  description: 'Video description',
  tags: ['tag1', 'tag2'],
  categoryId: '22', // People & Blogs
  privacyStatus: 'private', // private, unlisted, public
  videoPath: './videos/my-video.mp4',
});

console.log('Uploaded video ID:', videoId);
```

### 고급 사용법

```typescript
import { youtubeService } from './services/youtubeService';

async function uploadAndManageVideo() {
  // 초기화
  await youtubeService.initialize('./credentials/client_secret.json');

  // 비디오 업로드
  const videoId = await youtubeService.uploadVideo({
    title: 'Sample Video',
    description: 'This is a sample video',
    tags: ['sample', 'test'],
    privacyStatus: 'private',
    videoPath: './videos/sample.mp4',
  });

  // 비디오 정보 조회
  const videoDetails = await youtubeService.getVideoDetails(videoId);
  console.log('Video details:', videoDetails);

  // 비디오 메타데이터 업데이트
  await youtubeService.updateVideo(videoId, {
    title: 'Updated Title',
    description: 'Updated description',
    privacyStatus: 'public',
  });

  // 비디오 삭제 (필요시)
  // await youtubeService.deleteVideo(videoId);
}
```

## API 참조

### YouTubeService 클래스

#### `initialize(credentialsPath: string): Promise<void>`
OAuth 2.0 인증을 초기화합니다.

#### `uploadVideo(options: YouTubeUploadOptions): Promise<string>`
비디오를 YouTube에 업로드합니다.

**YouTubeUploadOptions:**
- `title: string` - 비디오 제목
- `description: string` - 비디오 설명
- `tags?: string[]` - 태그 배열 (선택사항)
- `categoryId?: string` - 카테고리 ID (기본값: '22')
- `privacyStatus?: 'private' | 'unlisted' | 'public'` - 공개 상태 (기본값: 'private')
- `videoPath: string` - 업로드할 비디오 파일 경로

#### `getVideoDetails(videoId: string): Promise<any>`
업로드된 비디오의 상세 정보를 조회합니다.

#### `updateVideo(videoId: string, options: Partial<YouTubeUploadOptions>): Promise<void>`
비디오 메타데이터를 업데이트합니다.

#### `deleteVideo(videoId: string): Promise<void>`
비디오를 삭제합니다.

## 카테고리 ID 참조

| ID | 카테고리 |
|----|----------|
| 1 | Film & Animation |
| 2 | Autos & Vehicles |
| 10 | Music |
| 15 | Pets & Animals |
| 17 | Sports |
| 19 | Travel & Events |
| 20 | Gaming |
| 22 | People & Blogs |
| 23 | Comedy |
| 24 | Entertainment |
| 25 | News & Politics |
| 26 | Howto & Style |
| 27 | Education |
| 28 | Science & Technology |
| 29 | Nonprofits & Activism |

## OAuth 2.0 인증

### 첫 번째 실행 시

1. 서비스를 초기화하면 인증 URL이 출력됩니다.
2. 브라우저에서 해당 URL로 이동하여 애플리케이션을 인증합니다.
3. 인증 코드를 복사하여 토큰을 저장합니다.
4. 이후 실행 시에는 저장된 토큰을 사용합니다.

### 토큰 저장 위치

- Windows: `%USERPROFILE%\.credentials\youtube-nodejs-quickstart.json`
- macOS/Linux: `~/.credentials/youtube-nodejs-quickstart.json`

## 에러 처리

```typescript
try {
  await youtubeService.uploadVideo(options);
} catch (error) {
  if (error.message.includes('OAuth2 client not initialized')) {
    console.log('서비스를 먼저 초기화해야 합니다.');
  } else if (error.message.includes('Video file not found')) {
    console.log('비디오 파일을 찾을 수 없습니다.');
  } else {
    console.error('업로드 중 오류 발생:', error);
  }
}
```

## 주의사항

1. **파일 크기 제한**: YouTube는 최대 256GB 파일을 지원합니다.
2. **업로드 시간**: 파일 크기에 따라 업로드 시간이 오래 걸릴 수 있습니다.
3. **API 할당량**: YouTube Data API는 일일 할당량이 있습니다.
4. **개인정보**: 업로드된 비디오는 YouTube 정책을 따라야 합니다.
5. **토큰 보안**: OAuth 토큰을 안전하게 보관하세요.

## 예제

더 자세한 예제는 `examples/youtubeUploadExample.ts` 파일을 참조하세요. 