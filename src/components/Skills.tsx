'use client';

import { Section } from './Section';
import { skills } from '@/lib/data';
import type { Technology, ProficiencyLevel } from '@/types';

/**
 * Proficiency Badge Component
 * Demonstrates: Mapped types for styling
 */
interface ProficiencyBadgeProps {
  readonly level: ProficiencyLevel;
}

function ProficiencyBadge({ level }: ProficiencyBadgeProps): React.ReactElement {
  const styles: Record<ProficiencyLevel, string> = {
    expert: 'bg-black text-white dark:bg-white dark:text-black',
    advanced: 'bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200',
    intermediate: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${styles[level]}`}>
      {level}
    </span>
  );
}

/**
 * Skill Card Component
 * Demonstrates: Technology type with category filtering
 */
interface SkillCardProps {
  readonly technology: Technology;
}

function SkillCard({ technology }: SkillCardProps): React.ReactElement {
  return (
    <div className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-black transition-colors duration-200">
      <div className="flex items-center space-x-3">
        <span className="font-medium text-sm">{technology.name}</span>
      </div>
      <ProficiencyBadge level={technology.proficiency} />
    </div>
  );
}

/**
 * Skill Category Component
 * Demonstrates: Grouped rendering with category headers
 */
interface SkillCategoryProps {
  readonly category: string;
  readonly items: readonly Technology[];
}

function SkillCategory({ category, items }: SkillCategoryProps): React.ReactElement {
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="font-mono text-sm text-zinc-500 dark:text-zinc-400 mb-4 uppercase tracking-wider">
        {category}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((tech) => (
          <SkillCard key={tech.name} technology={tech} />
        ))}
      </div>
    </div>
  );
}

/**
 * Skills Section Component
 * Demonstrates: Data-driven section with categorized skills
 */
export function Skills(): React.ReactElement {
  return (
    <Section
      id="skills"
      title="Skills"
      subtitle="Technologies and tools I work with"
    >
      <div className="space-y-8">
        {skills.map((skill) => (
          <SkillCategory
            key={skill.category}
            category={skill.category}
            items={skill.items}
          />
        ))}
      </div>

      {/* TypeScript Highlight */}
      <div className="mt-12 p-6 border border-black dark:border-white rounded-lg bg-zinc-50 dark:bg-zinc-800">
        <div className="flex items-start space-x-4">
          <div className="font-mono text-4xl">TS</div>
          <div>
            <h3 className="font-semibold mb-2">TypeScript First</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              I prioritize type safety in all my projects. Generics, strict null checks, 
              and proper type inference are not afterthoughts—they&apos;re part of my design process. 
              When I see <code>any</code>, I refactor it.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Skills;
