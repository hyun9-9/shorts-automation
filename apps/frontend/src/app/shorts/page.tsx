"use client";
import { useState } from 'react';
import Step1Emotion from '../components/Step1Emotion';
import Step2Concept from '../components/Step2Concept';
import Step3Script from '../components/Step3Script';
import Step4ImageUpload from '../components/Step4ImageUpload';
import Step5Audio from '../components/Step5Audio';
import Step6Music from '../components/Step6Music';
import Step7Video from '../components/Step7Video';
import Step8Summary from '../components/Step8Summary';
import { Button, Typography, Card, Container, Badge, Navbar, Footer, Hero } from '@/components/ui';
import { colors, typography, spacing, borderRadius } from '@/lib/theme';

export default function ShortsPage() {
  const [step, setStep] = useState(1);
  
  // 각 단계별 데이터 상태 관리
  const [emotion, setEmotion] = useState('');
  const [concept, setConcept] = useState<any>(null);
  const [script, setScript] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [music, setMusic] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const steps = [
    { number: 1, title: '감정 선택', description: '쇼츠의 분위기 선택' },
    { number: 2, title: '콘셉트 선택', description: '주제와 콘셉트 결정' },
    { number: 3, title: '스크립트 생성', description: 'AI 스크립트 생성' },
    { number: 4, title: '이미지 준비', description: '이미지 업로드/생성' },
    { number: 5, title: '음성 생성', description: 'TTS 음성 생성' },
    { number: 6, title: '배경음악', description: '음악 선택' },
    { number: 7, title: '비디오 생성', description: 'AI 자동 편집' },
    { number: 8, title: '완료', description: '다운로드 및 공유' },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      <main>
        {/* 진행률 표시 */}
        {step <= 8 && (
          <div style={{ 
            padding: `${spacing.lg} 0`,
            borderBottom: `1px solid ${colors.border.primary}`
          }}>
            <Container>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md, flexWrap: 'wrap' }}>
                {steps.map((stepItem, index) => (
                  <div key={stepItem.number} style={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: step >= stepItem.number ? colors.primary.main : colors.border.primary,
                      color: step >= stepItem.number ? colors.text.primary : colors.text.secondary,
                      fontSize: typography.fontSize.sm,
                      fontWeight: typography.fontWeight.medium,
                    }}>
                      {stepItem.number}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h4" style={{ 
                        color: step >= stepItem.number ? colors.text.primary : colors.text.secondary,
                        fontWeight: step >= stepItem.number ? typography.fontWeight.medium : typography.fontWeight.normal
                      }}>
                        {stepItem.title}
                      </Typography>
                      <Typography variant="body" color="secondary" style={{ fontSize: typography.fontSize.xs }}>
                        {stepItem.description}
                      </Typography>
                    </div>
                    {index < steps.length - 1 && (
                      <div style={{
                        width: '20px',
                        height: '2px',
                        backgroundColor: step > stepItem.number ? colors.primary.main : colors.border.primary,
                        margin: `0 ${spacing.sm}`,
                      }} />
                    )}
                  </div>
                ))}
              </div>
            </Container>
          </div>
        )}

        {/* 단계별 컴포넌트 렌더링 */}
        <div style={{ padding: `${spacing.xl} 0` }}>
          {step === 1 && (
            <Step1Emotion 
              emotion={emotion} 
              setEmotion={setEmotion} 
              setConcept={setConcept} 
              onNext={nextStep} 
            />
          )}
          {step === 2 && (
            <Step2Concept 
              onNext={nextStep} 
              onBack={prevStep} 
              concept={concept} 
            />
          )}
          {step === 3 && (
            <Step3Script 
              onNext={nextStep} 
              onBack={prevStep} 
              concept={concept} 
              setScript={setScript} 
            />
          )}
          {step === 4 && (
            <Step4ImageUpload 
              onNext={nextStep} 
              onBack={prevStep} 
              concept={concept} 
              script={script} 
              setImageUrl={setImageUrl} 
            />
          )}
          {step === 5 && (
            <Step5Audio 
              onNext={nextStep} 
              onBack={prevStep} 
              script={script} 
              setAudioUrl={setAudioUrl} 
            />
          )}
          {step === 6 && (
            <Step6Music 
              onNext={nextStep} 
              onBack={prevStep} 
              music={music} 
              setMusic={setMusic} 
            />
          )}
          {step === 7 && (
            <Step7Video 
              onNext={nextStep} 
              onBack={prevStep} 
              script={script} 
              audioUrl={audioUrl} 
              imageUrl={imageUrl} 
              music={music} 
              setVideoUrl={setVideoUrl} 
            />
          )}
          {step === 8 && (
            <Step8Summary 
              onBack={prevStep} 
              concept={concept} 
              script={script} 
              imageUrl={imageUrl} 
              audioUrl={audioUrl} 
              videoUrl={videoUrl} 
            />
          )}
        </div>
      </main>
    </div>
  );
}
