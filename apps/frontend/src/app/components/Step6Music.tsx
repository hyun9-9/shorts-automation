import axios from 'axios';
import { useEffect, useState } from 'react';

interface Props {
  music: string;
  setMusic: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Step6Music({ music, setMusic, onNext, onBack }: Props) {
  const [musicOptions, setMusicOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
        <audio controls src={`${backendUrl}${music}`} className="w-full mt-4" />
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
