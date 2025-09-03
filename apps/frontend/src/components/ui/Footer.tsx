import React from 'react';
import { colors, typography, spacing, borderRadius } from '@/lib/theme';
import { Typography, Container } from './index';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  logo?: React.ReactNode;
  sections?: FooterSection[];
  socialLinks?: FooterLink[];
  copyright?: string;
  variant?: 'default' | 'minimal' | 'extended';
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  logo,
  sections = [],
  socialLinks = [],
  copyright,
  variant = 'default',
  className = '',
}) => {
  const baseStyles = {
    backgroundColor: colors.background.header,
    borderTop: `1px solid ${colors.border.secondary}`,
    padding: `${spacing['3xl']} 0 ${spacing.xl}`,
    fontFamily: typography.fontFamily.primary,
  };

  const variantStyles = {
    default: {
      padding: `${spacing['3xl']} 0 ${spacing.xl}`,
    },
    minimal: {
      padding: `${spacing.xl} 0`,
    },
    extended: {
      padding: `${spacing['3xl']} 0 ${spacing.xl}`,
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
    marginBottom: spacing.lg,
  };

  const sectionStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: spacing.xl,
    marginBottom: spacing.xl,
  };

  const sectionTitleStyles = {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  };

  const linkStyles = {
    color: colors.text.secondary,
    textDecoration: 'none',
    fontSize: typography.fontSize.sm,
    display: 'block',
    padding: `${spacing.xs} 0`,
    transition: 'color 0.2s ease-in-out',
    cursor: 'pointer',
  };

  const socialLinksStyles = {
    display: 'flex',
    gap: spacing.md,
    marginBottom: spacing.lg,
  };

  const socialLinkStyles = {
    ...linkStyles,
    padding: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
  };

  const copyrightStyles = {
    color: colors.text.muted,
    fontSize: typography.fontSize.sm,
    textAlign: 'center' as const,
    paddingTop: spacing.lg,
    borderTop: `1px solid ${colors.border.secondary}`,
  };

  const defaultSections: FooterSection[] = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Integrations', href: '/integrations' },
        { label: 'API', href: '/api' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'Help Center', href: '/help' },
        { label: 'Community', href: '/community' },
        { label: 'Status', href: '/status' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'GDPR', href: '/gdpr' },
      ],
    },
  ];

  const defaultSocialLinks: FooterLink[] = [
    { label: 'Twitter', href: 'https://twitter.com' },
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Discord', href: 'https://discord.com' },
  ];

  const sectionsToRender = sections.length > 0 ? sections : defaultSections;
  const socialLinksToRender = socialLinks.length > 0 ? socialLinks : defaultSocialLinks;

  return (
    <footer className={className} style={combinedStyles}>
      <Container>
        {/* Logo and Description */}
        <div style={{ marginBottom: variant === 'minimal' ? spacing.lg : spacing.xl }}>
          <div style={logoStyles}>
            {logo || (
              <Typography variant="h3" style={{ margin: 0 }}>
                Linear
              </Typography>
            )}
          </div>
          {variant !== 'minimal' && (
            <Typography variant="body" color="secondary" style={{ maxWidth: '400px' }}>
              Linear helps streamline software projects, sprints, tasks, and bug tracking. 
              It's built for high-performance teams.
            </Typography>
          )}
        </div>

        {/* Social Links */}
        {variant !== 'minimal' && (
          <div style={socialLinksStyles}>
            {socialLinksToRender.map((link, index) => (
              <a
                key={index}
                href={link.href}
                style={socialLinkStyles}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = colors.text.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = colors.text.secondary;
                }}
                title={link.label}
              >
                {link.label.charAt(0).toUpperCase()}
              </a>
            ))}
          </div>
        )}

        {/* Footer Sections */}
        {variant !== 'minimal' && (
          <div style={sectionStyles}>
            {sectionsToRender.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <Typography variant="h4" style={sectionTitleStyles}>
                  {section.title}
                </Typography>
                <div>
                  {section.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.href}
                      style={linkStyles}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = colors.text.primary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = colors.text.secondary;
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Copyright */}
        <div style={copyrightStyles}>
          <Typography variant="body" color="muted">
            {copyright || `© ${new Date().getFullYear()} Linear. All rights reserved.`}
          </Typography>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 