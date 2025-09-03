import React from 'react';
import { colors, typography, borderRadius, spacing } from '@/lib/theme';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = {
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeight.button,
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease-in-out',
    textDecoration: 'none',
  };

  const variantStyles = {
    primary: {
      backgroundColor: colors.primary.main,
      color: colors.button.primary.text,
      border: `1px solid ${colors.primary.main}`,
      '&:hover': {
        backgroundColor: colors.primary.dark,
        borderColor: colors.primary.dark,
      },
    },
    secondary: {
      backgroundColor: colors.button.secondary.background,
      color: colors.button.secondary.text,
      border: `1px solid ${colors.button.secondary.border}`,
      '&:hover': {
        backgroundColor: '#d1d5db',
        borderColor: '#d1d5db',
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.button.ghost.text,
      border: 'none',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
      },
    },
  };

  const sizeStyles = {
    sm: {
      padding: spacing.buttonPadding,
      fontSize: typography.fontSize.button,
      borderRadius: borderRadius.button,
      minHeight: '32px',
    },
    md: {
      padding: spacing.buttonPaddingLarge,
      fontSize: '15px',
      borderRadius: borderRadius.buttonLarge,
      minHeight: '40px',
    },
    lg: {
      padding: '0px 24px',
      fontSize: '16px',
      borderRadius: borderRadius.buttonLarge,
      minHeight: '48px',
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  return (
    <button
      className={className}
      style={combinedStyles}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 