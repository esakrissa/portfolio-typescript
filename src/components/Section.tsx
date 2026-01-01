import type { SectionProps } from '@/types';

/**
 * Reusable Section Component
 * Demonstrates: Generic section wrapper with consistent styling
 */
export function Section({
  id,
  title,
  subtitle,
  className = '',
  children,
}: SectionProps): React.ReactElement {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="mb-2">{title}</h2>
          {subtitle && <p className="text-zinc-500 dark:text-zinc-400 text-lg">{subtitle}</p>}
        </div>

        {/* Section Content */}
        {children}
      </div>
    </section>
  );
}

export default Section;
