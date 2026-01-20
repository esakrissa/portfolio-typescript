'use client';

import { Section } from './Section';
import { projects } from '@/lib/data';
import type { Project, ProjectCardProps, Technology } from '@/types';
import { isGitHubProject } from '@/types';

/**
 * Technology Tag Component
 * Demonstrates: Inline type narrowing
 */
interface TechTagProps {
  readonly tech: Technology;
}

function TechTag({ tech }: TechTagProps): React.ReactElement {
  return (
    <span className="badge text-xs">
      {tech.name}
    </span>
  );
}

/**
 * Star Count Component
 * Demonstrates: Conditional rendering based on value
 */
interface StarCountProps {
  readonly count: number;
}

function StarCount({ count }: StarCountProps): React.ReactElement | null {
  if (count === 0) return null;

  return (
    <span className="flex items-center space-x-1 text-sm text-zinc-500 dark:text-zinc-400">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span>{count}</span>
    </span>
  );
}

/**
 * Fork Count Component
 */
interface ForkCountProps {
  readonly count: number;
}

function ForkCount({ count }: ForkCountProps): React.ReactElement | null {
  if (count === 0) return null;

  return (
    <span className="flex items-center space-x-1 text-sm text-zinc-500 dark:text-zinc-400">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
      <span>{count}</span>
    </span>
  );
}

/**
 * Project Card Component
 * Demonstrates: Discriminated union handling with type guards
 */
function ProjectCard({ project, className = '' }: ProjectCardProps): React.ReactElement {
  // Type-safe access based on project type
  const getProjectUrl = (proj: Project): string => {
    if (isGitHubProject(proj)) {
      return proj.repoUrl;
    }
    return proj.type === 'live' ? proj.liveUrl : '#';
  };

  const getLanguageBadge = (proj: Project): string | null => {
    if (isGitHubProject(proj)) {
      return proj.language;
    }
    return null;
  };

  return (
    <article className={`card group ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg group-hover:underline">
            <a
              href={getProjectUrl(project)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.name}
            </a>
          </h3>

          {/* Language Badge for GitHub Projects */}
          {getLanguageBadge(project) && (
            <span className="inline-flex items-center mt-1">
              <span className="w-2 h-2 rounded-full bg-black mr-2" />
              <span className="font-mono text-xs text-zinc-500">
                {getLanguageBadge(project)}
              </span>
            </span>
          )}
        </div>

        {/* Stats for GitHub Projects */}
        {isGitHubProject(project) && (
          <div className="flex items-center space-x-3">
            <StarCount count={project.stars} />
            <ForkCount count={project.forks} />
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.slice(0, 4).map((tech) => (
          <TechTag key={tech.name} tech={tech} />
        ))}
        {project.technologies.length > 4 && (
          <span className="badge text-xs">+{project.technologies.length - 4}</span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="badge badge-filled">{project.status}</span>
        <a
          href={getProjectUrl(project)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium hover:underline"
        >
          View Project →
        </a>
      </div>
    </article>
  );
}

/**
 * Projects Section Component
 * Demonstrates: Grid layout with filtered/sorted data
 */
export function Projects(): React.ReactElement {
  // Sort projects by stars (descending), then by date
  const sortedProjects = [...projects].sort((a, b) => {
    const starsA = isGitHubProject(a) ? a.stars : 0;
    const starsB = isGitHubProject(b) ? b.stars : 0;

    if (starsB !== starsA) {
      return starsB - starsA;
    }

    return b.updatedAt.getTime() - a.updatedAt.getTime();
  });

  // Take top projects for display
  const displayProjects = sortedProjects.slice(0, 8);

  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Selected work from my GitHub repositories"
    >
      <div className="project-grid">
        {displayProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center mt-12">
        <a
          href="https://github.com/esakrissa?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          View All 24 Repositories on GitHub →
        </a>
      </div>
    </Section>
  );
}

export default Projects;
