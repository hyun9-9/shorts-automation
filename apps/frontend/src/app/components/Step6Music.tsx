interface Props {
  music: string;
  setMusic: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const musicOptions = [
  {
    label: '폭포 아래의 침묵 (스트레스)',
    value: `/music/MP_폭포_침묵.mp3`,
  },
  {
    label: '달빛 아래의 속삭임 (외로움)',
    value: `/music/MP_달빛_속삭임.mp3`,
  },
  {
    label: '모래 위의 발자국 (분노)',
    value: `/music/MP_모래_발자국.mp3`,
  },
  {
    label: '구름 위의 숨결 (슬픔)',
    value: `/music/MP_구름_숨결.mp3`,
  },
  {
    label: '기본 음악',
    value: `/music/MP_바람이 되어_ 너에게.mp3`,
  },
];

export default function Step6Music({ music, setMusic, onNext, onBack }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">6단계: 배경 음악 선택</h2>

      <div className="space-y-4">
        {musicOptions.map((option) => (
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
        ))}
      </div>

      <audio controls src={`${backendUrl}${music}`} className="w-full mt-4" />

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
