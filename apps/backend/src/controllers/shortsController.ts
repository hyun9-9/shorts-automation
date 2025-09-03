// shortsController.ts
import { Request, Response } from 'express';
import { generateMeditationScript } from '../services/textService';
import { synthesizeSpeech } from '../services/ttsService';
// import { generateBackgroundSound } from '../services/soundService';
import { generateImageAI } from '../services/imageService';
import { autoEditVideo } from '../services/editService';
import { generateConceptFromEmotion } from '../services/conceptService';
import { ConceptData, MeditationScript } from '../types';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
export const allProcess = async (req: Request, res: Response) => {
  try {
    const { emotion } = req.query;

    
    if (!emotion || typeof emotion !== 'string') {
      return res.status(400).json({ error: '감정 키워드를 입력해주세요.' });
    }

    // 1. 콘셉트 생성
    console.log("콘셉트 생성 시작");
    // const concept: ConceptData = await generateConceptFromEmotion(emotion);
    const concept: ConceptData = {
      episodeTitle: '잔잔한 숲속 옹달샘',
      concept: {
        emotion: '불안 → 평온',
        background: '고요한 숲속 옹달샘 이미지',
        sound: '물방울, 새소리, 부드러운 바람 소리',
        narratorVoice: '부드러운 저음의 목소리'
      }
    };
    // {
    //   episodeTitle: '고요한 숲속의 멜로디',
    //   concept: {
    //     emotion: '불안 → 평온함',
    //     background: '고요한 숲속, 나뭇잎 사이로 스며드는 햇살 이미지',
    //     narratorVoice: '부드럽고 차분한 여성 목소리',
    //     sound: '새소리, 바람소리, 잔잔한 피아노 선율'
    //   }
    // }
    console.log(concept);
    if (!concept) {
      return res.status(500).json({ error: '콘셉트 생성에 실패했습니다.' });
    }


    // 2. 명상 스크립트 생성
    console.log("명상 스크립트 생성 시작");
    // const text: MeditationScript = await generateMeditationScript(concept);
    const text: MeditationScript = {
      meditationScript: "지금 당신의 마음을 잔잔한 숲속 옹달샘에 띄워보세요. 투명한 물결이 당신의 불안을 씻어내고, 맑은 물방울 소리가 마음 깊은 곳에 평온을 선물합니다. 숨을 들이쉬고, 내쉬는 동안 숲의 고요함이 당신의 모든 감각을 감쌉니다. 이곳에서 당신은 온전히 보호받고 있으며, 그 어떤 걱정도 스며들 수 없습니다. 평화로운 샘물처럼 당신의 마음도 다시금 맑고 고요해집니다. 이 평온함이 당신의 하루를 따스하게 감싸줄 거예요.",
      sentence: [
        "지금 당신의 마음을 잔잔한 숲속 옹달샘에 띄워보세요.",
        "투명한 물결이 당신의 불안을 씻어내고, 맑은 물방울 소리가 마음 깊은 곳에 평온을 선물합니다.",
        "숨을 들이쉬고, 내쉬는 동안 숲의 고요함이 당신의 모든 감각을 감쌉니다.",
        "이곳에서 당신은 온전히 보호받고 있으며, 그 어떤 걱정도 스며들 수 없습니다.",
        "평화로운 샘물처럼 당신의 마음도 다시금 맑고 고요해집니다.",
        "이 평온함이 당신의 하루를 따스하게 감싸줄 거예요."
      ]
    }
    console.log(text);
    if (!text) {
      return res.status(500).json({ error: '명상 스크립트 생성에 실패했습니다.' });
    }


    // 3. 이미지 생성 AI 결제 필요로 인해 프롬프트만 리턴 
    // 이미지 프롬프트를 프론트에서 복사해서 직접 이미지를 올리도록 해야함
    console.log("이미지 생성 시작");
    // const image = await generateImageAI(concept,text);
    const image = '/images/meditation-20250828-1.jpeg';
    // console.log(image);
    // if (!image) {
    //   return res.status(500).json({ error: '이미지 생성에 실패했습니다.' });
    // }

    // 4. 배경 사운드 다운 (https://www.mewpot.com)
    const music = '/music/MP_바람이 되어_ 너에게.mp3';
    // mewpot


    // 5. tts음성 생성 시작
    console.log("tts음성 생성 시작");
    // const audio = await synthesizeSpeech(text.meditationScript);
    const audio = '/audio/tts-07a3d4ce-678a-4597-bc38-b0503809072d.wav';
    if (!audio) {
      return res.status(500).json({ error: '음성 합성에 실패했습니다.' });
    }


    // 6. 비디오 편집 시작
    console.log("비디오 편집 시작");
    // 참고 
    // https://kminito.tistory.com/108
    // https://www.gyan.dev/ffmpeg/builds/
    const video = await autoEditVideo({ script: text.meditationScript, audioUrl: audio, imageUrl: image, music: music });
    if (!video) {
      return res.status(500).json({ error: '비디오 편집에 실패했습니다.' });
    }

    res.json(
      {
        concept,
        text,
        audio,
        video,
      }
    );
  } catch (error) {
    console.error('All process error:', error);
    res.status(500).json({ error: '전체 프로세스 실행 중 오류가 발생했습니다.' });
  }
};


