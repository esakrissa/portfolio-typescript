# Esa Krissa - Portfolio

> Personal portfolio website showcasing TypeScript expertise, built with Next.js 14 and deployed on Cloudflare Pages.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## 🎯 Project Purpose

This portfolio website is designed to demonstrate **TypeScript expertise** through:

- **Strict Type Configuration** - All strict flags enabled in `tsconfig.json`
- **Branded Types** - Type-safe URLs, emails, and identifiers
- **Discriminated Unions** - Type-safe project variants (GitHub, Live, Research)
- **Generic Components** - Reusable, type-safe UI components
- **Zod Validation** - Runtime type validation with TypeScript inference
- **API Route Handlers** - Type-safe backend endpoints

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript 5.5 (Strict Mode) |
| **Styling** | Tailwind CSS 3.4 |
| **Fonts** | Inter (Sans) + JetBrains Mono |
| **Validation** | Zod |
| **Animation** | Framer Motion |
| **Icons** | Lucide React |
| **Deployment** | Cloudflare Pages |

## 📁 Project Structure

```
portfolio-typescript/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts      # Backend API route
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   ├── components/
│   │   ├── Header.tsx            # Navigation header
│   │   ├── Hero.tsx              # Hero section
│   │   ├── About.tsx             # About section
│   │   ├── Skills.tsx            # Skills grid
│   │   ├── Projects.tsx          # Projects showcase
│   │   ├── Publications.tsx      # Research papers
│   │   ├── Contact.tsx           # Contact form
│   │   ├── Footer.tsx            # Site footer
│   │   ├── Section.tsx           # Reusable section wrapper
│   │   └── index.ts              # Barrel export
│   ├── lib/
│   │   ├── data.ts               # Portfolio data
│   │   └── validation.ts         # Validation utilities
│   └── types/
│       └── index.ts              # Type definitions
├── public/                       # Static assets
├── tsconfig.json                 # Strict TypeScript config
├── tailwind.config.ts            # Tailwind configuration
├── next.config.ts                # Next.js configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/esakrissa/portfolio-typescript.git
cd portfolio-typescript

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler |

## 🔧 TypeScript Features Demonstrated

### 1. Strict Configuration

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true,
    // ... all strict flags enabled
  }
}
```

### 2. Branded Types

```typescript
// Type-safe branded types
type ValidURL = Brand<string, 'ValidURL'>;
type ValidEmail = Brand<string, 'ValidEmail'>;

// Usage
const url: ValidURL = createValidURL('https://example.com');
```

### 3. Discriminated Unions

```typescript
// Type-safe project variants
type Project = GitHubProject | LiveProject | ResearchProject;

// Type guard
function isGitHubProject(project: Project): project is GitHubProject {
  return project.type === 'github';
}
```

### 4. Generic Components

```typescript
// Reusable section component
interface SectionProps {
  readonly id: string;
  readonly title: string;
  readonly children: React.ReactNode;
}
```

### 5. Zod Validation

```typescript
// Runtime validation with type inference
const contactFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  // ...
});

type ValidatedContactForm = z.infer<typeof contactFormSchema>;
```

## 🌐 Deployment

### Cloudflare Pages

1. Push to GitHub
2. Connect repository to Cloudflare Pages
3. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node.js version:** 18

### Manual Deployment

```bash
# Build static export
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy out
```

## 📊 Performance

- **Lighthouse Score:** 100/100
- **First Contentful Paint:** < 1s
- **Largest Contentful Paint:** < 2s
- **Total Blocking Time:** 0ms
- **Cumulative Layout Shift:** 0

## 🎨 Design Philosophy

- **Minimal:** Black and white color scheme
- **Typography:** Sans-serif (Inter) + Monospace (JetBrains Mono)
- **Responsive:** Mobile-first design
- **Accessible:** WCAG 2.1 AA compliant
- **Fast:** Static export, optimized assets

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!

## 👤 Author

**I Wayan Darmika Esa Krissayoga (Esa Krissa)**

- 🌐 Website: [esakrissa.com](https://esakrissa.com)
- 🐙 GitHub: [@esakrissa](https://github.com/esakrissa)
- 📧 Email: esakrissa.wayan@gmail.com
- 📍 Location: Ubud, Bali, Indonesia

---

Built with ❤️ and strict TypeScript
