"use client";
import { Button, Typography, Card, Container, Badge,  Footer, Hero } from '@/components/ui';
import { colors, typography, spacing, borderRadius } from '@/lib/theme';

const features = [
  {
    icon: '🎬',
    title: 'AI 자동 편집',
    description: '스크립트, 이미지, 음성을 자동으로 조합하여 완성된 쇼츠를 생성합니다.',
    color: colors.primary.main
  },
  {
    icon: '🎵',
    title: '다양한 음성',
    description: '여러 가지 음성 옵션 중에서 선택하여 개성 있는 나레이션을 만들 수 있습니다.',
    color: colors.secondary.main
  },
  {
    icon: '🎨',
    title: '스타일 커스터마이징',
    description: '다양한 편집 스타일과 배경음악을 선택하여 원하는 분위기를 연출합니다.',
    color: colors.accent.main
  },
  {
    icon: '⚡',
    title: '빠른 생성',
    description: '몇 분 안에 완성된 쇼츠를 만들 수 있어 시간을 절약할 수 있습니다.',
    color: colors.primary.light
  }
];

const steps = [
  {
    number: '01',
    title: '감정 선택',
    description: '쇼츠의 분위기와 감정을 선택합니다.'
  },
  {
    number: '02',
    title: '콘셉트 결정',
    description: '주제와 콘셉트를 정하고 스크립트를 생성합니다.'
  },
  {
    number: '03',
    title: '미디어 준비',
    description: '이미지와 음성을 준비하고 배경음악을 선택합니다.'
  },
  {
    number: '04',
    title: '완성',
    description: 'AI가 자동으로 편집하여 완성된 쇼츠를 만듭니다.'
  }
];

export default function HomePage() {
  const menuItems = [
    { label: '홈', href: '/' },
    { label: '쇼츠 만들기', href: '/shorts' },
    { label: '갤러리', href: '/gallery' },
    { label: '도움말', href: '/help' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background.body }}>
      
      <main>
        {/* Hero Section */}
        <Hero
          title="AI로 만드는 완벽한 쇼츠"
          subtitle="스크립트부터 편집까지, 모든 과정을 AI가 도와드립니다"
          description="아이디어만 있으면 충분합니다. AI가 당신의 창의성을 멋진 쇼츠로 만들어드립니다."
          primaryAction={{
            label: "쇼츠 만들기 시작",
            onClick: () => window.location.href = '/shorts'
          }}
          secondaryAction={{
            label: "갤러리 보기",
            onClick: () => window.location.href = '/gallery'
          }}
        />

        {/* Features Section */}
        <section style={{ padding: `${spacing['2xl']} 0` }}>
          <Container>
            <div style={{ textAlign: 'center', marginBottom: spacing['2xl'] }}>
              <Typography variant="h1" style={{ marginBottom: spacing.md }}>
                왜 AI 쇼츠 제작기를 선택해야 할까요?
              </Typography>
              <Typography variant="body" color="secondary" style={{ maxWidth: '600px', margin: '0 auto' }}>
                복잡한 편집 프로그램 없이도 전문가 수준의 쇼츠를 만들 수 있습니다.
              </Typography>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: spacing.xl 
            }}>
              {features.map((feature, index) => (
                <Card key={index} variant="elevated" padding="lg">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '64px', 
                      marginBottom: spacing.lg,
                      color: feature.color
                    }}>
                      {feature.icon}
                    </div>
                    <Typography variant="h3" style={{ marginBottom: spacing.md }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body" color="secondary">
                      {feature.description}
                    </Typography>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* How it works Section */}
        <section style={{ 
          padding: `${spacing['2xl']} 0`,
          backgroundColor: colors.background.surface 
        }}>
          <Container>
            <div style={{ textAlign: 'center', marginBottom: spacing['2xl'] }}>
              <Typography variant="h1" style={{ marginBottom: spacing.md }}>
                어떻게 작동하나요?
              </Typography>
              <Typography variant="body" color="secondary" style={{ maxWidth: '600px', margin: '0 auto' }}>
                단 4단계로 완성된 쇼츠를 만들 수 있습니다.
              </Typography>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: spacing.xl 
            }}>
              {steps.map((step, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: colors.primary.main,
                    color: colors.text.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: typography.fontSize.h2,
                    fontWeight: typography.fontWeight.bold,
                    margin: '0 auto',
                    marginBottom: spacing.lg
                  }}>
                    {step.number}
                  </div>
                  <Typography variant="h3" style={{ marginBottom: spacing.md }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body" color="secondary">
                    {step.description}
                  </Typography>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section style={{ padding: `${spacing['2xl']} 0` }}>
          <Container>
            <Card variant="elevated" padding="lg" className="cta-card">
              <Typography variant="h1" style={{ marginBottom: spacing.md }}>
                지금 바로 시작해보세요!
              </Typography>
              <Typography variant="body" color="secondary" style={{ marginBottom: spacing.xl, maxWidth: '600px', margin: '0 auto' }}>
                첫 번째 쇼츠는 무료로 만들어볼 수 있습니다. AI의 놀라운 창작 능력을 경험해보세요.
              </Typography>
              <div style={{ display: 'flex', gap: spacing.md, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button variant="primary" size="lg" onClick={() => window.location.href = '/shorts'}>
                  무료로 시작하기
                </Button>
                <Button variant="secondary" size="lg" onClick={() => window.location.href = '/gallery'}>
                  예시 보기
                </Button>
              </div>
            </Card>
          </Container>
        </section>
      </main>

      <Footer 
        variant="extended"
        sections={[
          {
            title: '서비스',
            links: [
              { label: '쇼츠 만들기', href: '/shorts' },
              { label: '갤러리', href: '/gallery' },
              { label: '템플릿', href: '/templates' },
            ]
          },
          {
            title: '지원',
            links: [
              { label: '도움말', href: '/help' },
              { label: '문의하기', href: '/contact' },
              { label: 'FAQ', href: '/faq' },
            ]
          },
          {
            title: '회사',
            links: [
              { label: '소개', href: '/about' },
              { label: '개인정보처리방침', href: '/privacy' },
              { label: '이용약관', href: '/terms' },
            ]
          }
        ]}
      />

      <style>{`
        .cta-card {
          text-align: center;
        }
      `}</style>
    </div>
  );
}
