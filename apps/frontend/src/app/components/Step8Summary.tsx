interface Props {
  concept: any;
  script: any;
  imageUrl: string;
  audioUrl: string;
  videoUrl: string;
  onBack: () => void;
}

export default function Step8Summary({
  concept,
  script,
  imageUrl,
  audioUrl,
  videoUrl,
  onBack,
}: Props) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">8단계: 전체 결과 요약</h2>

      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="font-semibold mb-2">🎯 콘셉트</h3>
          <p><strong>제목:</strong> {concept?.episodeTitle}</p>
          <p><strong>배경 프롬프트:</strong> {concept?.concept?.background}</p>
          <p><strong>키워드:</strong> {concept?.concept?.emotion}</p>
          <p><strong>사운드:</strong> {concept?.concept?.sound}</p>
          <p><strong>나레이션:</strong> {concept?.concept?.narratorVoice}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="font-semibold mb-2">🧘‍♂️ 명상 스크립트</h3>
          <textarea
            readOnly
            value={script?.meditationScript}
            rows={6}
            className="w-full p-2 border rounded-md bg-white"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-md space-y-2">
          <h3 className="font-semibold">🖼️ 이미지</h3>
          <img src={`${backendUrl}${imageUrl}`} alt="최종 이미지" className="w-full max-w-md rounded-md" />
        </div>

        <div className="bg-gray-100 p-4 rounded-md space-y-2">
          <h3 className="font-semibold">🔊 음성</h3>
          <audio controls src={`${backendUrl}${audioUrl}`} className="w-full" />
        </div>

        <div className="bg-gray-100 p-4 rounded-md space-y-2">
          <h3 className="font-semibold">🎬 영상</h3>
          <video controls src={`${backendUrl}${videoUrl}`} className="w-full rounded-md" />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
        >
          이전
        </button>
        <button
          onClick={() => alert('영상이 저장되었습니다!')}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          완료 및 저장
        </button>
      </div>
    </div>
  );
}
