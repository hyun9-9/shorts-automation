# Linear Theme UI Components

Linear 디자인 시스템을 기반으로 한 재사용 가능한 UI 컴포넌트 라이브러리입니다.

## 설치 및 사용법

```tsx
import { Button, Typography, Card, Container, Badge, Divider, Carousel, CarouselItem, Navbar, Footer, Hero } from '@/components/ui';
```

## 컴포넌트 목록

### Navbar

네비게이션 바 컴포넌트입니다. 반응형 디자인과 모바일 메뉴를 지원합니다.

```tsx
// 기본 네비게이션 바
<Navbar 
  menuItems={[
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
  ]}
/>

// 투명한 네비게이션 바
<Navbar 
  variant="transparent"
  menuItems={menuItems}
  actions={
    <div>
      <Button variant="ghost" size="sm">Sign In</Button>
      <Button variant="primary" size="sm">Get Started</Button>
    </div>
  }
/>

// 커스텀 로고
<Navbar 
  logo={<img src="/logo.svg" alt="Logo" />}
  menuItems={menuItems}
/>
```

**Props:**
- `logo`: 로고 컴포넌트 (기본값: "Linear" 텍스트)
- `menuItems`: 메뉴 아이템 배열
  - `label`: 메뉴 텍스트
  - `href`: 링크 URL
  - `isActive`: 활성 상태 (기본값: false)
- `actions`: 우측 액션 버튼들
- `variant`: 'default' | 'transparent' | 'elevated' (기본값: 'default')

### Hero

히어로 섹션 컴포넌트입니다. 다양한 레이아웃과 배경 옵션을 지원합니다.

```tsx
// 기본 히어로
<Hero
  title="Build the future of software"
  subtitle="The issue tracking tool you'll enjoy using"
  description="Linear helps streamline software projects, sprints, tasks, and bug tracking."
  primaryAction={{
    label: "Get Started",
    onClick: () => console.log("Get Started clicked")
  }}
  secondaryAction={{
    label: "Learn More",
    onClick: () => console.log("Learn More clicked")
  }}
/>

// 중앙 정렬 히어로
<Hero
  variant="centered"
  title="Streamline your workflow"
  description="Built for modern teams"
  primaryAction={{
    label: "Start Free Trial",
    onClick: () => console.log("Start Free Trial clicked")
  }}
  background={{
    type: 'gradient',
    value: 'linear-gradient(135deg, #5E6AD2, #8B5CF6)'
  }}
/>

// 분할 레이아웃 히어로
<Hero
  variant="split"
  title="The issue tracking tool you'll enjoy using"
  description="Linear helps streamline software projects."
  primaryAction={{
    label: "Get Started",
    onClick: () => console.log("Get Started clicked")
  }}
  image={{
    src: "/hero-image.jpg",
    alt: "Linear Dashboard"
  }}
/>
```

**Props:**
- `title`: 메인 제목 (필수)
- `subtitle`: 부제목
- `description`: 설명 텍스트
- `primaryAction`: 주요 액션 버튼
  - `label`: 버튼 텍스트
  - `href`: 링크 URL (선택사항)
  - `onClick`: 클릭 핸들러 (선택사항)
- `secondaryAction`: 보조 액션 버튼
- `background`: 배경 설정
  - `type`: 'gradient' | 'image' | 'video'
  - `value`: 배경 값 (그라디언트, 이미지 URL, 비디오 URL)
- `variant`: 'default' | 'centered' | 'split' (기본값: 'default')
- `image`: 이미지 설정 (split 변형용)
  - `src`: 이미지 URL
  - `alt`: 대체 텍스트

### Footer

푸터 컴포넌트입니다. 다양한 섹션과 소셜 링크를 지원합니다.

