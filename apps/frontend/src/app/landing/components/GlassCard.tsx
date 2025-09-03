"use client";
import React from 'react';
import { colors, borderRadius, spacing, shadows } from '@/lib/theme';

export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  const wrapperStyles: React.CSSProperties = {
    position: 'relative',
    borderRadius: borderRadius.lg,
    background: 'rgba(255, 255, 255, 0.02)',
    border: `1px solid ${colors.border.secondary}`,
    boxShadow: shadows.md,
    padding: spacing.lg,
    overflow: 'hidden',
  };

  const overlayStyles: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    pointerEvents: 'none',
  };

  return (
    <div className={className} style={wrapperStyles}>
      <div style={overlayStyles} />
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
} 