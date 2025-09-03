import React from 'react';
import { colors, typography } from '@/lib/theme';

export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'button' | 'nav';
  color?: 'primary' | 'secondary' | 'muted' | 'accent';
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color = 'primary',
  children,
  className = '',
  as,
  style,
  ...props
}) => {
  const colorMap = {
    primary: colors.text.primary,
    secondary: colors.text.secondary,
    muted: colors.text.muted,
    accent: colors.text.accent,
  };

  const variantStyles = {
    h1: {
      fontSize: typography.fontSize.h1,
      fontWeight: typography.fontWeight.h1,
      lineHeight: typography.lineHeight.h1,
      letterSpacing: typography.letterSpacing.h1,
      color: colorMap[color],
      margin: '0px',
      padding: '0px',
    },
    h2: {
      fontSize: typography.fontSize.h2,
      fontWeight: typography.fontWeight.h2,
      lineHeight: typography.lineHeight.h2,
      letterSpacing: typography.letterSpacing.h2,
      color: colorMap[color],
      margin: '0px',
      padding: '0px',
    },
    h3: {
      fontSize: typography.fontSize.h3,
      fontWeight: typography.fontWeight.h3,
      lineHeight: typography.lineHeight.h3,
      letterSpacing: typography.letterSpacing.h3,
      color: colorMap[color],
      margin: '0px',
      padding: '0px',
    },
    h4: {
      fontSize: typography.fontSize.h4,
      fontWeight: typography.fontWeight.h4,
      lineHeight: typography.lineHeight.h4,
      letterSpacing: typography.letterSpacing.h4,
      color: colorMap[color],
      margin: '0px',
      padding: '0px',
    },
    body: {
      fontSize: typography.fontSize.body,
      fontWeight: typography.fontWeight.body,
      lineHeight: typography.lineHeight.body,
      letterSpacing: typography.letterSpacing.body,
      color: colorMap[color],
      margin: '0px',
      padding: '0px',
    },
    button: {
      fontSize: typography.fontSize.button,
      fontWeight: typography.fontWeight.button,
      color: colorMap[color],
      margin: '0px',
      padding: '0px',
    },
    nav: {
      fontSize: typography.fontSize.nav,
      fontWeight: typography.fontWeight.nav,
      color: colorMap[color],
      margin: '0px',
      padding: '0px',
    },
  };

  const baseStyles = {
    fontFamily: typography.fontFamily.primary,
  };

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...style,
  };

  const defaultElement = variant.startsWith('h') ? variant : 'p';

  const Component = as || defaultElement;

  return React.createElement(Component, {
    className,
    style: combinedStyles,
    ...props,
  }, children);
};

export default Typography; 