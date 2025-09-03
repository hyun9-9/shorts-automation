import React from 'react';
import { colors, borderRadius, shadows, spacing } from '@/lib/theme';

export interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  image?: {
    src: string;
    alt: string;
    height?: string;
  };
  imagePosition?: 'top' | 'bottom';
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  onClick,
  image,
  imagePosition = 'top',
  ...props
}) => {
  const baseStyles = {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    transition: 'all 0.2s ease-in-out',
    cursor: onClick ? 'pointer' : 'default',
    overflow: 'hidden',
  };

  const variantStyles = {
    default: {
      border: 'none',
      boxShadow: 'none',
    },
    elevated: {
      border: 'none',
      boxShadow: shadows.md,
      '&:hover': {
        boxShadow: shadows.lg,
      },
    },
    outlined: {
      border: `1px solid ${colors.border.secondary}`,
      boxShadow: 'none',
    },
    filled: {
      border: 'none',
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      boxShadow: 'none',
    },
  };

  const paddingStyles = {
    none: {
      padding: '0px',
    },
    sm: {
      padding: spacing.sm,
    },
    md: {
      padding: spacing.md,
    },
    lg: {
      padding: spacing.lg,
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...paddingStyles[padding],
  };

  const imageStyles = {
    width: '100%',
    height: image?.height || '200px',
    objectFit: 'cover' as const,
    display: 'block',
  };

  const contentWrapper = {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
  };

  const renderImage = () => {
    if (!image) return null;
    
    return (
      <img
        src={image.src}
        alt={image.alt}
        style={imageStyles}
      />
    );
  };

  const renderContent = () => {
    if (image) {
      return (
        <div style={contentWrapper}>
          {imagePosition === 'top' && renderImage()}
          <div style={{ flex: 1 }}>
            {children}
          </div>
          {imagePosition === 'bottom' && renderImage()}
        </div>
      );
    }
    
    return children;
  };

  return (
    <div
      className={className}
      style={combinedStyles}
      onClick={onClick}
      {...props}
    >
      {renderContent()}
    </div>
  );
};

export default Card; 