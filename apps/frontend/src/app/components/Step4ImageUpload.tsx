import { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
  concept: any;
  script: any;
  setImageUrl: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step4ImageUpload({ concept, script, setImageUrl, onNext, onBack }: Props) {
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  
  // Step4ImageUpload 바로 이미지 프롬프트 받아오기
  const fetchImagePrompt = async () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await axios.post(`${backendUrl}/api/shorts/image`, { concept, text: script.meditationScript });
    const imagePrompt = res.data.data;
    console.log(imagePrompt);
    setImagePrompt(imagePrompt);
  };

  // 컴포넌트가 마운트될 때 한 번만 실행
  useEffect(() => {
    if (concept && script) {
      fetchImagePrompt();
    }
  }, [concept, script]);


  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      // 이미지 압축 함수
      const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve) => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          
          img.onload = () => {
            // 캔버스 크기 설정 (최대 800x800으로 제한)
            const maxSize = 800;
            let { width, height } = img;
            
            if (width > height) {
              if (width > maxSize) {
                height = (height * maxSize) / width;
                width = maxSize;
              }
            } else {
              if (height > maxSize) {
                width = (width * maxSize) / height;
                height = maxSize;
              }
            }
            
            canvas.width = width;
            canvas.height = height;
            
            // 이미지 그리기
            ctx?.drawImage(img, 0, 0, width, height);
            
            // 압축된 이미지를 Base64로 변환 (품질: 0.7)
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
            resolve(compressedBase64);
          };
          
          img.src = URL.createObjectURL(file);
        });
      };

      // 이미지 압축 후 Base64로 변환
      const compressedBase64 = await compressImage(file);
      const base64Image = compressedBase64.split(',')[1];
      
      // 백엔드로 Base64 데이터 전송
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      console.log('압축된 이미지 크기:', Math.round(base64Image.length * 0.75 / 1024), 'KB');
      
      const res = await axios.post(`${backendUrl}/api/shorts/upload`, { 
        image: base64Image 
      });
      
      const url = res.data.imageUrl;
      setImageUrl(`${url}`);
      setPreview(`${backendUrl}${url}`);
    } catch (err) {
      setError('이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">4단계: 이미지 프롬프트 확인 및 업로드</h2>
      
      <div className="bg-gray-100 p-4 rounded-md space-y-2">
        <p><a href="https://aistudio.google.com/prompts/12HqpoSqW5e1lhHu_ywLuobu2f80dzOVz?hl=ko" target="_blank" rel="noopener noreferrer">이미지 프롬프트 생성</a></p>
        <p><strong>이미지 프롬프트:</strong></p>
        <p className="italic text-gray-700">{imagePrompt}</p>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="block"
      />

      {preview && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">업로드된 이미지 미리보기:</p>
          <p className="text-sm text-gray-600">{preview}</p>
          <img src={preview} alt="preview" className="w-full max-w-md rounded-md" />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-4 mt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
        >
          이전
        </button>
        <button
          onClick={onNext}
          disabled={!preview}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          다음 단계로
        </button>
      </div>
    </div>
  );
}
