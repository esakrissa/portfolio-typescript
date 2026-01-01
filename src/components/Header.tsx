'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { NavItems, NavItem } from '@/types';
import { navItems } from '@/lib/data';

/**
 * Navigation Link Component
 * Demonstrates: Type-safe props with readonly arrays
 */
interface NavLinkProps {
  readonly item: NavItem;
  readonly onClick?: () => void;
}

function NavLink({ item, onClick }: NavLinkProps): React.ReactElement {
  const isInternalPage = item.href.startsWith('/');
  const className = "text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200";
  const clickHandler = onClick ? { onClick } : {};

  if (isInternalPage) {
    return (
      <Link href={item.href} {...clickHandler} className={className}>
        {item.label}
      </Link>
    );
  }

  return (
    <a
      href={item.href}
      {...clickHandler}
      className={className}
      {...(item.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {item.label}
    </a>
  );
}

/**
 * Mobile Menu Component
 * Demonstrates: Conditional rendering with proper typing
 */
interface MobileMenuProps {
  readonly isOpen: boolean;
  readonly items: NavItems;
  readonly onClose: () => void;
}

function MobileMenu({ isOpen, items, onClose }: MobileMenuProps): React.ReactElement | null {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div className="fixed top-0 right-0 h-full w-64 bg-white border-l border-border p-6">
        <div className="flex justify-end mb-8">
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col space-y-4">
          {items.map((item) => (
            <NavLink key={item.href} item={item} onClick={onClose} />
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-border">
          <a
            href="https://github.com/esakrissa"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Header Component
 * Demonstrates: Custom hooks, useCallback, proper state typing
 */
export function Header(): React.ReactElement {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Handle scroll with useCallback for performance
  const handleScroll = useCallback((): void => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  // Effect for scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback((): void => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback((): void => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="font-mono font-semibold text-lg">
              esa<span className="text-zinc-400 dark:text-zinc-500">krissa</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="https://github.com/esakrissa"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                GitHub
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        items={navItems}
        onClose={closeMobileMenu}
      />
    </>
  );
}

export default Header;
