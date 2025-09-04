interface Props {
  concept: any;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Concept({ concept, onNext, onBack }: Props) {
  if (!concept) return <p>콘셉트 데이터가 없습니다.</p>;
  console.log(concept);
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">2단계: 콘셉트 확인</h2>

      <div className="">
        <p><strong>제목:</strong> {concept.episodeTitle}</p>
        <p><strong>배경:</strong> {concept.concept.background}</p>
        <p><strong>감정:</strong> {concept.concept.emotion}</p>
        <p><strong>사운드:</strong> {concept.concept.sound}</p>
        <p><strong>나레이션:</strong> {concept.concept.narratorVoice}</p>
      </div>

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
  );
}