// 콘셉트 생성
export const generateConcept = async (req: Request, res: Response) => {
  try {
    const { emotion } = req.body;

    
    if (!emotion || typeof emotion !== 'string') {
      return res.status(400).json({ error: '감정 키워드를 입력해주세요.' });
    }

    // 1. 콘셉트 생성
    console.log("콘셉트 생성 시작");
    const concept: ConceptData = await generateConceptFromEmotion(emotion);
    // const concept: ConceptData = {
    //   episodeTitle: '잔잔한 숲속 옹달샘',
    //   concept: {
    //     emotion: '불안 → 평온',
    //     background: '고요한 숲속 옹달샘 이미지',
    //     sound: '물방울, 새소리, 부드러운 바람 소리',
    //     narratorVoice: '부드러운 저음의 목소리'
    //   }
    // };

    console.log(concept);
    if (!concept) {
      return res.status(500).json({ error: '콘셉트 생성에 실패했습니다.' });
    }
    // 이제 conceptData는 이미 객체이므로 파싱할 필요가 없음
    res.json({ success: true, data: concept });
  } catch (error) {
    console.error('Concept generation error:', error);
    res.status(500).json({ error: '콘셉트 생성 중 오류가 발생했습니다.' });
  }
};

// 명상 스크립트 생성
export const generateText = async (req: Request, res: Response) => {
  try {
    const { concept } = req.body;
    // 2. 명상 스크립트 생성
    console.log("명상 스크립트 생성 시작");
    const text: MeditationScript = await generateMeditationScript(concept);
    // const text: MeditationScript = {
    //   meditationScript: "지금 당신의 마음을 잔잔한 숲속 옹달샘에 띄워보세요. 투명한 물결이 당신의 불안을 씻어내고, 맑은 물방울 소리가 마음 깊은 곳에 평온을 선물합니다. 숨을 들이쉬고, 내쉬는 동안 숲의 고요함이 당신의 모든 감각을 감쌉니다. 이곳에서 당신은 온전히 보호받고 있으며, 그 어떤 걱정도 스며들 수 없습니다. 평화로운 샘물처럼 당신의 마음도 다시금 맑고 고요해집니다. 이 평온함이 당신의 하루를 따스하게 감싸줄 거예요.",
    //   sentence: [
    //     "지금 당신의 마음을 잔잔한 숲속 옹달샘에 띄워보세요.",
    //     "투명한 물결이 당신의 불안을 씻어내고, 맑은 물방울 소리가 마음 깊은 곳에 평온을 선물합니다.",
    //     "숨을 들이쉬고, 내쉬는 동안 숲의 고요함이 당신의 모든 감각을 감쌉니다.",
    //     "이곳에서 당신은 온전히 보호받고 있으며, 그 어떤 걱정도 스며들 수 없습니다.",
    //     "평화로운 샘물처럼 당신의 마음도 다시금 맑고 고요해집니다.",
    //     "이 평온함이 당신의 하루를 따스하게 감싸줄 거예요."
    //   ]
    // }
    console.log(text);
    if (!text) {
      return res.status(500).json({ error: '명상 스크립트 생성에 실패했습니다.' });
    }
    res.json({ success: true, data: text });
  } catch (error) {
    console.error('Text generation error:', error);
    res.status(500).json({ error: '텍스트 생성 중 오류가 발생했습니다.' });
  }
};

