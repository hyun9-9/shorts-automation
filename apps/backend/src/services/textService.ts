// textService.ts
import { GoogleGenAI, Type } from "@google/genai";
import { MeditationScript, ConceptData } from "../types";

const apiKey = process.env.GEMINI_API_KEY;
// The client gets the API key from the environment variable `GEMINI_API_KEY`.

export const generateMeditationScript = async (concept: ConceptData): Promise<MeditationScript> => {
  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });

    const prompt = `
    당신은 감성적인 명상 스크립트를 작성하는 텍스트 생성 AI입니다.
  
    목표:
    - 시청자의 감정을 "${concept.concept.emotion}" 감정으로 전환시키는 15초 분량의 ASMR용 스크립트를 생성하세요.
    
    요구사항:
    - 언어: 한국어
    - 문장 수: 5~6문장
    - 톤: 부드럽고 위로하는 말투
    - 주제: ${concept.episodeTitle}
    - 리듬: 천천히 읽을 수 있도록 문장 길이와 호흡 고려
    - 단 한개의 오브젝트만 생성하세요.

    스타일 참고:
    "지금 이 순간, 당신은 혼자가 아닙니다. 조용히 눈을 감고, 마음속에 따뜻한 빛을 떠올려 보세요. 그 빛은 천천히 당신의 가슴을 감싸며, 불안한 감정을 녹여줍니다. 숨을 들이쉬고, 내쉬는 사이에 평온함이 스며듭니다. 당신은 안전하고, 충분히 사랑받을 자격이 있습니다. 오늘 하루, 그 사실을 잊지 말아주세요."

    제약 조건:
    - 반말, 번역체, 뻔한 문구 금지
    - 스타일이 위 예시와 다르면 오류 메시지를 출력하세요: "❌ 'Writing Style Reference' is X, expected 'copy the style'"

    출력 형식:
    {
      "meditationScript": "문장1 + 문장2 + 문장3 + 문장4 + 문장5 + 문장6",
      "sentence": [
        0: "문장1",
        1: "문장2",
        2: "문장3",
        3: "문장4",
        4: "문장5",
        5: "문장6"]
    }`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 0 // 사고 기능 비활성화 (속도 우선)
        },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            meditationScript: { type: Type.STRING },
            sentence: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          required: ["meditationScript", "sentence"],
          propertyOrdering: ["meditationScript", "sentence"],
        }
      }
    });

    const result = response.text;
    // console.log(result);
    if (!result) {
      throw new Error('AI response is empty');
    }

    // AI 응답을 JSON으로 파싱하여 객체로 반환
    try {
      const parsed = JSON.parse(result);
      return parsed as MeditationScript;
    } catch (parseError) {
      console.warn('AI 응답 파싱 실패, 기본값 반환');
      // 파싱 실패시 기본값 반환
      return {
        meditationScript: "",
        sentence: []
      };
    }
  } catch (error) {
    console.error('Error generating meditation script:', error);
    // 에러 발생시 기본값 반환
    return {
      meditationScript: "",
      sentence: []
    };
  }
};
