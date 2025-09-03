import React from 'react';
import { colors, typography, spacing, borderRadius } from '@/lib/theme';
import { Button, Typography, Container } from './index';

export interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  background?: {
    type: 'gradient' | 'image' | 'video';
    value: string;
  };
  variant?: 'default' | 'centered' | 'split';
  image?: {
    src: string;
    alt: string;
  };
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  background,
  variant = 'default',
  image,
  className = '',
}) => {
  const baseStyles = {
    position: 'relative' as const,
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    padding: `${spacing['3xl']} 0`,
    fontFamily: typography.fontFamily.primary,
    overflow: 'hidden',
  };

  const backgroundStyles = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  };

  const getBackgroundStyle = () => {
    if (!background) {
      return {
        ...backgroundStyles,
        background: `linear-gradient(135deg, ${colors.primary.main}20, ${colors.secondary.main}20)`,
      };
    }

    switch (background.type) {
      case 'gradient':
        return {
          ...backgroundStyles,
          background: background.value,
        };
      case 'image':
        return {
          ...backgroundStyles,
          backgroundImage: `url(${background.value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        };
      case 'video':
        return {
          ...backgroundStyles,
          background: `linear-gradient(135deg, ${colors.primary.main}20, ${colors.secondary.main}20)`,
        };
      default:
        return {
          ...backgroundStyles,
          background: `linear-gradient(135deg, ${colors.primary.main}20, ${colors.secondary.main}20)`,
        };
    }
  };

  const overlayStyles = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(8, 9, 10, 0.7)',
    zIndex: -1,
  };

  const contentStyles = {
    position: 'relative' as const,
    zIndex: 1,
    width: '100%',
  };

  const variantStyles = {
    default: {
      textAlign: 'left' as const,
      maxWidth: '600px',
    },
    centered: {
      textAlign: 'center' as const,
      maxWidth: '800px',
      margin: '0 auto',
    },
    split: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: spacing['3xl'],
      alignItems: 'center',
    },
  };

  const titleStyles = {
    fontSize: typography.fontSize.h1,
    fontWeight: typography.fontWeight.h1,
    lineHeight: typography.lineHeight.h1,
    letterSpacing: typography.letterSpacing.h1,
    color: colors.text.primary,
    margin: '0 0 16px 0',
  };

  const subtitleStyles = {
    fontSize: typography.fontSize.h2,
    fontWeight: typography.fontWeight.h2,
    lineHeight: typography.lineHeight.h2,
    letterSpacing: typography.letterSpacing.h2,
    color: colors.text.accent,
    margin: '0 0 24px 0',
  };

  const descriptionStyles = {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.body,
    lineHeight: typography.lineHeight.body,
    color: colors.text.secondary,
    margin: '0 0 32px 0',
    maxWidth: '600px',
  };

  const actionsStyles = {
    display: 'flex',
    gap: spacing.md,
    flexWrap: 'wrap' as const,
  };

  const imageStyles = {
    width: '100%',
    height: 'auto',
    borderRadius: borderRadius.lg,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  };

  return (
    <section className={className} style={baseStyles}>
      {/* Background */}
      <div style={getBackgroundStyle()} />
      
      {/* Video Background */}
      {background?.type === 'video' && (
        <video
          autoPlay
          muted
          loop
          style={{
            ...backgroundStyles,
            objectFit: 'cover',
          }}
        >
          <source src={background.value} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      {(background?.type === 'image' || background?.type === 'video') && (
        <div style={overlayStyles} />
      )}

      {/* Content */}
      <Container>
        <div style={contentStyles}>
          <div style={variantStyles[variant]}>
            {/* Text Content */}
            <div>
              {subtitle && (
                <Typography variant="h2" style={subtitleStyles}>
                  {subtitle}
                </Typography>
              )}
              
              <Typography variant="h1" style={titleStyles}>
                {title}
              </Typography>
              
              {description && (
                <Typography variant="body" style={descriptionStyles}>
                  {description}
                </Typography>
              )}

              {/* Actions */}
              {(primaryAction || secondaryAction) && (
                <div style={actionsStyles}>
                  {primaryAction && (
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={primaryAction.onClick}
                      style={{ textDecoration: 'none' }}
                    >
                      {primaryAction.label}
                    </Button>
                  )}
                  
                  {secondaryAction && (
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={secondaryAction.onClick}
                      style={{ textDecoration: 'none' }}
                    >
                      {secondaryAction.label}
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Image (for split variant) */}
            {variant === 'split' && image && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src={image.src}
                  alt={image.alt}
                  style={imageStyles}
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero; 