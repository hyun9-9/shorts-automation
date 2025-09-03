import { useState } from 'react';
import axios from 'axios';

interface Props {
  script: any;
  setAudioUrl: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step5Audio({ script, setAudioUrl, onNext, onBack }: Props) {
  const [audio, setAudio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateAudio = async () => {
    setLoading(true);
    setError('');

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const res = await axios.post(`${backendUrl}/api/shorts/audio`, { text: script });
      const url = res.data.data;
      if (!url) throw new Error('음성 생성 실패');

      setAudio(`${backendUrl}${url}`);
      setAudioUrl(`${url}`);
    } catch (err) {
      setError('음성 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">5단계: TTS 음성 생성</h2>

      {!audio ? (
        <button
          onClick={handleGenerateAudio}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {loading ? '생성 중...' : '음성 생성하기'}
        </button>
      ) : (
        <div className="space-y-4">
          <audio controls src={audio} className="w-full" />
          <div className="flex gap-4">
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
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
