'use client';

import React from 'react';
import { Button, Typography, Card, Container, Badge, Divider, Carousel, CarouselItem, Navbar, Footer, Hero } from '@/components/ui';
import { colors, spacing } from '@/lib/theme';

const ComponentsPage = () => {
  // 샘플 이미지 URL들
  const sampleImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
  ];

  const menuItems = [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <div style={{ 
      backgroundColor: colors.background.body, 
      minHeight: '100vh'
    }}>
      {/* Navbar Section */}
      <section style={{ marginBottom: spacing['3xl'] }}>
        <Typography variant="h2" style={{ 
          marginBottom: spacing.lg, 
          padding: `${spacing['3xl']} ${spacing.lg} 0`,
          textAlign: 'center'
        }}>
          Navigation Components
        </Typography>
        
        {/* Default Navbar */}
        <div style={{ marginBottom: spacing['2xl'] }}>
          <Typography variant="h4" style={{ 
            marginBottom: spacing.sm, 
            padding: `0 ${spacing.lg}`,
            color: colors.text.secondary
          }}>
            Default Navbar
          </Typography>
          <Navbar 
            menuItems={menuItems}
            variant="default"
          />
        </div>

        {/* Transparent Navbar */}
        <div style={{ 
          marginBottom: spacing['2xl'],
          background: `linear-gradient(135deg, ${colors.primary.main}20, ${colors.secondary.main}20)`,
          padding: spacing.lg,
          borderRadius: spacing.lg
        }}>
          <Typography variant="h4" style={{ 
            marginBottom: spacing.sm,
            color: colors.text.secondary
          }}>
            Transparent Navbar
          </Typography>
          <Navbar 
            menuItems={menuItems}
            variant="transparent"
          />
        </div>

        {/* Elevated Navbar */}
        <div style={{ marginBottom: spacing['2xl'] }}>
          <Typography variant="h4" style={{ 
            marginBottom: spacing.sm, 
            padding: `0 ${spacing.lg}`,
            color: colors.text.secondary
          }}>
            Elevated Navbar
          </Typography>
          <Navbar 
            menuItems={menuItems}
            variant="elevated"
          />
        </div>
      </section>

      {/* Hero Section */}
      <section style={{ marginBottom: spacing['3xl'] }}>
        <Typography variant="h2" style={{ 
          marginBottom: spacing.lg, 
          padding: `0 ${spacing.lg}`,
          textAlign: 'center'
        }}>
          Hero Components
        </Typography>
        
        {/* Default Hero */}
        <div style={{ marginBottom: spacing['2xl'] }}>
          <Typography variant="h4" style={{ 
            marginBottom: spacing.sm, 
            padding: `0 ${spacing.lg}`,
            color: colors.text.secondary
          }}>
            Default Hero
          </Typography>
          <Hero
            title="Build the future of software"
            subtitle="The issue tracking tool you'll enjoy using"
            description="Linear helps streamline software projects, sprints, tasks, and bug tracking. It's built for high-performance teams."
            primaryAction={{
              label: "Get Started",
              onClick: () => console.log("Get Started clicked")
            }}
            secondaryAction={{
              label: "Learn More",
              onClick: () => console.log("Learn More clicked")
            }}
          />
        </div>

        {/* Centered Hero */}
        <div style={{ marginBottom: spacing['2xl'] }}>
          <Typography variant="h4" style={{ 
            marginBottom: spacing.sm, 
            padding: `0 ${spacing.lg}`,
            color: colors.text.secondary
          }}>
            Centered Hero
          </Typography>
          <Hero
            variant="centered"
            title="Streamline your workflow"
            subtitle="Built for modern teams"
            description="Linear is the issue tracking tool you'll enjoy using. It helps streamline software projects, sprints, tasks, and bug tracking."
            primaryAction={{
              label: "Start Free Trial",
              onClick: () => console.log("Start Free Trial clicked")
            }}
            secondaryAction={{
              label: "View Demo",
              onClick: () => console.log("View Demo clicked")
            }}
            background={{
              type: 'gradient',
              value: `linear-gradient(135deg, ${colors.primary.main}20, ${colors.secondary.main}20)`
            }}
          />
        </div>

        {/* Split Hero */}
        <div style={{ marginBottom: spacing['2xl'] }}>
          <Typography variant="h4" style={{ 
            marginBottom: spacing.sm, 
            padding: `0 ${spacing.lg}`,
            color: colors.text.secondary
          }}>
            Split Hero
          </Typography>
          <Hero
            variant="split"
            title="The issue tracking tool you'll enjoy using"
            description="Linear helps streamline software projects, sprints, tasks, and bug tracking. It's built for high-performance teams."
            primaryAction={{
              label: "Get Started",
              onClick: () => console.log("Get Started clicked")
            }}
            image={{
              src: sampleImages[0],
              alt: "Linear Dashboard"
            }}
          />
        </div>
      </section>

      <Container>
        <Typography variant="h1" style={{ marginBottom: spacing.xl }}>
          Linear Theme Components
        </Typography>
        
        <Typography variant="body" color="secondary" style={{ marginBottom: spacing['3xl'] }}>
          재사용 가능한 컴포넌트 라이브러리 - Linear 디자인 시스템 기반
        </Typography>

        {/* Typography Section */}
        <section style={{ marginBottom: spacing['3xl'] }}>
          <Typography variant="h2" style={{ marginBottom: spacing.lg }}>
            Typography
          </Typography>
          
          <Card variant="outlined" padding="lg">
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
              <Typography variant="h1">Heading 1 - 64px</Typography>
              <Typography variant="h2">Heading 2 - 56px</Typography>
              <Typography variant="h3">Heading 3 - 21px</Typography>
              <Typography variant="h4">Heading 4 - 14px</Typography>
              <Typography variant="body">Body Text - 17px</Typography>
              <Typography variant="button">Button Text - 13px</Typography>
              <Typography variant="nav">Navigation Text - 16px</Typography>
            </div>
          </Card>
        </section>

        {/* Carousel Section */}
        <section style={{ marginBottom: spacing['3xl'] }}>
          <Typography variant="h2" style={{ marginBottom: spacing.lg }}>
            Carousel
          </Typography>
          
          <Card variant="outlined" padding="lg">
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
              {/* Basic Carousel */}
              <div>
                <Typography variant="h4" style={{ marginBottom: spacing.sm }}>
                  Basic Carousel
                </Typography>
                <Carousel autoPlay={true} interval={4000} height="300px">
                  <CarouselItem>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.secondary.main})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: colors.text.primary,
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}>
                      Slide 1 - Primary Gradient
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(135deg, ${colors.secondary.main}, ${colors.accent.main})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: colors.text.primary,
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}>
                      Slide 2 - Secondary Gradient
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(135deg, ${colors.accent.main}, ${colors.primary.light})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: colors.text.primary,
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}>
                      Slide 3 - Accent Gradient
                    </div>
                  </CarouselItem>
                </Carousel>
              </div>

              {/* Image Carousel */}
              <div>
                <Typography variant="h4" style={{ marginBottom: spacing.sm }}>
                  Image Carousel
                </Typography>
                <Carousel autoPlay={false} showDots={true} showArrows={true} height="250px">
                  {sampleImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <img 
                        src={image} 
                        alt={`Sample image ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </CarouselItem>
                  ))}
                </Carousel>
              </div>

              {/* Content Carousel */}
              <div>
                <Typography variant="h4" style={{ marginBottom: spacing.sm }}>
                  Content Carousel
                </Typography>
                <Carousel autoPlay={true} interval={5000} height="200px">
                  <CarouselItem>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      padding: spacing.lg,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    }}>
                      <Typography variant="h3" style={{ marginBottom: spacing.sm }}>
                        Feature 1
                      </Typography>
                      <Typography variant="body" color="secondary">
                        Powerful project management tools
                      </Typography>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      padding: spacing.lg,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    }}>
                      <Typography variant="h3" style={{ marginBottom: spacing.sm }}>
                        Feature 2
                      </Typography>
                      <Typography variant="body" color="secondary">
                        Real-time collaboration
                      </Typography>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      padding: spacing.lg,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    }}>
                      <Typography variant="h3" style={{ marginBottom: spacing.sm }}>
                        Feature 3
                      </Typography>
                      <Typography variant="body" color="secondary">
                        Advanced analytics and insights
                      </Typography>
                    </div>
                  </CarouselItem>
                </Carousel>
              </div>
            </div>
          </Card>
        </section>

        {/* Button Section */}
        <section style={{ marginBottom: spacing['3xl'] }}>
          <Typography variant="h2" style={{ marginBottom: spacing.lg }}>
            Buttons
          </Typography>
          
          <Card variant="outlined" padding="lg">
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
              {/* Primary Buttons */}
              <div>
                <Typography variant="h4" style={{ marginBottom: spacing.sm }}>
                  Primary Buttons
                </Typography>
                <div style={{ display: 'flex', gap: spacing.sm, flexWrap: 'wrap' }}>
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </div>
              </div>

              {/* Secondary Buttons */}
              <div>
                <Typography variant="h4" style={{ marginBottom: spacing.sm }}>
                  Secondary Buttons
                </Typography>
                <div style={{ display: 'flex', gap: spacing.sm, flexWrap: 'wrap' }}>
                  <Button variant="secondary" size="sm">Small</Button>
                  <Button variant="secondary" size="md">Medium</Button>
                  <Button variant="secondary" size="lg">Large</Button>
                </div>
              </div>

              {/* Ghost Buttons */}
              <div>
                <Typography variant="h4" style={{ marginBottom: spacing.sm }}>
                  Ghost Buttons
                </Typography>
                <div style={{ display: 'flex', gap: spacing.sm, flexWrap: 'wrap' }}>
                  <Button variant="ghost" size="sm">Small</Button>
                  <Button variant="ghost" size="md">Medium</Button>
                  <Button variant="ghost" size="lg">Large</Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Badge Section */}
        <section style={{ marginBottom: spacing['3xl'] }}>
          <Typography variant="h2" style={{ marginBottom: spacing.lg }}>
            Badges
          </Typography>
          
          <Card variant="outlined" padding="lg">
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
              {/* Badge Variants */}
              <div>
                <Typography variant="h4" style={{ marginBottom: spacing.sm }}>
                  Badge Variants
                </Typography>
                <div style={{ display: 'flex', gap: spacing.sm, flexWrap: 'wrap', alignItems: 'center' }}>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="ghost">Ghost</Badge>
                </div>
              </div>

              {/* Badge Sizes */}
              <div>
                <Typography variant="h4" style={{ marginBottom: spacing.sm }}>
                  Badge Sizes
                </Typography>
                <div style={{ display: 'flex', gap: spacing.sm, flexWrap: 'wrap', alignItems: 'center' }}>
                  <Badge variant="primary" size="sm">Small</Badge>
                  <Badge variant="primary" size="md">Medium</Badge>
                  <Badge variant="primary" size="lg">Large</Badge>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Divider Section */}
        <section style={{ marginBottom: spacing['3xl'] }}>
          <Typography variant="h2" style={{ marginBottom: spacing.lg }}>
            Dividers
          </Typography>
          
          <Card variant="outlined" padding="lg">
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
              {/* Horizontal Dividers */}
              <div>
                <Typography variant="h4" style={{ marginBottom: spacing.sm }}>
                  Horizontal Dividers
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
                  <Typography variant="body">Content above divider</Typography>
                  <Divider variant="solid" color="secondary" />
                  <Typography variant="body">Content below divider</Typography>
                  <Divider variant="dashed" color="muted" />
                  <Typography variant="body">Content below dashed divider</Typography>
                  <Divider variant="dotted" color="primary" />
                  <Typography variant="body">Content below dotted divider</Typography>
                </div>
              </div>

              {/* Vertical Dividers */}
              <div>
                <Typography variant="h4" style={{ marginBottom: spacing.sm }}>
                  Vertical Dividers
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md, height: '40px' }}>
                  <Typography variant="body">Left</Typography>
                  <Divider orientation="vertical" variant="solid" color="secondary" />
                  <Typography variant="body">Center</Typography>
                  <Divider orientation="vertical" variant="dashed" color="muted" />
                  <Typography variant="body">Right</Typography>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Card Section */}
        <section style={{ marginBottom: spacing['3xl'] }}>
          <Typography variant="h2" style={{ marginBottom: spacing.lg }}>
            Cards
          </Typography>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: spacing.lg }}>
            {/* Basic Cards */}
            <Card variant="default" padding="lg">
              <Typography variant="h3" style={{ marginBottom: spacing.sm }}>
                Default Card
              </Typography>
              <Typography variant="body" color="secondary">
                기본 카드 스타일입니다. 배경과 테두리가 없습니다.
              </Typography>
            </Card>

            <Card variant="elevated" padding="lg">
              <Typography variant="h3" style={{ marginBottom: spacing.sm }}>
                Elevated Card
              </Typography>
              <Typography variant="body" color="secondary">
                그림자가 있는 카드입니다. 호버 시 그림자가 커집니다.
              </Typography>
            </Card>

            <Card variant="outlined" padding="lg">
              <Typography variant="h3" style={{ marginBottom: spacing.sm }}>
                Outlined Card
              </Typography>
              <Typography variant="body" color="secondary">
                테두리가 있는 카드입니다. 선명한 경계를 제공합니다.
              </Typography>
            </Card>

            <Card variant="filled" padding="lg">
              <Typography variant="h3" style={{ marginBottom: spacing.sm }}>
                Filled Card
              </Typography>
              <Typography variant="body" color="secondary">
                배경색이 있는 카드입니다. 강조가 필요한 콘텐츠에 적합합니다.
              </Typography>
            </Card>

            {/* Image Cards */}
            <Card 
              variant="elevated" 
              padding="none"
              image={{
                src: sampleImages[0],
                alt: "Mountain landscape",
                height: "200px"
              }}
            >
              <div style={{ padding: spacing.lg }}>
                <Typography variant="h3" style={{ marginBottom: spacing.sm }}>
                  Image Card (Top)
                </Typography>
                <Typography variant="body" color="secondary" style={{ marginBottom: spacing.md }}>
                  이미지가 상단에 위치한 카드입니다. 자연스러운 레이아웃을 제공합니다.
                </Typography>
                <Button variant="primary" size="sm">Learn More</Button>
              </div>
            </Card>

            <Card 
              variant="outlined" 
              padding="none"
              image={{
                src: sampleImages[1],
                alt: "Forest landscape",
                height: "180px"
              }}
            >
              <div style={{ padding: spacing.lg }}>
                <Typography variant="h3" style={{ marginBottom: spacing.sm }}>
                  Image Card (Top)
                </Typography>
                <Typography variant="body" color="secondary" style={{ marginBottom: spacing.md }}>
                  테두리가 있는 이미지 카드입니다. 깔끔한 디자인을 제공합니다.
                </Typography>
                <div style={{ display: 'flex', gap: spacing.sm }}>
                  <Badge variant="success">New</Badge>
                  <Badge variant="primary">Featured</Badge>
                </div>
              </div>
            </Card>

            <Card 
              variant="filled" 
              padding="none"
              image={{
                src: sampleImages[2],
                alt: "Ocean landscape",
                height: "220px"
              }}
            >
              <div style={{ padding: spacing.lg }}>
                <Typography variant="h3" style={{ marginBottom: spacing.sm }}>
                  Image Card (Top)
                </Typography>
                <Typography variant="body" color="secondary" style={{ marginBottom: spacing.md }}>
                  배경색이 있는 이미지 카드입니다. 강조가 필요한 콘텐츠에 적합합니다.
                </Typography>
                <div style={{ display: 'flex', gap: spacing.sm }}>
                  <Button variant="primary" size="sm">View Details</Button>
                  <Button variant="ghost" size="sm">Share</Button>
                </div>
              </div>
            </Card>

            <Card 
              variant="elevated" 
              padding="none"
              image={{
                src: sampleImages[3],
                alt: "City landscape",
                height: "160px"
              }}
              imagePosition="bottom"
            >
              <div style={{ padding: spacing.lg }}>
                <Typography variant="h3" style={{ marginBottom: spacing.sm }}>
                  Image Card (Bottom)
                </Typography>
                <Typography variant="body" color="secondary" style={{ marginBottom: spacing.md }}>
                  이미지가 하단에 위치한 카드입니다. 다른 레이아웃 옵션을 제공합니다.
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Badge variant="warning">Popular</Badge>
                  <Button variant="secondary" size="sm">Explore</Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Color Palette Section */}
        <section style={{ marginBottom: spacing['3xl'] }}>
          <Typography variant="h2" style={{ marginBottom: spacing.lg }}>
            Color Palette
          </Typography>
          
          <Card variant="outlined" padding="lg">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: spacing.lg }}>
              {/* Primary Colors */}
              <div>
                <Typography variant="h4" style={{ marginBottom: spacing.sm }}>
                  Primary Colors
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
                  <div style={{ 
                    backgroundColor: colors.primary.main, 
                    height: '40px', 
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography variant="button" color="primary">Main</Typography>
                  </div>
                  <div style={{ 
                    backgroundColor: colors.primary.light, 
                    height: '40px', 
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography variant="button" color="primary">Light</Typography>
                  </div>
                  <div style={{ 
                    backgroundColor: colors.primary.dark, 
                    height: '40px', 
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography variant="button" color="primary">Dark</Typography>
                  </div>
                </div>
              </div>

              {/* Secondary Colors */}
              <div>
                <Typography variant="h4" style={{ marginBottom: spacing.sm }}>
                  Secondary Colors
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
                  <div style={{ 
                    backgroundColor: colors.secondary.main, 
                    height: '40px', 
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography variant="button" color="primary">Main</Typography>
                  </div>
                  <div style={{ 
                    backgroundColor: colors.secondary.light, 
                    height: '40px', 
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography variant="button" color="primary">Light</Typography>
                  </div>
                  <div style={{ 
                    backgroundColor: colors.secondary.dark, 
                    height: '40px', 
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography variant="button" color="primary">Dark</Typography>
                  </div>
                </div>
              </div>

              {/* Text Colors */}
              <div>
                <Typography variant="h4" style={{ marginBottom: spacing.sm }}>
                  Text Colors
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
                  <Typography variant="body" color="primary">Primary Text</Typography>
                  <Typography variant="body" color="secondary">Secondary Text</Typography>
                  <Typography variant="body" color="muted">Muted Text</Typography>
                  <Typography variant="body" color="accent">Accent Text</Typography>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Spacing Section */}
        <section style={{ marginBottom: spacing['3xl'] }}>
          <Typography variant="h2" style={{ marginBottom: spacing.lg }}>
            Spacing System
          </Typography>
          
          <Card variant="outlined" padding="lg">
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                <div style={{ 
                  backgroundColor: colors.primary.main, 
                  width: spacing.xs, 
                  height: '20px',
                  borderRadius: '2px'
                }}></div>
                <Typography variant="body">xs: {spacing.xs}</Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                <div style={{ 
                  backgroundColor: colors.primary.main, 
                  width: spacing.sm, 
                  height: '20px',
                  borderRadius: '2px'
                }}></div>
                <Typography variant="body">sm: {spacing.sm}</Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                <div style={{ 
                  backgroundColor: colors.primary.main, 
                  width: spacing.md, 
                  height: '20px',
                  borderRadius: '2px'
                }}></div>
                <Typography variant="body">md: {spacing.md}</Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                <div style={{ 
                  backgroundColor: colors.primary.main, 
                  width: spacing.lg, 
                  height: '20px',
                  borderRadius: '2px'
                }}></div>
                <Typography variant="body">lg: {spacing.lg}</Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                <div style={{ 
                  backgroundColor: colors.primary.main, 
                  width: spacing.xl, 
                  height: '20px',
                  borderRadius: '2px'
                }}></div>
                <Typography variant="body">xl: {spacing.xl}</Typography>
              </div>
            </div>
          </Card>
        </section>
      </Container>

      {/* Footer Section */}
      <section style={{ marginTop: spacing['3xl'] }}>
        <Typography variant="h2" style={{ 
          marginBottom: spacing.lg, 
          padding: `0 ${spacing.lg}`,
          textAlign: 'center'
        }}>
          Footer Components
        </Typography>
        
        {/* Default Footer */}
        <div style={{ marginBottom: spacing['2xl'] }}>
          <Typography variant="h4" style={{ 
            marginBottom: spacing.sm, 
            padding: `0 ${spacing.lg}`,
            color: colors.text.secondary
          }}>
            Default Footer
          </Typography>
          <Footer />
        </div>

        {/* Minimal Footer */}
        <div style={{ marginBottom: spacing['2xl'] }}>
          <Typography variant="h4" style={{ 
            marginBottom: spacing.sm, 
            padding: `0 ${spacing.lg}`,
            color: colors.text.secondary
          }}>
            Minimal Footer
          </Typography>
          <Footer variant="minimal" />
        </div>

        {/* Extended Footer */}
        <div style={{ marginBottom: spacing['2xl'] }}>
          <Typography variant="h4" style={{ 
            marginBottom: spacing.sm, 
            padding: `0 ${spacing.lg}`,
            color: colors.text.secondary
          }}>
            Extended Footer
          </Typography>
          <Footer 
            variant="extended"
            sections={[
              {
                title: 'Product',
                links: [
                  { label: 'Features', href: '/features' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'Integrations', href: '/integrations' },
                  { label: 'API', href: '/api' },
                  { label: 'Changelog', href: '/changelog' },
                ]
              },
              {
                title: 'Company',
                links: [
                  { label: 'About', href: '/about' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'Careers', href: '/careers' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'Press', href: '/press' },
                ]
              },
              {
                title: 'Resources',
                links: [
                  { label: 'Documentation', href: '/docs' },
                  { label: 'Help Center', href: '/help' },
                  { label: 'Community', href: '/community' },
                  { label: 'Status', href: '/status' },
                  { label: 'Support', href: '/support' },
                ]
              },
              {
                title: 'Legal',
                links: [
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Terms of Service', href: '/terms' },
                  { label: 'Cookie Policy', href: '/cookies' },
                  { label: 'GDPR', href: '/gdpr' },
                  { label: 'Security', href: '/security' },
                ]
              }
            ]}
          />
        </div>
      </section>
    </div>
  );
};

export default ComponentsPage; 