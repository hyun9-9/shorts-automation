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
  const [fileType, setFileType] = useState<'image' | 'video'>('image');
  const [uploadedFileInfo, setUploadedFileInfo] = useState<any>(null);
  
  // Step4ImageUpload 바로 이미지 프롬프트 받아오기
  const fetchImagePrompt = async () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await axios.post(`${backendUrl}/api/shorts/image`, { concept, text: script });
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

  // 파일을 Base64로 변환하는 함수
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      // 파일 타입 확인
      const isVideo = file.type.startsWith('video/');
      const isImage = file.type.startsWith('image/');
      
      if (!isVideo && !isImage) {
        setError('이미지 또는 영상 파일만 업로드 가능합니다.');
        setLoading(false);
        return;
      }

      setFileType(isVideo ? 'video' : 'image');

      let base64Data: string;

      if (isImage) {
        // 이미지 압축 후 Base64로 변환
        const compressedBase64 = await compressImage(file);
        base64Data = compressedBase64.split(',')[1];
        console.log('압축된 이미지 크기:', Math.round(base64Data.length * 0.75 / 1024), 'KB');
      } else {
        // 영상 파일을 Base64로 변환 (압축 없음)
        const fullBase64 = await fileToBase64(file);
        base64Data = fullBase64.split(',')[1];
        console.log('영상 파일 크기:', Math.round(base64Data.length * 0.75 / 1024 / 1024), 'MB');
      }
      
      // 백엔드로 Base64 데이터 전송 (새로운 uploadFile 엔드포인트 사용)
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      
      const res = await axios.post(`${backendUrl}/api/shorts/uploadFile`, { 
        file: base64Data,
        fileType: file.type
      });
      
      const { fileUrl, isVideo: uploadedIsVideo, fileName } = res.data;
      setImageUrl(fileUrl);
      setPreview(`${backendUrl}${fileUrl}`);
      setUploadedFileInfo({
        fileName,
        isVideo: uploadedIsVideo,
        fileType: file.type
      });

      console.log('업로드 성공:', res.data);
    } catch (err) {
      console.error('업로드 오류:', err);
      setError(`${fileType === 'video' ? '영상' : '이미지'} 업로드 중 오류가 발생했습니다.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">4단계: 이미지/영상 업로드</h2>
      
      <div className="p-4 rounded-md space-y-2">
        <p><a href="https://aistudio.google.com/prompts/12HqpoSqW5e1lhHu_ywLuobu2f80dzOVz?hl=ko" target="_blank" rel="noopener noreferrer">이미지 프롬프트 생성</a></p>
        <p><strong>이미지 프롬프트:</strong></p>
        <p className="italic text-gray-700">{imagePrompt}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이미지 또는 영상 파일 선택
          </label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500 mt-1">
            지원 형식: 이미지 (JPEG, PNG, GIF, WebP), 영상 (MP4, AVI, MOV, WMV, FLV, WebM, MKV)
          </p>
        </div>

        {loading && (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-600">
              {fileType === 'video' ? '영상' : '이미지'} 업로드 중...
            </span>
          </div>
        )}

        {uploadedFileInfo && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-800">
              ✅ {uploadedFileInfo.isVideo ? '영상' : '이미지'} 업로드 완료
            </p>
            <p className="text-xs text-green-600">
              파일명: {uploadedFileInfo.fileName}
            </p>
            <p className="text-xs text-green-600">
              형식: {uploadedFileInfo.fileType}
            </p>
          </div>
        )}
      </div>

      {preview && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">업로드된 파일 미리보기:</p>
          <p className="text-sm text-gray-600 mb-2">{preview}</p>
          
          {fileType === 'image' ? (
            <img src={preview} alt="preview" className="w-full max-w-md rounded-md" />
          ) : (
            <video 
              src={preview} 
              controls 
              className="w-full max-w-md rounded-md"
              preload="metadata"
            >
              브라우저가 비디오를 지원하지 않습니다.
            </video>
          )}
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      <div className="flex gap-4 mt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition-colors"
        >
          이전
        </button>
        <button
          onClick={onNext}
          disabled={!preview || loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          다음 단계로
        </button>
      </div>
    </div>
  );
}