```tsx
// 기본 푸터
<Footer />

// 미니멀 푸터
<Footer variant="minimal" />

// 확장된 푸터
<Footer 
  variant="extended"
  sections={[
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Integrations', href: '/integrations' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
      ]
    }
  ]}
  socialLinks={[
    { label: 'Twitter', href: 'https://twitter.com' },
    { label: 'GitHub', href: 'https://github.com' },
  ]}
  copyright="© 2024 My Company. All rights reserved."
/>
```

**Props:**
- `logo`: 로고 컴포넌트
- `sections`: 푸터 섹션 배열
  - `title`: 섹션 제목
  - `links`: 링크 배열
    - `label`: 링크 텍스트
    - `href`: 링크 URL
- `socialLinks`: 소셜 미디어 링크 배열
- `copyright`: 저작권 텍스트
- `variant`: 'default' | 'minimal' | 'extended' (기본값: 'default')

### Button

다양한 스타일과 크기의 버튼 컴포넌트입니다.

```tsx
// 기본 사용법
<Button variant="primary" size="md">
  Click me
</Button>

// 다양한 변형
<Button variant="secondary" size="sm">Secondary</Button>
<Button variant="ghost" size="lg">Ghost</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' (기본값: 'primary')
- `size`: 'sm' | 'md' | 'lg' (기본값: 'md')
- `children`: 버튼 텍스트
- `className`: 추가 CSS 클래스

### Typography

텍스트 스타일링을 위한 타이포그래피 컴포넌트입니다.

```tsx
// 제목 스타일
<Typography variant="h1">Main Heading</Typography>
<Typography variant="h2">Sub Heading</Typography>
<Typography variant="h3">Section Title</Typography>

// 본문 텍스트
<Typography variant="body" color="secondary">
  This is body text with secondary color
</Typography>

// 커스텀 스타일
<Typography variant="h1" style={{ marginBottom: '20px' }}>
  Custom styled heading
</Typography>
```

**Props:**
- `variant`: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'button' | 'nav' (기본값: 'body')
- `color`: 'primary' | 'secondary' | 'muted' | 'accent' (기본값: 'primary')
- `as`: 렌더링할 HTML 요소 (예: 'div', 'span')
- `style`: 인라인 스타일

### Card

콘텐츠를 감싸는 카드 컴포넌트입니다. 이미지 지원이 포함되어 있습니다.

```tsx
// 기본 카드
<Card variant="default" padding="md">
  <Typography variant="h3">Card Title</Typography>
  <Typography variant="body">Card content goes here</Typography>
</Card>

// 이미지가 있는 카드
<Card 
  variant="elevated" 
  padding="none"
  image={{
    src: "/path/to/image.jpg",
    alt: "Card image",
    height: "200px"
  }}
>
  <div style={{ padding: '16px' }}>
    <Typography variant="h3">Image Card</Typography>
    <Typography variant="body">Content below image</Typography>
  </div>
</Card>

// 이미지가 하단에 있는 카드
<Card 
  variant="outlined" 
  padding="none"
  image={{
    src: "/path/to/image.jpg",
    alt: "Card image",
    height: "180px"
  }}
  imagePosition="bottom"
>
  <div style={{ padding: '16px' }}>
    <Typography variant="h3">Content First</Typography>
    <Typography variant="body">Image appears below</Typography>
  </div>
</Card>
```

**Props:**
- `variant`: 'default' | 'elevated' | 'outlined' | 'filled' (기본값: 'default')
- `padding`: 'none' | 'sm' | 'md' | 'lg' (기본값: 'md')
- `image`: 이미지 설정 객체
  - `src`: 이미지 URL
  - `alt`: 대체 텍스트
  - `height`: 이미지 높이 (기본값: '200px')
- `imagePosition`: 'top' | 'bottom' (기본값: 'top')
- `onClick`: 클릭 핸들러 (선택사항)

### Carousel

슬라이드 쇼를 위한 캐러셀 컴포넌트입니다.

```tsx
// 기본 캐러셀
<Carousel autoPlay={true} interval={3000} height="400px">
  <CarouselItem>
    <div style={{ background: 'linear-gradient(45deg, #5E6AD2, #8B5CF6)' }}>
      Slide 1 Content
    </div>
  </CarouselItem>
  <CarouselItem>
    <div style={{ background: 'linear-gradient(45deg, #8B5CF6, #7170ff)' }}>
      Slide 2 Content
    </div>
  </CarouselItem>
