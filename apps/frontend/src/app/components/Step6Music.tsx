import axios from 'axios';
import { useEffect, useState } from 'react';

interface Props {
  music: string;
  setMusic: (value: string) => void;
  musicStartTime: number;
  setMusicStartTime: (value: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Step6Music({ 
  music, 
  setMusic, 
  musicStartTime, 
  setMusicStartTime, 
  onNext, 
  onBack 
}: Props) {
  const [musicOptions, setMusicOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [audioDuration, setAudioDuration] = useState(0);

  const getBackgroundSound = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/shorts/getBackgroundSound`);
      const data = response.data;
      console.log(data);
      setMusicOptions(data.data);
      console.log(data.data);
    } catch (error) {
      console.error('음악 목록을 가져오는데 실패했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAudioLoadedMetadata = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const audio = e.currentTarget;
    console.log('audio', audio);
    setAudioDuration(audio.duration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    getBackgroundSound();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">6단계: 배경 음악 선택</h2>

      {loading ? (
        <div className="text-center py-4">음악 목록을 불러오는 중...</div>
      ) : (
        <div className="space-y-4">
          {musicOptions.length > 0 ? (
            musicOptions.map((option) => (
              <label key={option.value} className="block">
                <input
                  type="radio"
                  name="music"
                  value={option.value}
                  checked={music === option.value}
                  onChange={() => setMusic(option.value)}
                  className="mr-2"
                />
                {option.label}
              </label>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              사용 가능한 음악이 없습니다.
            </div>
          )}
        </div>
      )}

      {music && (
        <div className="space-y-4">
          <audio 
            controls 
            src={`${backendUrl}${music}`} 
            className="w-full mt-4"
            onLoadedMetadata={handleAudioLoadedMetadata}
          />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              음악 시작 지점: {formatTime(musicStartTime)}
            </label>
            <input
              type="range"
              min="0"
              max={audioDuration || 0}
              step="1"
              value={musicStartTime}
              onChange={(e) => setMusicStartTime(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0:00</span>
              <span>{formatTime(audioDuration)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4 mt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
        >
          이전
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          다음 단계로
        </button>
      </div>
    </div>
  );
}
