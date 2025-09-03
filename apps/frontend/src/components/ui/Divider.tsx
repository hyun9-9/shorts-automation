import React from 'react';
import { colors, spacing } from '@/lib/theme';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  color?: 'primary' | 'secondary' | 'muted';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  color = 'secondary',
  size = 'md',
  className = '',
  ...props
}) => {
  const colorMap = {
    primary: colors.border.primary,
    secondary: colors.border.secondary,
    muted: colors.text.muted,
  };

  const sizeMap = {
    sm: '1px',
    md: '1px',
    lg: '2px',
  };

  const variantMap = {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
  };

  const baseStyles = {
    border: 'none',
    backgroundColor: colorMap[color],
  };

  const orientationStyles = {
    horizontal: {
      width: '100%',
      height: sizeMap[size],
      margin: `${spacing.md} 0`,
    },
    vertical: {
      width: sizeMap[size],
      height: '100%',
      margin: `0 ${spacing.md}`,
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...orientationStyles[orientation],
    borderStyle: variantMap[variant],
  };

  return (
    <hr
      className={className}
      style={combinedStyles}
      {...props}
    />
  );
};

export default Divider; 