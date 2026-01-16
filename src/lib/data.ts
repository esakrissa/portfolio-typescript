/**
 * Portfolio Data - Esa Krissa
 * Type-safe data layer demonstrating TypeScript expertise
 */

import type {
  Profile,
  Technology,
  Project,
  Publication,
  Education,
  Skill,
  NavItems,
  ValidURL,
  ValidEmail,
  TechnologyCategory,
  ProficiencyLevel,
} from '@/types';

// ============================================
// Helper Functions for Branded Types
// ============================================

function createValidURL(url: string): ValidURL {
  // In production, we'd validate the URL
  return url as ValidURL;
}

function createValidEmail(email: string): ValidEmail {
  // In production, we'd validate the email
  return email as ValidEmail;
}

// ============================================
// Profile Data
// ============================================

export const profile: Profile = {
  fullName: 'I Wayan Darmika Esa Krissayoga',
  displayName: 'Esa Krissa',
  title: 'Software Engineer',
  bio: `Versatile Software Engineer with experience building end-to-end applications
        using TypeScript, React, Next.js, and cloud-native technologies on AWS and GCP.
        Based in Ubud, Bali, Indonesia. Passionate about creating seamless user experiences
        backed by robust, scalable systems.`,
  location: 'Ubud, Bali, Indonesia',
  email: createValidEmail('esakrissa.wayan@gmail.com'),
  website: createValidURL('https://esakrissa.com'),
  socialLinks: [
    {
      platform: 'github',
      url: createValidURL('https://github.com/esakrissa'),
      username: 'esakrissa',
    },
    {
      platform: 'linkedin',
      url: createValidURL('https://www.linkedin.com/in/esakrissa/'),
      username: 'esakrissa',
    },
    {
      platform: 'medium',
      url: createValidURL('https://medium.com/@esakrissapublishing'),
      username: '@esakrissapublishing',
    },
    {
      platform: 'email',
      url: createValidURL('mailto:esakrissa.wayan@gmail.com'),
    },
  ],
} as const;

// ============================================
// Navigation
// ============================================

export const navItems: NavItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Publications', href: '#publications' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '#contact' },
] as const;

// ============================================
// Technologies
// ============================================

function createTechnology<T extends TechnologyCategory>(
  name: string,
  category: T,
  proficiency: ProficiencyLevel,
  yearsOfExperience: number
): Technology<T> {
  return { name, category, proficiency, yearsOfExperience };
}

export const technologies = {
  // Languages
  typescript: createTechnology('TypeScript', 'language', 'expert', 4),
  javascript: createTechnology('JavaScript', 'language', 'expert', 5),
  python: createTechnology('Python', 'language', 'expert', 5),
  go: createTechnology('Go', 'language', 'advanced', 2),
  rust: createTechnology('Rust', 'language', 'intermediate', 1),

  // Frameworks
  nextjs: createTechnology('Next.js', 'framework', 'expert', 3),
  react: createTechnology('React', 'framework', 'expert', 4),
  fastapi: createTechnology('FastAPI', 'framework', 'expert', 3),
  nodejs: createTechnology('Node.js', 'framework', 'expert', 4),
  nestjs: createTechnology('NestJS', 'framework', 'advanced', 2),

  // Cloud
  aws: createTechnology('AWS', 'cloud', 'expert', 4),
  gcp: createTechnology('Google Cloud Platform', 'cloud', 'expert', 4),
  cloudflare: createTechnology('Cloudflare', 'cloud', 'advanced', 2),
  serverless: createTechnology('Serverless Framework', 'cloud', 'advanced', 3),

  // Databases
  postgresql: createTechnology('PostgreSQL', 'database', 'expert', 4),
  redis: createTechnology('Redis', 'database', 'advanced', 3),
  supabase: createTechnology('Supabase', 'database', 'advanced', 2),
  mongodb: createTechnology('MongoDB', 'database', 'advanced', 3),

  // DevOps & Tools
  docker: createTechnology('Docker', 'devops', 'expert', 4),
  terraform: createTechnology('Terraform', 'devops', 'advanced', 2),
  githubActions: createTechnology('GitHub Actions', 'devops', 'expert', 3),
  cursor: createTechnology('Cursor IDE', 'tool', 'expert', 2),

  // AI/ML
  langchain: createTechnology('LangChain', 'framework', 'expert', 2),
  langgraph: createTechnology('LangGraph', 'framework', 'expert', 2),
  mcp: createTechnology('Model Context Protocol', 'framework', 'expert', 2),
  openai: createTechnology('OpenAI API', 'tool', 'expert', 2),
} as const;

