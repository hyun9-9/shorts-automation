"use client";
import { Typography, Container } from '@/components/ui';
import { colors, spacing } from '@/lib/theme';
import GlassCard from './GlassCard';

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  color?: string;
}

interface FeatureGridProps {
  title: string;
  subtitle?: string;
  items: FeatureItem[];
}

export default function FeatureGrid({ title, subtitle, items }: FeatureGridProps) {
  return (
    <section style={{ padding: `${spacing['2xl']} 0` }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: spacing.xl }}>
          <Typography variant="h1" style={{ marginBottom: spacing.sm }}>{title}</Typography>
          {subtitle && (
            <Typography variant="body" color="secondary" style={{ margin: '0 auto', maxWidth: '640px' }}>{subtitle}</Typography>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: spacing.lg }}>
          {items.map((item, idx) => (
            <GlassCard key={idx}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '56px', marginBottom: spacing.md, color: item.color || colors.accent.main }}>{item.icon}</div>
                <Typography variant="h3" style={{ marginBottom: spacing.sm }}>{item.title}</Typography>
                <Typography variant="body" color="secondary">{item.description}</Typography>
              </div>
            </GlassCard>
          ))}
        </div>
      </Container>
    </section>
  );
} 