</Carousel>

// 이미지 캐러셀
<Carousel autoPlay={false} showDots={true} showArrows={true} height="300px">
  <CarouselItem>
    <img src="/image1.jpg" alt="Image 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  </CarouselItem>
  <CarouselItem>
    <img src="/image2.jpg" alt="Image 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  </CarouselItem>
</Carousel>

// 콘텐츠 캐러셀
<Carousel autoPlay={true} interval={5000} height="250px">
  <CarouselItem>
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h3">Feature 1</Typography>
      <Typography variant="body">Description of feature 1</Typography>
    </div>
  </CarouselItem>
  <CarouselItem>
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h3">Feature 2</Typography>
      <Typography variant="body">Description of feature 2</Typography>
    </div>
  </CarouselItem>
</Carousel>
```

**Props:**
- `autoPlay`: 자동 재생 여부 (기본값: false)
- `interval`: 자동 재생 간격 (밀리초, 기본값: 3000)
- `showDots`: 하단 점 표시 여부 (기본값: true)
- `showArrows`: 화살표 버튼 표시 여부 (기본값: true)
- `height`: 캐러셀 높이 (기본값: '400px')
- `className`: 추가 CSS 클래스

### Container

콘텐츠를 중앙 정렬하고 최대 너비를 제한하는 컨테이너입니다.

```tsx
<Container maxWidth="lg" padding="md">
  <Typography variant="h1">Page Content</Typography>
  <Typography variant="body">This content is centered and has max width</Typography>
</Container>
```

**Props:**
- `maxWidth`: 'sm' | 'md' | 'lg' | 'xl' | 'full' (기본값: 'lg')
- `padding`: 'none' | 'sm' | 'md' | 'lg' (기본값: 'md')
- `centered`: 중앙 정렬 여부 (기본값: true)

### Badge

상태나 라벨을 표시하는 배지 컴포넌트입니다.

```tsx
// 상태 배지
<Badge variant="success">Completed</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Error</Badge>

// 크기 변형
<Badge variant="primary" size="sm">Small</Badge>
<Badge variant="primary" size="lg">Large</Badge>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost' (기본값: 'primary')
- `size`: 'sm' | 'md' | 'lg' (기본값: 'md')

### Divider

콘텐츠를 구분하는 구분선 컴포넌트입니다.

```tsx
// 수평 구분선
<Typography variant="body">Content above</Typography>
<Divider variant="solid" color="secondary" />
<Typography variant="body">Content below</Typography>

// 수직 구분선
<div style={{ display: 'flex', alignItems: 'center' }}>
  <span>Left</span>
  <Divider orientation="vertical" variant="dashed" />
  <span>Right</span>
</div>
```

**Props:**
- `orientation`: 'horizontal' | 'vertical' (기본값: 'horizontal')
- `variant`: 'solid' | 'dashed' | 'dotted' (기본값: 'solid')
- `color`: 'primary' | 'secondary' | 'muted' (기본값: 'secondary')
- `size`: 'sm' | 'md' | 'lg' (기본값: 'md')

## 고급 사용 예시