// ============================================
// Skills Grouped by Category
// ============================================

export const skills: readonly Skill[] = [
  {
    category: 'Languages',
    items: [
      technologies.typescript,
      technologies.javascript,
      technologies.python,
      technologies.go,
      technologies.rust,
    ],
  },
  {
    category: 'Back-End & Frameworks',
    items: [
      technologies.nodejs,
      technologies.nestjs,
      technologies.fastapi,
      technologies.nextjs,
      technologies.react,
      technologies.serverless,
    ],
  },
  {
    category: 'Cloud & DevOps',
    items: [
      technologies.aws,
      technologies.gcp,
      technologies.docker,
      technologies.terraform,
      technologies.githubActions,
    ],
  },
  {
    category: 'Databases',
    items: [
      technologies.postgresql,
      technologies.redis,
      technologies.supabase,
      technologies.mongodb,
    ],
  },
  {
    category: 'AI & Modern Tools',
    items: [
      technologies.langchain,
      technologies.langgraph,
      technologies.mcp,
      technologies.openai,
      technologies.cursor,
    ],
  },
] as const;

// ============================================
// Projects
// ============================================

export const projects: readonly Project[] = [
  {
    id: 'modern-isoner',
    type: 'github',
    name: 'Modern ISONER Framework',
    description:
      'Modern implementation of ISONER (Information System on Internet Messenger) framework using microservices architecture with Python, FastAPI, Supabase, Redis, and GCP Pub/Sub.',
    technologies: [
      technologies.python,
      technologies.fastapi,
      technologies.supabase,
      technologies.redis,
      technologies.gcp,
    ],
    status: 'active',
    repoUrl: createValidURL('https://github.com/esakrissa/modern-isoner'),
    stars: 0,
    forks: 0,
    language: 'Python',
    createdAt: new Date('2025-03-09'),
    updatedAt: new Date('2025-03-09'),
  },
  {
    id: 'ai-code-playground',
    type: 'github',
    name: 'AI Code Playground',
    description:
      'A modern TypeScript playground with AI code assistant integration. Demonstrates strict type safety with generics and advanced TypeScript patterns.',
    technologies: [
      technologies.typescript,
      technologies.nodejs,
      technologies.openai,
    ],
    status: 'active',
    repoUrl: createValidURL('https://github.com/esakrissa/ai-code-playground'),
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    createdAt: new Date('2025-03-27'),
    updatedAt: new Date('2025-03-27'),
  },
  {
    id: 'microservices-deployment',
    type: 'github',
    name: 'Microservices Deployment Platform',
    description:
      'A modern microservices architecture with FastAPI, Telegram Bot, and Message Broker deployed on GCP. Features auto-scaling and message broker patterns.',
    technologies: [
      technologies.python,
      technologies.fastapi,
      technologies.gcp,
      technologies.docker,
    ],
    status: 'active',
    repoUrl: createValidURL('https://github.com/esakrissa/microservices-deployment'),
    stars: 0,
    forks: 1,
    language: 'Python',
    createdAt: new Date('2025-03-12'),
    updatedAt: new Date('2025-03-12'),
  },
  {
    id: 'hotels-mcp-server',
    type: 'github',
    name: 'Hotels MCP Server',
    description:
      'MCP server for hotel searches using Booking.com API. Implements robust error handling, rate limiting, and clean API abstractions.',
    technologies: [
      technologies.python,
      technologies.mcp,
    ],
    status: 'active',
    repoUrl: createValidURL('https://github.com/esakrissa/hotels_mcp_server'),
    stars: 11,
    forks: 3,
    language: 'Python',
    createdAt: new Date('2025-03-29'),
    updatedAt: new Date('2025-03-29'),
  },
  {
    id: 'langchain-mcp',
    type: 'github',
    name: 'LangChain MCP',
    description:
      'LangChain Agent with MCP Servers: Using LangChain MCP Adapters for tool integration.',
    technologies: [
      technologies.python,
      technologies.langchain,
      technologies.mcp,
    ],
    status: 'active',
    repoUrl: createValidURL('https://github.com/esakrissa/langchain-mcp'),
    stars: 2,
    forks: 0,
    language: 'Python',
    createdAt: new Date('2025-04-01'),
    updatedAt: new Date('2025-04-01'),
  },
  {
    id: 'langgraph-interrupt-cli',
    type: 'github',
    name: 'LangGraph Interrupt CLI',
    description:
      'Implementation of LangGraph human-in-the-loop (HIL) for hotel booking process. Uses Gemini 2.5 Flash Preview model.',
    technologies: [
      technologies.python,
      technologies.langgraph,
      technologies.openai,
    ],
    status: 'active',
    repoUrl: createValidURL('https://github.com/esakrissa/langgraph-interrupt-cli'),
    stars: 0,
    forks: 0,
    language: 'Python',
    createdAt: new Date('2025-06-16'),
    updatedAt: new Date('2025-06-16'),
  },
  {
    id: 'agen-travel',
    type: 'github',
    name: 'Agen Travel',
    description:
      'Travel agent application built with TypeScript. Final project demonstrating full-stack TypeScript development.',
    technologies: [
      technologies.typescript,
      technologies.nodejs,
    ],
    status: 'active',
    repoUrl: createValidURL('https://github.com/esakrissa/agen-travel'),
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    createdAt: new Date('2025-07-20'),
    updatedAt: new Date('2025-07-20'),
  },
  {
    id: 'trading-bot',
    type: 'github',
    name: 'Trading Bot',
    description:
      'High-performance algorithmic trading bot for cryptocurrency markets. Features real-time data processing pipelines and rigorous testing.',
    technologies: [
      technologies.python,
      technologies.redis,
    ],
    status: 'active',
    repoUrl: createValidURL('https://github.com/esakrissa/trading-bot'),
    stars: 0,
    forks: 0,
    language: 'Python',
    createdAt: new Date('2025-10-19'),
    updatedAt: new Date('2025-10-19'),
  },
  {
    id: 'taskr-cli',
    type: 'github',
    name: 'Taskr CLI',
    description:
      'Beautiful interactive task manager CLI built with Rust. Features animated UI, autocomplete, and persistent storage.',
    technologies: [
      technologies.rust,
    ],
    status: 'active',
    repoUrl: createValidURL('https://github.com/esakrissa/taskr-cli'),
    stars: 0,
    forks: 0,
    language: 'Rust',
    createdAt: new Date('2025-10-15'),
    updatedAt: new Date('2025-10-15'),
  },
  {
    id: 'agents-sdk-telegram',
    type: 'github',
    name: 'Agents SDK Telegram',
    description:
      'Telegram bot using OpenAI Agents SDK and MCP Server. Popular project with community adoption.',
    technologies: [
      technologies.python,
      technologies.openai,
      technologies.mcp,
    ],
    status: 'active',
    repoUrl: createValidURL('https://github.com/esakrissa/agents-sdk-telegram'),
    stars: 6,
    forks: 1,
    language: 'Python',
    createdAt: new Date('2025-03-23'),
    updatedAt: new Date('2025-03-23'),
  },
] as const;

