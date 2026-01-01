/**
 * Home Page Component
 * Main entry point for the portfolio website
 *
 * Demonstrates:
 * - Server component with client component composition
 * - Clean component architecture
 * - Semantic HTML structure
 */

import {
  Header,
  Hero,
  About,
  Skills,
  Projects,
  Publications,
  Contact,
  Footer,
} from '@/components';

/**
 * Home Page
 * Server Component - No 'use client' directive needed
 */
export default function HomePage(): React.ReactElement {
  return (
    <>
      {/* Navigation Header */}
      <Header />

      {/* Hero Section - Full viewport intro */}
      <Hero />

      {/* Divider */}
      <div className="container-custom">
        <div className="divider" />
      </div>

      {/* About Section */}
      <About />

      {/* Divider */}
      <div className="container-custom">
        <div className="divider" />
      </div>

      {/* Skills Section */}
      <Skills />

      {/* Divider */}
      <div className="container-custom">
        <div className="divider" />
      </div>

      {/* Projects Section */}
      <Projects />

      {/* Divider */}
      <div className="container-custom">
        <div className="divider" />
      </div>

      {/* Publications Section */}
      <Publications />

      {/* Divider */}
      <div className="container-custom">
        <div className="divider" />
      </div>

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </>
  );
}
