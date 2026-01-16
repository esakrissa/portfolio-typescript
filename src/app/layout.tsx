import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { meta } from '@/lib/data';
import './globals.css';

/**
 * Font Configuration
 * Demonstrates: Next.js font optimization with TypeScript
 */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

/**
 * Metadata Configuration
 * Demonstrates: Type-safe metadata with Next.js 14
 */
export const metadata: Metadata = {
  title: {
    default: meta.title,
    template: `%s | ${meta.title}`,
  },
  description: meta.description,
  keywords: meta.keywords,
  authors: [{ name: 'Esa Krissa', url: 'https://esakrissa.com' }],
  creator: 'Esa Krissa',
  publisher: 'Esa Krissa',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://esakrissa.com',
    title: meta.title,
    description: meta.description,
    siteName: 'Esa Krissa Portfolio',
    images: [
      {
        url: meta.ogImage,
        width: 1200,
        height: 630,
        alt: meta.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    images: [meta.ogImage],
    creator: meta.twitterHandle,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

/**
 * Viewport Configuration
 */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
};

/**
 * Root Layout Component
 * Demonstrates: Next.js App Router layout with proper typing
 */
interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* Theme initialization script to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (theme === 'system' && systemDark) || (!theme && systemDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-lg dark:focus:bg-white dark:focus:text-black"
        >
          Skip to main content
        </a>

        {/* Main Content */}
        <main id="main-content">{children}</main>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'I Wayan Darmika Esa Krissayoga',
              alternateName: 'Esa Krissa',
              url: 'https://esakrissa.com',
              jobTitle: 'Software Engineer',
              worksFor: {
                '@type': 'Organization',
                name: 'Freelance',
              },
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'Universitas Udayana',
              },
              knowsAbout: [
                'TypeScript',
                'Microservices',
                'AWS',
                'GCP',
                'Backend Development',
              ],
              sameAs: [
                'https://github.com/esakrissa',
                'https://medium.com/@esakrissapublishing',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
