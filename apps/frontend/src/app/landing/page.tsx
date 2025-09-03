"use client";
import { Footer } from '@/components/ui';
import { colors } from '@/lib/theme';
import GradientHero from './components/GradientHero';
import FeatureGrid from './components/FeatureGrid';
import ProcessSteps from './components/ProcessSteps';
import CTASection from './components/CTASection';

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background.body }}>
      <main>
        <GradientHero
          title="나만의 AI 쇼츠 스튜디오"
          subtitle="Linear 테마 감성의 미니멀한 경험"
          description="감정 선택부터 비디오 완성까지, 간단한 흐름으로 빠르게 쇼츠를 만들어보세요."
          primaryAction={{ label: '지금 만들어보기', onClick: () => (window.location.href = '/shorts') }}
          secondaryAction={{ label: '예시 보기', onClick: () => (window.location.href = '/gallery') }}
        />

        <FeatureGrid
          title="핵심 기능"
          subtitle="필요한 것만 담았습니다"
          items={[
            { icon: '🎥', title: 'AI 편집', description: '스크립트, 이미지, 오디오를 결합해 자동 편집', color: '#7170ff' },
            { icon: '🗣️', title: '자연스러운 음성', description: '여러 목소리 톤과 스타일 선택 가능' },
            { icon: '🎼', title: '배경 음악', description: '분위기에 맞는 음악을 자동 추천' },
            { icon: '⏱️', title: '빠른 생성', description: '아이디어에서 결과까지 단 몇 분' },
          ]}
        />

        <ProcessSteps
          title="간단한 4단계"
          steps={[
            { number: '01', title: '감정 선택', description: '쇼츠의 분위기를 정해요' },
            { number: '02', title: '콘셉트/스크립트', description: 'AI가 스크립트를 도와줘요' },
            { number: '03', title: '미디어 준비', description: '이미지/음성/음악을 고르고 업로드' },
            { number: '04', title: 'AI 편집', description: '자동 편집으로 쇼츠 완성' },
          ]}
        />

        <CTASection
          title="지금 바로 시작해보세요"
          description="첫 쇼츠는 무료입니다. 지금 바로 당신의 아이디어를 영상으로 바꿔보세요."
          primary={{ label: '무료로 시작', onClick: () => (window.location.href = '/shorts') }}
          secondary={{ label: '홈으로', onClick: () => (window.location.href = '/') }}
        />
      </main>

      <Footer
        variant="extended"
        sections={[
          {
            title: '서비스',
            links: [
              { label: 'Landing', href: '/landing' },
              { label: '쇼츠 만들기', href: '/shorts' },
            ],
          },
          {
            title: '지원',
            links: [
              { label: '도움말', href: '/help' },
              { label: '문의하기', href: '/contact' },
            ],
          },
        ]}
      />
    </div>
  );
} 