'use client';

import { profile, highlights } from '@/lib/data';

/**
 * Highlight Card Component
 * Demonstrates: Readonly props, template literal types in JSX
 */
interface HighlightCardProps {
  readonly label: string;
  readonly value: string;
  readonly sublabel?: string | undefined;
  readonly index: number;
}

function HighlightCard({ label, value, sublabel, index }: HighlightCardProps): React.ReactElement {
  return (
    <div
      className={`text-center animate-slide-up stagger-${index + 1}`}
      style={{ opacity: 0, animationFillMode: 'forwards' }}
    >
      <div className="font-mono text-3xl md:text-4xl font-bold">
        {value}
        {sublabel && <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400 ml-1">{sublabel}</span>}
      </div>
      <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{label}</div>
    </div>
  );
}

/**
 * Social Link Component
 * Demonstrates: Discriminated union for platform icons
 */
interface SocialIconProps {
  readonly platform: 'github' | 'medium' | 'email' | 'linkedin' | 'twitter';
  readonly className?: string;
}

function SocialIcon({ platform, className = 'w-5 h-5' }: SocialIconProps): React.ReactElement {
  const icons: Record<SocialIconProps['platform'], React.ReactElement> = {
    github: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    medium: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
    email: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    linkedin: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    twitter: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  };

  return icons[platform];
}

/**
 * Hero Section Component
 * Demonstrates: Component composition, data-driven rendering
 */
export function Hero(): React.ReactElement {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          {/* Greeting */}
          <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400 mb-4 animate-fade-in">
            Hello, I'm
          </p>

          {/* Name */}
          <h1 className="mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {profile.displayName}
          </h1>

          {/* Title */}
          <p
            className="text-xl md:text-2xl text-zinc-600 mb-6 animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            {profile.title}
          </p>

          {/* Location */}
          <p
            className="font-mono text-sm text-zinc-500 dark:text-zinc-400 mb-8 animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            📍 {profile.location}
          </p>

          {/* Bio */}
          <p
            className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8 animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            {profile.bio}
          </p>

          {/* Social Links */}
          <div
            className="flex items-center justify-center space-x-4 mb-12 animate-slide-up"
            style={{ animationDelay: '0.5s' }}
          >
            {profile.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-border rounded-lg hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200"
                aria-label={link.platform}
              >
                <SocialIcon platform={link.platform} />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up"
            style={{ animationDelay: '0.6s' }}
          >
            <a href="#projects" className="btn btn-primary px-8 py-3">
              View Projects
            </a>
            <a href="#contact" className="btn btn-secondary px-8 py-3">
              Get in Touch
            </a>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border">
            {highlights.map((highlight, index) => (
              <HighlightCard
                key={highlight.label}
                label={highlight.label}
                value={highlight.value}
                sublabel={'sublabel' in highlight ? highlight.sublabel : undefined}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
