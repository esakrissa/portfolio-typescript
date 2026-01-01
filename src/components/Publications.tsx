'use client';

import { Section } from './Section';
import { publications } from '@/lib/data';
import type { PublicationCardProps, Author } from '@/types';

/**
 * Format date to readable string
 * Demonstrates: Pure utility function with type safety
 */
function formatPublicationDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Author List Component
 * Demonstrates: Array mapping with highlighting
 */
interface AuthorListProps {
  readonly authors: readonly Author[];
  readonly highlightName?: string;
}

function AuthorList({ authors, highlightName = 'I Wayan Darmika Esa Krissayoga' }: AuthorListProps): React.ReactElement {
  return (
    <p className="text-sm text-zinc-600 dark:text-zinc-400">
      {authors.map((author, index) => {
        const isHighlighted = author.name === highlightName;
        const isLast = index === authors.length - 1;
        const separator = isLast ? '' : index === authors.length - 2 ? ' & ' : ', ';

        return (
          <span key={author.name}>
            <span className={isHighlighted ? 'font-semibold text-black dark:text-white' : ''}>
              {author.name}
            </span>
            {author.isCorresponding && <sup>*</sup>}
            {separator}
          </span>
        );
      })}
    </p>
  );
}

/**
 * Keyword Tag Component
 */
interface KeywordTagProps {
  readonly keyword: string;
}

function KeywordTag({ keyword }: KeywordTagProps): React.ReactElement {
  return (
    <span className="badge text-xs">
      {keyword}
    </span>
  );
}

/**
 * Publication Card Component
 * Demonstrates: Complex card with multiple data types
 */
function PublicationCard({ publication, className = '' }: PublicationCardProps): React.ReactElement {
  return (
    <article className={`card ${className}`}>
      {/* First Author Badge */}
      {publication.isFirstAuthor && (
        <div className="mb-3">
          <span className="badge badge-filled">First Author</span>
        </div>
      )}

      {/* Title */}
      <h3 className="font-semibold text-lg mb-2">
        {publication.url ? (
          <a
            href={publication.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {publication.title}
          </a>
        ) : (
          publication.title
        )}
      </h3>

      {/* Authors */}
      <div className="mb-3">
        <AuthorList authors={publication.authors} />
      </div>

      {/* Venue & Date */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-4">
        <span className="font-mono">{publication.venue}</span>
        <span>•</span>
        <span>{formatPublicationDate(publication.date)}</span>
        {publication.doi && (
          <>
            <span>•</span>
            <a
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs hover:underline"
            >
              DOI: {publication.doi}
            </a>
          </>
        )}
      </div>

      {/* Abstract */}
      <details className="mb-4">
        <summary className="cursor-pointer text-sm font-medium hover:underline">
          View Abstract
        </summary>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {publication.abstract}
        </p>
      </details>

      {/* Keywords */}
      <div className="flex flex-wrap gap-2">
        {publication.keywords.map((keyword) => (
          <KeywordTag key={keyword} keyword={keyword} />
        ))}
      </div>

      {/* Link */}
      {publication.url && (
        <div className="mt-4 pt-4 border-t border-border">
          <a
            href={publication.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:underline"
          >
            View Publication →
          </a>
        </div>
      )}
    </article>
  );
}

/**
 * Publications Section Component
 * Demonstrates: Academic publications showcase
 */
export function Publications(): React.ReactElement {
  return (
    <Section
      id="publications"
      title="Publications"
      subtitle="Research papers and academic contributions"
    >
      <div className="space-y-6">
        {publications.map((pub) => (
          <PublicationCard key={pub.id} publication={pub} />
        ))}
      </div>

      {/* Research Highlight */}
      <div className="mt-12 p-6 border border-border rounded-lg bg-zinc-50 dark:bg-zinc-800">
        <div className="flex items-start space-x-4">
          <div className="font-mono text-4xl">📚</div>
          <div>
            <h3 className="font-semibold mb-2">Research Focus</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              My research focuses on <strong>microservices architecture</strong>, 
              <strong> AI agent orchestration</strong>, and <strong>backend system optimization</strong>. 
              I combine academic rigor with practical implementation, as demonstrated by my 
              GitHub repositories that implement the concepts from my papers.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Publications;
