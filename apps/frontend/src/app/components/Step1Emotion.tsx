"use client";
import { useState } from 'react';
import axios from 'axios';

interface Props {
  emotion: string;
  setEmotion: (value: string) => void;
  setConcept: (value: any) => void;
  onNext: () => void;
}

export default function Step1Emotion({ emotion, setEmotion, setConcept, onNext }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!emotion) {
      setError('감정을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      const res = await axios.post(`${backendUrl}/api/shorts/concept`, { emotion });
      console.log(res);
      const concept = res.data.data;
      if (!concept) throw new Error('콘셉트 생성 실패');

      setConcept(concept);
      onNext();
    } catch (err) {
      setError('콘셉트 생성 중 오류가 발생했습니다.'+err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">1단계: 감정 키워드 입력</h2>

      <input
        type="text"
        value={emotion}
        onChange={(e) => setEmotion(e.target.value)}
        placeholder="예: 외로움, 스트레스, 슬픔"
        className="w-full px-4 py-2 border rounded-md"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {loading ? '생성 중...' : '콘셉트 생성하기'}
      </button>
    </div>
  );
}