// 이미지 프롬프트 생성
export const generateImage = async (req: Request, res: Response) => {
  try {
    const { concept, text } = req.body;
    
    if (!concept || !text) {
      return res.status(400).json({ error: '콘셉트와 텍스트가 필요합니다.' });
    }

    console.log("이미지 프롬프트 생성 시작");
    const imagePrompt = await generateImageAI(concept, text);
    
    if (!imagePrompt) {
      return res.status(500).json({ error: '이미지 프롬프트 생성에 실패했습니다.' });
    }

    res.json({ success: true, data: imagePrompt });
  } catch (error) {
    console.error('Image prompt generation error:', error);
    res.status(500).json({ error: '이미지 프롬프트 생성 중 오류가 발생했습니다.' });
  }
};

// 이미지 업로드 
export const uploadImage = async (req: Request, res: Response) => {
  try {
    // FormData에서 전송된 파일 데이터 처리
    const { image } = req.body;
    
    if (!image) {
      return res.status(400).json({ error: '업로드된 파일이 없습니다.' });
    }

    // 파일명 생성 (현재 시간 + 원본 파일명)
    const fileName = `meditation-${uuidv4()}.jpg`;
    
    // public/images 디렉토리 경로
    const imagesDir = path.join(__dirname, '..', '..', 'public', 'images');
    
    // 디렉토리가 없으면 생성
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    
    // 최종 저장 경로
    const savePath = path.join(imagesDir, fileName);
    
    // Base64 데이터를 파일로 저장
    const imageBuffer = Buffer.from(image, 'base64');
    fs.writeFileSync(savePath, imageBuffer);
    
    // 클라이언트에서 접근할 수 있는 URL 반환
    const imageUrl = `/images/${fileName}`;
    
    console.log('이미지 업로드 성공:', imageUrl);
    res.json({ success: true, imageUrl });
    
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ error: '이미지 업로드 중 오류가 발생했습니다.' });
  }
};

// tts음성 생성
export const generateAudio = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    // 5. tts음성 생성 시작
    console.log("tts음성 생성 시작");
    const audio = await synthesizeSpeech(text.meditationScript);
    // const audio = '/audio/tts-07a3d4ce-678a-4597-bc38-b0503809072d.wav';
    if (!audio) {
      return res.status(500).json({ error: '음성 합성에 실패했습니다.' });
    }
    res.json({ success: true, data: audio });
  } catch (error) {
    console.error('Audio generation error:', error);
    res.status(500).json({ error: '음성 생성 중 오류가 발생했습니다.' });
  }
};

export const generateSound = async (req: Request, res: Response) => {
  // const { mood } = req.body;
  // const soundUrl = await generateBackgroundSound(mood);
  // res.json({ soundUrl });
};



export const autoEdit = async (req: Request, res: Response) => {
  try {
    const { text, audio, image, music } = req.body;
    // 6. 비디오 편집 시작
    console.log("비디오 편집 시작");
    // 참고 
    // https://kminito.tistory.com/108
    // https://www.gyan.dev/ffmpeg/builds/
    const video = await autoEditVideo({ script: text.meditationScript, audioUrl: audio, imageUrl: image, music: music });
    if (!video) {
      return res.status(500).json({ error: '비디오 편집에 실패했습니다.' });
    }
    res.json({ success: true, data: video });
  } catch (error) {
    console.error('Auto edit error:', error);
    res.status(500).json({ error: '비디오 편집 중 오류가 발생했습니다.' });
  }
};