// ============================================
// Publications
// ============================================

export const publications: readonly Publication[] = [
  {
    id: 'langgraph-mcp-travel',
    title: 'AI-Based Travel Agent Architecture with Implementation of LangGraph and Model Context Protocol (MCP)',
    abstract: `Multi-agent AI system using Large Language Models (LLM) for an integrated travel agent 
              application managing hotel bookings, flights, and tour packages with responsive customer service. 
              Implemented LangGraph framework for multi-agent coordination using StateGraph and cyclical graphs. 
              Applied Model Context Protocol (MCP) for standardized AI assistant integration with external data sources. 
              Performance: 99.7% uptime, response time 6.6-53.6 seconds, error rate <0.5%, accuracy rate 92-96%.`,
    authors: [
      {
        name: 'I Wayan Darmika Esa Krissayoga',
        affiliation: 'Department of Information Technology, Udayana University',
        email: createValidEmail('esakrissa.wayan@gmail.com'),
        isCorresponding: true,
      },
      {
        name: 'I Made Sukarsa',
        affiliation: 'Department of Information Technology, Udayana University',
      },
      {
        name: 'Putu Wira Buana',
        affiliation: 'Department of Information Technology, Udayana University',
      },
    ],
    type: 'journal',
    venue: 'Buletin Teknologi Informasi',
    date: new Date('2025-07-01'),
    keywords: ['LangGraph', 'MCP', 'Multi-agent AI', 'Travel Booking', 'LLM'],
    isFirstAuthor: true,
  },
  {
    id: 'ngram-chatbot',
    title: 'N-Gram and Full-Text Search Algorithm Testing for Pattern Recognition in a Chatbot Engine',
    abstract: `Research on the ISONER (Information System On Internet Messenger) framework, focusing on 
              pattern recognition services using Natural Language Processing (NLP). Implemented and benchmarked 
              N-gram and Full-Text Search algorithms using MySQL's built-in plugins for low-latency pattern 
              matching in chatbot engines. The FTS and four-gram algorithms showed excellent results.`,
    authors: [
      {
        name: 'I Made Sukarsa',
        affiliation: 'Department of Information Technology, Udayana University',
      },
      {
        name: 'Deden Witarsyah',
        affiliation: 'Nusa Putra University',
      },
      {
        name: 'I Putu Agung Bayupati',
        affiliation: 'Department of Information Technology, Udayana University',
      },
      {
        name: 'Putu Wira Buana',
        affiliation: 'Department of Information Technology, Udayana University',
      },
      {
        name: 'Ni Wayan Wisswani',
        affiliation: 'Bali State Polytechnic',
      },
      {
        name: 'I Ketut Adi Purnawan',
        affiliation: 'Department of Information Technology, Udayana University',
      },
      {
        name: 'I Putu Adi Putra Setiawan',
        affiliation: 'Department of Information Technology, Udayana University',
      },
      {
        name: 'I Putu Ngurah Krisna Dana',
        affiliation: 'Department of Information Technology, Udayana University',
      },
      {
        name: 'I Wayan Darmika Esa Krissayoga',
        affiliation: 'Department of Information Technology, Udayana University',
        email: createValidEmail('esakrissa.wayan@gmail.com'),
      },
      {
        name: 'Eko Prasetyo',
        affiliation: 'Universitas Muhammadiyah Yogyakarta',
      },
    ],
    type: 'conference',
    venue: 'Engineering Proceedings (MDPI)',
    date: new Date('2025-09-12'),
    doi: '10.3390/engproc2025107086',
    url: createValidURL('https://doi.org/10.3390/engproc2025107086'),
    keywords: ['N-Gram', 'Full-Text Search', 'Chatbot', 'NLP', 'ISONER', 'Pattern Recognition'],
    isFirstAuthor: false,
  },
] as const;

