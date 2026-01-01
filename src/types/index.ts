/**
 * Type Definitions for Portfolio Website
 * Demonstrating TypeScript expertise with:
 * - Strict typing
 * - Generics
 * - Utility types
 * - Discriminated unions
 * - Template literal types
 * - Branded types
 */

// ============================================
// Branded Types for Type Safety
// ============================================

declare const __brand: unique symbol;
type Brand<T, TBrand extends string> = T & { [__brand]: TBrand };

/** URL that has been validated */
export type ValidURL = Brand<string, 'ValidURL'>;

/** Email that has been validated */
export type ValidEmail = Brand<string, 'ValidEmail'>;

/** GitHub username */
export type GitHubUsername = Brand<string, 'GitHubUsername'>;

// ============================================
// Core Types
// ============================================

/** Supported technology categories */
export type TechnologyCategory =
  | 'language'
  | 'framework'
  | 'database'
  | 'cloud'
  | 'tool'
  | 'devops';

/** Proficiency levels */
export type ProficiencyLevel = 'expert' | 'advanced' | 'intermediate';

/** Project status */
export type ProjectStatus = 'active' | 'maintained' | 'archived';

/** Publication type */
export type PublicationType = 'journal' | 'conference' | 'preprint';

// ============================================
// Technology Interface with Generics
// ============================================

export interface Technology<TCategory extends TechnologyCategory = TechnologyCategory> {
  readonly name: string;
  readonly category: TCategory;
  readonly proficiency: ProficiencyLevel;
  readonly yearsOfExperience: number;
  readonly icon?: string;
}

/** Type guard for technology category */
export function isTechnologyCategory(value: unknown): value is TechnologyCategory {
  return (
    typeof value === 'string' &&
    ['language', 'framework', 'database', 'cloud', 'tool', 'devops'].includes(value)
  );
}

// ============================================
// Project Types with Discriminated Unions
// ============================================

interface BaseProject {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly technologies: readonly Technology[];
  readonly status: ProjectStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface GitHubProject extends BaseProject {
  readonly type: 'github';
  readonly repoUrl: ValidURL;
  readonly stars: number;
  readonly forks: number;
  readonly language: string;
}

export interface LiveProject extends BaseProject {
  readonly type: 'live';
  readonly repoUrl?: ValidURL;
  readonly liveUrl: ValidURL;
  readonly stars?: number;
}

export interface ResearchProject extends BaseProject {
  readonly type: 'research';
  readonly publicationUrl?: ValidURL;
  readonly doi?: string;
}

/** Discriminated union for all project types */
export type Project = GitHubProject | LiveProject | ResearchProject;

/** Type guard for GitHub projects */
export function isGitHubProject(project: Project): project is GitHubProject {
  return project.type === 'github';
}

/** Type guard for Live projects */
export function isLiveProject(project: Project): project is LiveProject {
  return project.type === 'live';
}

/** Type guard for Research projects */
export function isResearchProject(project: Project): project is ResearchProject {
  return project.type === 'research';
}

// ============================================
// Publication Types
// ============================================

export interface Author {
  readonly name: string;
  readonly affiliation: string;
  readonly email?: ValidEmail;
  readonly isCorresponding?: boolean;
}

export interface Publication {
  readonly id: string;
  readonly title: string;
  readonly abstract: string;
  readonly authors: readonly Author[];
  readonly type: PublicationType;
  readonly venue: string;
  readonly date: Date;
  readonly doi?: string;
  readonly url?: ValidURL;
  readonly keywords: readonly string[];
  readonly isFirstAuthor: boolean;
}

// ============================================
// Experience & Education Types
// ============================================

export interface TimeRange {
  readonly start: Date;
  readonly end: Date | 'present';
}

export interface Experience {
  readonly id: string;
  readonly title: string;
  readonly company: string;
  readonly location: string;
  readonly timeRange: TimeRange;
  readonly description: string;
  readonly responsibilities: readonly string[];
  readonly technologies: readonly Technology[];
}

export interface Education {
  readonly id: string;
  readonly degree: string;
  readonly field: string;
  readonly institution: string;
  readonly location: string;
  readonly graduationDate: Date;
  readonly gpa?: number;
  readonly achievements?: readonly string[];
}

// ============================================
// Profile & Contact Types
// ============================================

export interface SocialLink {
  readonly platform: 'github' | 'linkedin' | 'twitter' | 'medium' | 'email';
  readonly url: ValidURL;
  readonly username?: string;
}

export interface Profile {
  readonly fullName: string;
  readonly displayName: string;
  readonly title: string;
  readonly bio: string;
  readonly location: string;
  readonly email: ValidEmail;
  readonly website?: ValidURL;
  readonly avatar?: ValidURL;
  readonly socialLinks: readonly SocialLink[];
}

// ============================================
// Contact Form Types with Zod-like Validation
// ============================================

export interface ContactFormData {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

export interface ContactFormErrors {
  readonly name?: string;
  readonly email?: string;
  readonly subject?: string;
  readonly message?: string;
}

/** API Response type with generics */
export type ApiResponse<T> =
  | { readonly success: true; readonly data: T }
  | { readonly success: false; readonly error: string };

// ============================================
// Resume/CV Types
// ============================================

export interface Skill {
  readonly category: string;
  readonly items: readonly Technology[];
}

export interface Resume {
  readonly profile: Profile;
  readonly summary: string;
  readonly skills: readonly Skill[];
  readonly experience: readonly Experience[];
  readonly education: readonly Education[];
  readonly publications: readonly Publication[];
  readonly projects: readonly Project[];
  readonly languages: readonly {
    readonly language: string;
    readonly proficiency: string;
    readonly certification?: string;
  }[];
}

// ============================================
// Utility Types
// ============================================

/** Make all properties mutable */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/** Deep partial type */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** Extract readonly array element type */
export type ArrayElement<T extends readonly unknown[]> = T[number];

/** Create a type-safe object with specific keys */
export type StrictRecord<K extends string, V> = {
  [P in K]: V;
};

// ============================================
// Component Props Types
// ============================================

export interface SectionProps {
  readonly id: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly className?: string;
  readonly children: React.ReactNode;
}

export interface ProjectCardProps {
  readonly project: Project;
  readonly className?: string;
}

export interface PublicationCardProps {
  readonly publication: Publication;
  readonly className?: string;
}

export interface SkillBadgeProps {
  readonly technology: Technology;
  readonly showProficiency?: boolean;
  readonly className?: string;
}

// ============================================
// Navigation Types
// ============================================

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly isExternal?: boolean;
}

export type NavItems = readonly NavItem[];
