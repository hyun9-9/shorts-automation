import themeData from './linear-theme-data.json';

export const theme = themeData;

// 색상 유틸리티
export const colors = {
  primary: {
    main: '#5E6AD2',
    light: '#7170ff',
    dark: '#4F46E5'
  },
  secondary: {
    main: '#8B5CF6',
    light: '#A855F7',
    dark: '#7C3AED'
  },
  background: {
    body: '#08090A',
    surface: '#F8FAFC',
    card: 'rgba(0, 0, 0, 0)',
    header: 'rgba(10, 10, 10, 0.8)'
  },
  text: {
    primary: '#F7F8F8',
    secondary: '#8A8F98',
    muted: '#D0D6E0',
    accent: '#D0D1E0'
  },
  border: {
    primary: '#E2E8F0',
    secondary: 'rgba(255, 255, 255, 0.08)',
    accent: '#F7F8F8'
  },
  accent: {
    main: '#7170ff',
    light: '#8B5CF6',
    dark: '#5E6AD2'
  },
  button: {
    primary: {
      background: '#5E6AD2',
      text: '#FFFFFF',
      border: '#5E6AD2'
    },
    secondary: {
      background: '#E6E6E6',
      text: '#08090A',
      border: '#E6E6E6'
    },
    ghost: {
      background: 'rgba(0, 0, 0, 0)',
      text: '#8A8F98',
      border: 'rgba(0, 0, 0, 0)'
    }
  }
};

// 타이포그래피 유틸리티
export const typography = {
  fontFamily: {
    primary: '"Inter Variable", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    fallback: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    h1: '64px',
    h2: '56px',
    h3: '21px',
    h4: '14px',
    body: '17px',
    button: '13px',
    nav: '16px'
  },
  fontWeight: {
    normal: '400',
    medium: '510',
    semibold: '590',
    bold: '680',
    h1: '510',
    h2: '538',
    h3: '510',
    h4: '510',
    body: '400',
    button: '510',
    nav: '400'
  },
  lineHeight: {
    h1: '67.84px',
    h2: '61.6px',
    h3: '28px',
    h4: '24px',
    body: '27.2px'
  },
  letterSpacing: {
    h1: '-1.408px',
    h2: '-1.82px',
    h3: '-0.37px',
    h4: '-0.182px',
    body: 'normal'
  }
};

// 간격 유틸리티
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  headerPadding: '0px',
  mainPadding: '64px 0px 0px',
  sectionPadding: '72px 0px 0px',
  buttonPadding: '0px 12px',
  buttonPaddingLarge: '0px 16px',
  navItemPadding: '0px 8px'
};

// 테두리 반경 유틸리티
export const borderRadius = {
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  full: '9999px',
  button: '8px',
  buttonLarge: '10px',
  navItem: '6px'
};

// 그림자 유틸리티
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
};

// CSS 변수 생성 함수
export const createCSSVariables = () => {
  return {
    '--color-primary': colors.primary.main,
    '--color-primary-light': colors.primary.light,
    '--color-primary-dark': colors.primary.dark,
    '--color-secondary': colors.secondary.main,
    '--color-secondary-light': colors.secondary.light,
    '--color-secondary-dark': colors.secondary.dark,
    '--color-background': colors.background.body,
    '--color-surface': colors.background.surface,
    '--color-text-primary': colors.text.primary,
    '--color-text-secondary': colors.text.secondary,
    '--color-text-muted': colors.text.muted,
    '--color-border-primary': colors.border.primary,
    '--color-border-secondary': colors.border.secondary,
    '--color-accent': colors.accent.main,
    '--font-family-primary': typography.fontFamily.primary,
    '--font-size-h1': typography.fontSize.h1,
    '--font-size-h2': typography.fontSize.h2,
    '--font-size-h3': typography.fontSize.h3,
    '--font-size-h4': typography.fontSize.h4,
    '--font-size-body': typography.fontSize.body,
    '--font-weight-normal': typography.fontWeight.normal,
    '--font-weight-medium': typography.fontWeight.medium,
    '--font-weight-semibold': typography.fontWeight.semibold,
    '--font-weight-bold': typography.fontWeight.bold,
    '--spacing-xs': spacing.xs,
    '--spacing-sm': spacing.sm,
    '--spacing-md': spacing.md,
    '--spacing-lg': spacing.lg,
    '--spacing-xl': spacing.xl,
    '--border-radius-sm': borderRadius.sm,
    '--border-radius-md': borderRadius.md,
    '--border-radius-lg': borderRadius.lg,
    '--border-radius-xl': borderRadius.xl,
    '--shadow-sm': shadows.sm,
    '--shadow-md': shadows.md,
    '--shadow-lg': shadows.lg,
    '--shadow-xl': shadows.xl,
  };
}; 