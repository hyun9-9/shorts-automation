import React from 'react';
import { spacing } from '@/lib/theme';

export interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  maxWidth = 'lg',
  padding = 'md',
  children,
  className = '',
  centered = true,
  ...props
}) => {
  const maxWidthMap = {
    sm: '640px',
    md: '768px',
    lg: '1200px',
    xl: '1234px',
    full: '100%',
  };

  const paddingMap = {
    none: '0px',
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
  };

  const styles = {
    maxWidth: maxWidthMap[maxWidth],
    width: '100%',
    margin: centered ? '0 auto' : '0',
    padding: `0 ${paddingMap[padding]}`,
  };

  return (
    <div
      className={className}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container; 