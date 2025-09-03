"use client";
import { Typography, Button, Container } from '@/components/ui';
import { colors, spacing, borderRadius, typography as type } from '@/lib/theme';

interface GradientHeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryAction: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
}

export default function GradientHero({ title, subtitle, description, primaryAction, secondaryAction }: GradientHeroProps) {
  const sectionStyles: React.CSSProperties = {
    position: 'relative',
    padding: `${spacing['2xl']} 0`,
    background: `radial-gradient(1200px 600px at 20% -10%, ${colors.accent.light}22, rgba(0,0,0,0) 60%), radial-gradient(1000px 500px at 100% 0%, ${colors.primary.light}22, rgba(0,0,0,0) 60%)`,
  };

  const cardStyles: React.CSSProperties = {
    border: `1px solid ${colors.border.secondary}`,
    borderRadius: borderRadius.xl,
    background: 'rgba(255, 255, 255, 0.02)',
    padding: spacing.xl,
    maxWidth: '880px',
    margin: '0 auto',
  };

  return (
    <section style={sectionStyles}>
      <Container>
        <div style={{ textAlign: 'center' }}>
          <div style={cardStyles}>
            <Typography variant="h1" style={{ marginBottom: spacing.sm }}>{title}</Typography>
            <Typography variant="h3" color="secondary" style={{ marginBottom: spacing.md }}>{subtitle}</Typography>
            <Typography variant="body" color="secondary" style={{ margin: '0 auto', maxWidth: '640px', marginBottom: spacing.lg }}>{description}</Typography>
            <div style={{ display: 'flex', gap: spacing.md, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button variant="primary" size="lg" onClick={primaryAction.onClick}>{primaryAction.label}</Button>
              {secondaryAction && (
                <Button variant="secondary" size="lg" onClick={secondaryAction.onClick}>{secondaryAction.label}</Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
} 