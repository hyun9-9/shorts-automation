// conceptService.ts
import { GoogleGenAI, Type } from '@google/genai';
import { ConceptData } from '../types';

const apiKey = process.env.GEMINI_API_KEY;

export const generateConceptFromEmotion = async (emotionFrom: string): Promise<ConceptData> => {
  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    const prompt = `
      당신은 감정 기반 ASMR 콘텐츠를 기획하는 전문가입니다.

      목표:
      - 사용자가 입력한 단일 감정 키워드(예: "${emotionFrom}")를 기반으로, 그 감정에서 벗어나기 위한 이상적인 감정 상태를 AI가 자동으로 설정하세요.
      - 그 감정 전환을 중심으로 ASMR 콘텐츠의 에피소드 제목과 콘셉트를 생성하세요.
      - 단 한개의 에피소드 제목과 콘셉트만 생성하세요.

      작업:
      1. 감정 전환 방향 설정
      2. 에피소드 제목 생성
      3. 콘셉트 설명

      감정 키워드 | 에피소드 제목 | 배경/사운드/나레이터 목소리
      스트레스 | "폭포 아래의 침묵" | 폭포가 흐르는 이미지 / 물소리 / 저음목소리
      외로움 | "달빛 아래의 속삭임" | 달빛 아래의 속삭임 이미지 / 밤새소리 /  여자 목소리
      분노 | "모래 위의 발자국" | 모래 위의 발자국 이미지 / 바람, 파도, 저주파 / 나레이터 목소리
      슬픔 | "구름 위의 숨결" | 구름 위의 숨결 이미지 / 피아노, 바람, 속삭임 / 나레이터 목소리

      출력 형식:
      {
        "episodeTitle": "에피소드 제목",
        "concept": {
          "emotion": "${emotionFrom} → (이상적인 감정 키워드)/ 예시 : 불안 → 안정, 외로움 → 따뜻함",
          "background": "배경"
          "sound": "사운드"
          "narratorVoice": "나레이터 목소리"
        }
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 0
        },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            episodeTitle: {
              type: Type.STRING,
            },
            concept: {
              type: Type.OBJECT,
              properties: {
                emotion: { type: Type.STRING },
                background: { type: Type.STRING },
                sound: { type: Type.STRING },
                narratorVoice: { type: Type.STRING },
              },
              required: ["emotion", "background"],
            },
          },
          required: ["episodeTitle", "concept"],
          propertyOrdering: ["episodeTitle", "concept"],
        },
      }
    });

    const result = response.text;

    if (!result) {
      throw new Error('AI response is empty');
    }

    // AI 응답을 JSON으로 파싱하여 객체로 반환
    try {
      const parsed = JSON.parse(result);
      return parsed as ConceptData;
    } catch (parseError) {
      console.warn('AI 응답 파싱 실패, 기본값 반환');
      // 파싱 실패시 기본값 반환
      return {
        episodeTitle: "",
        concept: {
          emotion: ``,
          background: "",
          sound: "",
          narratorVoice: "",
        }
      };
    }
  } catch (error) {
    console.error('Error generating concept:', error);
    // 에러 발생시 기본값 반환
    return {
      episodeTitle: "",
      concept: {
        emotion: ``,
        background: "",
        sound: "",
        narratorVoice: "",
      }
    };
  }
};
