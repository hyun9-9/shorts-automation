// imageService.ts
import { GoogleGenAI, Type } from "@google/genai";
import { ConceptData, MeditationScript } from "../types";
import fs from 'fs';
import path from 'path';
// import { v4 as uuidv4 } from 'uuid';

const apiKey = process.env.GEMINI_API_KEY;


export const generateImageAI = async (concept: ConceptData,text: MeditationScript): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });

    const prompt = `
    # INPUT  
    "sentence":${text.meditationScript}

    위 데이터를 바탕으로, System Prompt 의 규칙대로 image를 생성하세요.


    # System Prompt: - ${concept.concept.background}이라는 명상 콘텐츠에 어울리는 시네마틱 배경 이미지를 생성하세요.

    ## Overview 당신은 30초 유투브 쇼츠 제작을 위한 컨텐츠 생성에 특화된 멀티모달 크리에이티브 AI입니다. 사용자가 제공하는 ‘sentence’를 바탕으로 팩트 기반의 몰입감 있는 이미지로 만들어냅니다. 

    'sentence'가 한줄 주어집니다.  당신의 임무는 다음을 출력하는 것입니다. 

    ## Rules 
    -'sentence'를 시각적으로 잘 전달하기 위한 장면을 연출하세요.
    - 이 프롬프트는 시청자가 'sentence' 내용에 빠져들도록 만들어야 합니다.
    - 'sentence'에 등장한  구체적인 배경, 사물, 상황 등을 키워드 중심으로 묘사하세요. 
    - 생성된 프롬프트는 예술적 감수성, 풍부한 상상력, 깊은 만족감을 제공해야 합니다. 
    - 사실적이게 표현을해야합니다

    이미지 생성 시작해주세요.
    `;

    console.log(prompt);
    return prompt;
    
    // const response = await ai.models.generateImages({
    //   model: 'imagen-4.0-generate-001',
    //   prompt: prompt,
    //   config: {
    //     numberOfImages: 1,
    //     aspectRatio: '9:16',
    //   },
    // });

    // let fileNames = [];
    // if (!response.generatedImages) {
    //   return `/images/fallback.jpg`;
    // }

    // for (const generatedImage of response.generatedImages) {
    //   let imgBytes = generatedImage.image?.imageBytes;
    //   if (!imgBytes) {
    //     continue;
    //   }
    //   const imageBuffer = Buffer.from(imgBytes, "base64");
    //   const fileName = `meditation-${Date.now()}.jpg`;
    //   const savePath = path.join(__dirname, '..', '..', 'public', 'images', fileName);
    //   // 디렉토리 없으면 생성
    //   const dir = path.dirname(savePath);
    //   if (!fs.existsSync(dir)) {
    //     fs.mkdirSync(dir, { recursive: true });
    //   }
    //   // 이미지 저장
    //   fs.writeFileSync(savePath, imageBuffer);
    //   fileNames.push(fileName);
    // }
    // 반환할 URL 경로 (프론트에서 접근 가능하도록 public 기준)
    // return `/images/${fileNames[0]}`;
  } catch (error) {
    console.error("이미지 생성 또는 저장 실패:", error);
    return `/images/fallback.jpg`;
  }
};
