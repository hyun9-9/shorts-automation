import React from 'react';
import { colors, typography, borderRadius, spacing } from '@/lib/theme';

export interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = {
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeight.medium,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
    border: 'none',
    cursor: 'default',
  };

  const variantStyles = {
    primary: {
      backgroundColor: colors.primary.main,
      color: colors.text.primary,
    },
    secondary: {
      backgroundColor: colors.secondary.main,
      color: colors.text.primary,
    },
    success: {
      backgroundColor: '#10B981',
      color: colors.text.primary,
    },
    warning: {
      backgroundColor: '#F59E0B',
      color: colors.text.primary,
    },
    error: {
      backgroundColor: '#EF4444',
      color: colors.text.primary,
    },
    ghost: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: colors.text.secondary,
      border: `1px solid ${colors.border.secondary}`,
    },
  };

  const sizeStyles = {
    sm: {
      padding: `${spacing.xs} ${spacing.sm}`,
      fontSize: typography.fontSize.xs,
      minHeight: '20px',
    },
    md: {
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: typography.fontSize.sm,
      minHeight: '24px',
    },
    lg: {
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: typography.fontSize.base,
      minHeight: '32px',
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  return (
    <span
      className={className}
      style={combinedStyles}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge; 