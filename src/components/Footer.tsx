"use client";

import { profile, navItems } from "@/lib/data";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Get current year
 * Demonstrates: Simple utility with type inference
 */
function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * Footer Component
 * Demonstrates: Clean footer with navigation and credits
 */
export function Footer(): React.ReactElement {
  return (
    <footer className="border-t border-border py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <a href="#" className="font-mono font-semibold text-lg">
              esa
              <span className="text-zinc-400 dark:text-zinc-500">krissa</span>
            </a>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              {profile.title}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {profile.location}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-semibold mb-4">Quick Links</p>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <p className="font-semibold mb-4">Connect</p>
            <div className="space-y-2">
              {profile.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors capitalize"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400">
          <p>
            © {getCurrentYear()} {profile.displayName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="font-mono text-xs">Built with Next.js</p>
            <ThemeToggle />
          </div>
        </div>

        {/* Python Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 border border-border rounded-full text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <span>Python</span>
            <span>•</span>
            <span>FastAPI</span>
            <span>•</span>
            <span>AI Agents</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