### 완전한 페이지 레이아웃
```tsx
import { Navbar, Hero, Container, Footer } from '@/components/ui';

const HomePage = () => {
  return (
    <div>
      <Navbar 
        menuItems={[
          { label: 'Features', href: '/features' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'About', href: '/about' },
        ]}
      />
      
      <Hero
        title="Build the future of software"
        subtitle="The issue tracking tool you'll enjoy using"
        description="Linear helps streamline software projects, sprints, tasks, and bug tracking."
        primaryAction={{
          label: "Get Started",
          onClick: () => console.log("Get Started clicked")
        }}
        secondaryAction={{
          label: "Learn More",
          onClick: () => console.log("Learn More clicked")
        }}
      />
      
      <Container>
        {/* 페이지 콘텐츠 */}
      </Container>
      
      <Footer />
    </div>
  );
};
```

### 이미지가 있는 카드 그리드
```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
  <Card 
    variant="elevated" 
    padding="none"
    image={{
      src: "/product1.jpg",
      alt: "Product 1",
      height: "200px"
    }}
  >
    <div style={{ padding: '16px' }}>
      <Typography variant="h3">Product Title</Typography>
      <Typography variant="body" color="secondary">Product description</Typography>
      <Button variant="primary" size="sm">Buy Now</Button>
    </div>
  </Card>
  
  <Card 
    variant="outlined" 
    padding="none"
    image={{
      src: "/product2.jpg",
      alt: "Product 2",
      height: "200px"
    }}
  >
    <div style={{ padding: '16px' }}>
      <Typography variant="h3">Another Product</Typography>
      <Typography variant="body" color="secondary">Another description</Typography>
      <Badge variant="success">New</Badge>
    </div>
  </Card>
</div>
```

### 캐러셀과 카드 조합
```tsx
<Container>
  <Typography variant="h2" style={{ marginBottom: '20px' }}>
    Featured Products
  </Typography>
  
  <Carousel autoPlay={true} interval={4000} height="400px">
    <CarouselItem>
      <Card variant="elevated" padding="none" style={{ margin: '0 10px' }}>
        <img src="/featured1.jpg" alt="Featured 1" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
        <div style={{ padding: '20px' }}>
          <Typography variant="h3">Featured Product 1</Typography>
          <Typography variant="body" color="secondary">Special offer description</Typography>
        </div>
      </Card>
    </CarouselItem>
    
    <CarouselItem>
      <Card variant="elevated" padding="none" style={{ margin: '0 10px' }}>
        <img src="/featured2.jpg" alt="Featured 2" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
        <div style={{ padding: '20px' }}>
          <Typography variant="h3">Featured Product 2</Typography>
          <Typography variant="body" color="secondary">Another special offer</Typography>
        </div>
      </Card>
    </CarouselItem>
  </Carousel>
</Container>
```

## 테마 시스템

모든 컴포넌트는 Linear 테마 시스템을 사용합니다. 테마 데이터는 `@/lib/theme`에서 가져올 수 있습니다.

```tsx
import { colors, typography, spacing, borderRadius, shadows } from '@/lib/theme';

// 색상 사용
const primaryColor = colors.primary.main;

// 타이포그래피 사용
const headingStyle = {
  fontSize: typography.fontSize.h1,
  fontWeight: typography.fontWeight.h1,
  lineHeight: typography.lineHeight.h1,
};

// 간격 사용
const containerStyle = {
  padding: spacing.lg,
  marginBottom: spacing.xl,
};
```

## 데모 페이지

컴포넌트 데모를 확인하려면 `/components` 페이지를 방문하세요.

## 스타일 가이드

### 색상 팔레트
- **Primary**: #5E6AD2 (메인 브랜드 색상)
- **Secondary**: #8B5CF6 (보조 색상)
- **Background**: #08090A (배경색)
- **Text Primary**: #F7F8F8 (주요 텍스트)
- **Text Secondary**: #8A8F98 (보조 텍스트)

### 타이포그래피
- **H1**: 64px, 510 weight
- **H2**: 56px, 538 weight
- **H3**: 21px, 510 weight
- **H4**: 14px, 510 weight
- **Body**: 17px, 400 weight

### 간격 시스템
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)
- **3xl**: 4rem (64px) 