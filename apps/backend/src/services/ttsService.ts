// ttsService.ts
import { GoogleGenAI } from '@google/genai';
import wav from 'wav';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const apiKey = process.env.GEMINI_API_KEY;

async function saveWaveFile(
  filename: string,
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<void> {
  return new Promise((resolve, reject) => {
    const writer = new wav.FileWriter(filename, {
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    writer.on('finish', resolve);
    writer.on('error', reject);

    writer.write(pcmData);
    writer.end();
  });
}
//여자 목소리 : Zephyr
//남자 목소리 : Charon
export const synthesizeSpeech = async (text: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey });
    const styleInstructions: string = '감성적인 명상 목소리:' + text;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: [{ parts: [{ text: styleInstructions }] }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Zephyr' },
          },
        },
      },
    });

    const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!data) throw new Error('TTS 응답이 비어있습니다.');

    const audioBuffer = Buffer.from(data, 'base64');

    const fileName = `tts-${uuidv4()}.wav`;
    const savePath = path.join(__dirname, '..', '..', 'public', 'audio', fileName);

    // 디렉토리 없으면 생성
    const dir = path.dirname(savePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await saveWaveFile(savePath, audioBuffer);

    return `/audio/${fileName}`;
  } catch (error) {
    console.error('음성 합성 실패:', error);
    return '/audio/fallback.wav';
  }
};
