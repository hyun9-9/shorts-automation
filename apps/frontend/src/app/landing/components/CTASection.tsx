"use client";
import { Typography, Button, Container } from '@/components/ui';
import { colors, spacing } from '@/lib/theme';
import GlassCard from './GlassCard';

interface CTASectionProps {
  title: string;
  description: string;
  primary: { label: string; onClick: () => void };
  secondary?: { label: string; onClick: () => void };
}

export default function CTASection({ title, description, primary, secondary }: CTASectionProps) {
  return (
    <section style={{ padding: `${spacing['2xl']} 0` }}>
      <Container>
        <GlassCard>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h1" style={{ marginBottom: spacing.md }}>{title}</Typography>
            <Typography variant="body" color="secondary" style={{ marginBottom: spacing.lg, maxWidth: '640px', margin: '0 auto' }}>{description}</Typography>
            <div style={{ display: 'flex', gap: spacing.md, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button variant="primary" size="lg" onClick={primary.onClick}>{primary.label}</Button>
              {secondary && (
                <Button variant="secondary" size="lg" onClick={secondary.onClick}>{secondary.label}</Button>
              )}
            </div>
          </div>
        </GlassCard>
      </Container>
    </section>
  );
} 