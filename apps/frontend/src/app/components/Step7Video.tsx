import { useState } from 'react';
import axios from 'axios';

interface Props {
  script: any;
  audioUrl: string;
  imageUrl: string;
  music: string;
  setVideoUrl: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step7Video({
  script,
  audioUrl,
  imageUrl,
  music,
  setVideoUrl,
  onNext,
  onBack,
}: Props) {
  const [video, setVideo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const handleGenerateVideo = async () => {
    setLoading(true);
    setError('');
    console.log(script, audioUrl, imageUrl, music);
    try {
      const res = await axios.post(`${backendUrl}/api/shorts/edit`, {
        text: script,
        audio: audioUrl,
        image: imageUrl,
        music,
      });

      const url = res.data.data;
      console.log(res);
      if (!url) throw new Error('비디오 생성 실패');

      setVideo(`${backendUrl}${url}`);
      console.log(video);
      setVideoUrl(`${url}`);
    } catch (err) {
      setError('비디오 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">7단계: 비디오 자동 편집</h2>

      {!video ? (
        <button
          onClick={handleGenerateVideo}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {loading ? '영상 생성 중...' : '영상 생성하기'}
        </button>
      ) : (
        <div className="space-y-4">
          <p>{video}</p>
          <video controls src={video} className="w-full rounded-md" />
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
