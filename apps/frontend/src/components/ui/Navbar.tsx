'use client';

import React, { useState } from 'react';
import { colors, typography, spacing, borderRadius } from '@/lib/theme';
import { Button, Typography } from './index';

export interface NavbarProps {
  logo?: React.ReactNode;
  menuItems?: Array<{
    label: string;
    href: string;
    isActive?: boolean;
  }>;
  actions?: React.ReactNode;
  variant?: 'default' | 'transparent' | 'elevated';
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  logo,
  menuItems = [],
  actions,
  variant = 'default',
  className = '',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const baseStyles = {
    position: 'sticky' as const,
    top: 0,
    zIndex: 1000,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.md} ${spacing.lg}`,
    fontFamily: typography.fontFamily.primary,
    transition: 'all 0.3s ease-in-out',
  };

  const variantStyles = {
    default: {
      backgroundColor: colors.background.header,
      backdropFilter: 'blur(10px)',
      borderBottom: `1px solid ${colors.border.secondary}`,
    },
    transparent: {
      backgroundColor: 'transparent',
      backdropFilter: 'none',
      borderBottom: 'none',
    },
    elevated: {
      backgroundColor: colors.background.header,
      backdropFilter: 'blur(10px)',
      borderBottom: `1px solid ${colors.border.secondary}`,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
  };

  const logoStyles = {
    display: 'flex',
    alignItems: 'center',
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    textDecoration: 'none',
  };

  const menuStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.lg,
  };

  const menuItemStyles = {
    color: colors.text.secondary,
    textDecoration: 'none',
    fontSize: typography.fontSize.nav,
    fontWeight: typography.fontWeight.nav,
    padding: spacing.navItemPadding,
    borderRadius: borderRadius.navItem,
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
  };

  const activeMenuItemStyles = {
    ...menuItemStyles,
    color: colors.text.primary,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  };

  const mobileMenuStyles = {
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: colors.background.header,
    backdropFilter: 'blur(10px)',
    borderBottom: `1px solid ${colors.border.secondary}`,
    padding: spacing.lg,
    display: isMobileMenuOpen ? 'flex' : 'none',
    flexDirection: 'column' as const,
    gap: spacing.md,
  };

  const hamburgerStyles = {
    display: 'none',
    flexDirection: 'column' as const,
    gap: '4px',
    cursor: 'pointer',
    padding: spacing.sm,
  };

  const hamburgerLineStyles = {
    width: '24px',
    height: '2px',
    backgroundColor: colors.text.primary,
    transition: 'all 0.3s ease-in-out',
  };

  return (
    <nav className={className} style={combinedStyles}>
      {/* Logo */}
      <div style={logoStyles}>
        {logo || (
          <Typography variant="h3" style={{ margin: 0 }}>
            Linear
          </Typography>
        )}
      </div>

      {/* Desktop Menu */}
      <div style={menuStyles} className="hidden md:flex">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            style={item.isActive ? activeMenuItemStyles : menuItemStyles}
            onMouseEnter={(e) => {
              if (!item.isActive) {
                e.currentTarget.style.color = colors.text.primary;
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (!item.isActive) {
                e.currentTarget.style.color = colors.text.secondary;
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
        {actions || (
          <>
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div 
        style={hamburgerStyles} 
        className="md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <div 
          style={{
            ...hamburgerLineStyles,
            transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }}
        />
        <div 
          style={{
            ...hamburgerLineStyles,
            opacity: isMobileMenuOpen ? 0 : 1,
          }}
        />
        <div 
          style={{
            ...hamburgerLineStyles,
            transform: isMobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none',
          }}
        />
      </div>

      {/* Mobile Menu */}
      <div style={mobileMenuStyles}>
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            style={{
              ...(item.isActive ? activeMenuItemStyles : menuItemStyles),
              padding: spacing.md,
              borderBottom: `1px solid ${colors.border.secondary}`,
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm, marginTop: spacing.md }}>
          <Button variant="ghost" size="md" style={{ width: '100%' }}>
            Sign In
          </Button>
          <Button variant="primary" size="md" style={{ width: '100%' }}>
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 