// ============================================
// Education
// ============================================

export const education: readonly Education[] = [
  {
    id: 'udayana',
    degree: "Bachelor's Degree",
    field: 'Information Technology (Teknologi Informasi)',
    institution: 'Universitas Udayana',
    location: 'Bali, Indonesia',
    graduationDate: new Date('2025-01-01'),
    achievements: [
      'Published 2 research papers',
      'First author on AI/LangGraph publication',
      'Research on microservices and chatbot systems',
    ],
  },
] as const;

// ============================================
// Highlights for Hero Section
// ============================================

export const highlights = [
  {
    label: 'Years Experience',
    value: '3+',
  },
  {
    label: 'GitHub Repos',
    value: '24',
  },
  {
    label: 'Research Papers',
    value: '2',
  },
  {
    label: 'Duolingo Streak',
    value: '1,600+',
    sublabel: 'days',
  },
] as const;

// ============================================
// Meta Information
// ============================================

export const meta = {
  title: 'Esa Krissa | Software Engineer',
  description:
    'Software Engineer building end-to-end applications with TypeScript, React, Next.js, and cloud technologies. Based in Bali, Indonesia.',
  keywords: [
    'TypeScript',
    'Software Engineer',
    'React',
    'Next.js',
    'Full Stack',
    'AWS',
    'GCP',
    'Bali',
  ] as string[],
  ogImage: '/og-image.png',
  twitterHandle: '@esakrissa',
};
