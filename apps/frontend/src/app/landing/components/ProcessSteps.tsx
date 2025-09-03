"use client";
import { Typography, Container } from '@/components/ui';
import { colors, spacing, borderRadius, typography } from '@/lib/theme';

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  title: string;
  subtitle?: string;
  steps: ProcessStep[];
}

export default function ProcessSteps({ title, subtitle, steps }: ProcessStepsProps) {
  return (
    <section style={{ padding: `${spacing['2xl']} 0`}}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: spacing.xl }}>
          <Typography variant="h1" style={{ marginBottom: spacing.sm }}>{title}</Typography>
          {subtitle && (
            <Typography variant="body" color="secondary" style={{ margin: '0 auto', maxWidth: '640px' }}>{subtitle}</Typography>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: spacing.xl }}>
          {steps.map((s, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                backgroundColor: colors.primary.main, color: colors.text.primary,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold,
                margin: '0 auto', marginBottom: spacing.md,
              }}>
                {s.number}
              </div>
              <Typography variant="h3" style={{ marginBottom: spacing.sm }}>{s.title}</Typography>
              <Typography variant="body" color="secondary">{s.description}</Typography>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
} 