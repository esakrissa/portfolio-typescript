'use client';

import { useEffect, useState, useCallback } from 'react';
import { Monitor, Sun, Moon } from 'lucide-react';

/**
 * Theme options
 */
type Theme = 'system' | 'light' | 'dark';

interface ThemeOption {
  value: Theme;
  icon: React.ReactNode;
  label: string;
}

const themeOptions: ThemeOption[] = [
  { value: 'system', icon: <Monitor size={16} />, label: 'System' },
  { value: 'light', icon: <Sun size={16} />, label: 'Light' },
  { value: 'dark', icon: <Moon size={16} />, label: 'Dark' },
];

/**
 * Get system preference for dark mode
 */
function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Apply theme to document
 */
function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  const effectiveTheme = theme === 'system' ? getSystemTheme() : theme;

  if (effectiveTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

/**
 * ThemeToggle Component
 * Demonstrates: Theme switching with system/light/dark options
 */
export function ThemeToggle(): React.ReactElement {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && ['system', 'light', 'dark'].includes(savedTheme)) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('system');
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (): void => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  const handleThemeChange = useCallback((newTheme: Theme): void => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="inline-flex items-center rounded-full border border-border p-1 bg-zinc-100 dark:bg-zinc-800">
        <div className="w-[104px] h-8" />
      </div>
    );
  }

  return (
    <div
      className="inline-flex items-center rounded-full border border-border p-1 bg-zinc-100 dark:bg-zinc-800"
      role="radiogroup"
      aria-label="Theme selection"
    >
      {themeOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={theme === option.value}
          aria-label={option.label}
          onClick={() => handleThemeChange(option.value)}
          className={`
            flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200
            ${
              theme === option.value
                ? 'bg-white dark:bg-zinc-700 text-black dark:text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }
          `}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}

export default ThemeToggle;
