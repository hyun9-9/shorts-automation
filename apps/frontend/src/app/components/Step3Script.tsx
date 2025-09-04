import { useState } from 'react';
import axios from 'axios';

interface Props {
  concept: any;
  setScript: (value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Script({ concept, setScript, onNext, onBack }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [text, setText] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const res = await axios.post(`${backendUrl}/api/shorts/text`, { concept });
      const scriptData = res.data.data;
      if (!scriptData) throw new Error('스크립트 생성 실패');

      setScript(scriptData);
      setText(scriptData.meditationScript);
    } catch (err) {
      setError('명상 스크립트 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">3단계: 명상 스크립트 생성</h2>

      {!text ? (
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {loading ? '생성 중...' : '스크립트 생성하기'}
        </button>
      ) : (
        <div className="space-y-4">
          <textarea
            value={text}
            readOnly
            rows={10}
            className="w-full p-4 border rounded-md"
          />
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
