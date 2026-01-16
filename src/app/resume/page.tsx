'use client';

/**
 * Resume Page
 * Printable, professional resume/CV
 */

import { useEffect } from 'react';
import Link from 'next/link';
import { profile, skills, projects, publications, education } from '@/lib/data';
import { isGitHubProject } from '@/types';

/**
 * Section Header Component
 */
function SectionHeader({ title }: { readonly title: string }): React.ReactElement {
  return (
    <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-black pb-1 mb-4 text-black">
      {title}
    </h2>
  );
}

/**
 * Resume Page Component
 */
export default function ResumePage(): React.ReactElement {
  // Set page title
  useEffect(() => {
    document.title = 'Resume | Esa Krissa';
  }, []);

  // Get top projects by stars
  const topProjects = [...projects]
    .filter(isGitHubProject)
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Print-friendly header - forced light mode for visibility */}
      <div className="no-print fixed top-0 left-0 right-0 bg-white border-b border-zinc-200 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-mono text-sm text-zinc-600 hover:text-black hover:underline">
            ← Back to Portfolio
          </Link>
          <button
            onClick={() => window.print()}
            className="bg-black text-white hover:bg-zinc-800 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Resume Content */}
      <main className="max-w-4xl mx-auto px-6 py-8 pt-24 print:pt-0 print:px-0">
        {/* Header */}
        <header className="text-center mb-8 print:mb-6">
          <h1 className="text-3xl font-bold mb-1 print:text-2xl text-black">
            {profile.fullName.toUpperCase()}
          </h1>
          <p className="text-lg text-zinc-600 mb-3 print:text-base">
            {profile.title}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm font-mono text-zinc-500">
            <span>📍 {profile.location}</span>
            <span>📧 {profile.email}</span>
            <a
              href="https://github.com/esakrissa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-black"
            >
              🔗 github.com/esakrissa
            </a>
            <a
              href="https://www.linkedin.com/in/esakrissa/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-black"
            >
              💼 linkedin.com/in/esakrissa
            </a>
            <a
              href="https://esakrissa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-black"
            >
              🌐 esakrissa.com
            </a>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mb-6 print:mb-4">
          <SectionHeader title="Professional Summary" />
          <p className="text-sm leading-relaxed text-zinc-700">
            Versatile <strong>Software Engineer</strong> with 3+ years of experience
            building end-to-end applications using TypeScript, React, Next.js, and cloud-native technologies on AWS and GCP.
            Published researcher with expertise in AI agent orchestration using LangGraph and Model Context Protocol (MCP).
            Based in Bali, Indonesia with a proven track record of delivering production-ready,
            type-safe systems across the full stack.
          </p>
        </section>

        {/* Technical Skills */}
        <section className="mb-6 print:mb-4">
          <SectionHeader title="Technical Skills" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category}>
                <span className="font-semibold text-black">{skillGroup.category}:</span>{' '}
                <span className="text-zinc-600">
                  {skillGroup.items.map((item) => item.name).join(', ')}
                </span>
              </div>
            ))}
            <div>
              <span className="font-semibold text-black">Additional:</span>{' '}
              <span className="text-zinc-600">
                SOLID Principles, DRY, Microservices, REST APIs, CI/CD, Agile
              </span>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="mb-6 print:mb-4">
          <SectionHeader title="Research Publications" />
          <div className="space-y-4">
            {publications.map((pub) => (
              <div key={pub.id} className="text-sm">
                <div className="flex items-start gap-2">
                  {pub.isFirstAuthor && (
                    <span className="shrink-0 text-xs bg-black text-white px-1.5 py-0.5 rounded">
                      1st Author
                    </span>
                  )}
                  <div>
                    <p className="font-semibold">{pub.title}</p>
                    <p className="text-zinc-600">
                      {pub.venue} • {pub.date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      {pub.doi && (
                        <>
                          {' • '}
                          <a
                            href={`https://doi.org/${pub.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs hover:underline"
                          >
                            DOI: {pub.doi}
                          </a>
                        </>
                      )}
                    </p>
                    <p className="text-zinc-500 text-xs mt-1">
                      Keywords: {pub.keywords.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Projects */}
        <section className="mb-6 print:mb-4">
          <SectionHeader title="Selected Projects" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topProjects.map((project) => (
              <div key={project.id} className="text-sm">
                <div className="flex items-center gap-2">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-black hover:underline"
                  >
                    {project.name}
                  </a>
                  {project.stars > 0 && (
                    <span className="text-xs text-zinc-500">⭐ {project.stars}</span>
                  )}
                </div>
                <p className="text-zinc-600 text-xs mt-0.5 line-clamp-2">
                  {project.description}
                </p>
                <p className="text-zinc-400 text-xs font-mono mt-1">
                  {project.technologies.map((t) => t.name).join(' • ')}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-500 mt-3 font-mono">
            + 18 more repositories at github.com/esakrissa
          </p>
        </section>

        {/* Education */}
        <section className="mb-6 print:mb-4">
          <SectionHeader title="Education" />
          {education.map((edu) => (
            <div key={edu.id} className="text-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-black">{edu.degree} in {edu.field}</p>
                  <p className="text-zinc-600">{edu.institution}</p>
                </div>
                <p className="text-zinc-500 text-xs">{edu.location}</p>
              </div>
              {edu.achievements && (
                <ul className="mt-2 text-xs text-zinc-600 list-disc list-inside">
                  {edu.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        {/* Languages & Certifications */}
        <section className="mb-6 print:mb-4">
          <SectionHeader title="Languages & Achievements" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-black">Languages</p>
              <ul className="text-zinc-600 text-sm">
                <li>• <strong className="text-black">English</strong> – Fluent (1,600+ day Duolingo streak, Score: 130)</li>
                <li>• <strong className="text-black">Indonesian</strong> – Native</li>
                <li>• <strong className="text-black">Balinese</strong> – Native</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-black">Key Achievements</p>
              <ul className="text-zinc-600 text-sm">
                <li>• First author on AI/LangGraph research paper</li>
                <li>• 24 public GitHub repositories</li>
                <li>• Open-source contributor (11+ stars on MCP server)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="mb-6 print:mb-4">
          <SectionHeader title="Additional Information" />
          <div className="text-sm text-zinc-600 space-y-1">
            <p>
              <strong>Work Authorization:</strong> Legal right to work in Indonesia (Indonesian citizen)
            </p>
            <p>
              <strong>Availability:</strong> Immediate • Open to on-site (Bali) or remote with US timezone alignment
            </p>
            <p>
              <strong>Development Tools:</strong> Cursor IDE (AI-assisted), VS Code, Git, Docker, Terraform
            </p>
            <p>
              <strong>Interests:</strong> Architecture & properties, Music (singer-songwriter), Continuous learning
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-zinc-400 pt-4 border-t border-border print:mt-4">
          <p>
            Resume generated from{' '}
            <a href="https://esakrissa.com" className="hover:underline">
              esakrissa.com
            </a>{' '}
            • Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </footer>
      </main>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 1cm;
          }

          body {
            font-size: 11pt;
            line-height: 1.4;
          }

          .no-print {
            display: none !important;
          }

          a {
            text-decoration: none;
            color: inherit;
          }

          section {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}
