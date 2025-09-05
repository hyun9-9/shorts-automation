// soundService.ts
import path from 'path';
import fs from 'fs';
import { BackgroundSound } from '../types';
export const generateBackgroundSound = async (): Promise<BackgroundSound[]> => {
  // 음악파일 명 모두 가져오기
// 형태
// musicOptions = [
//   {
//     label: '폭포 아래의 침묵 (스트레스)',
//     value: `/music/MP_폭포_침묵.mp3`,
//   },]

  const musicDir = path.join(__dirname, '..', '..', 'public', 'music');
  const musicFiles = fs.readdirSync(musicDir);
  const musicOptions = musicFiles.map((file) => {
    const label = file.replace('.mp3', '');
    return {
      label: label,
      value: `/music/${file}`,
    };
  });
  
  return musicOptions;
};
