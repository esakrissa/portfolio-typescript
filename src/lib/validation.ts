/**
 * Validation Library
 * Type-safe validation utilities demonstrating advanced TypeScript patterns
 *
 * Demonstrates:
 * - Generic validation functions
 * - Result types (Either pattern)
 * - Type predicates
 * - Branded types for validated data
 */

import { z } from 'zod';
import type { ContactFormData, ApiResponse, ValidEmail } from '@/types';

// ============================================
// Zod Schemas for Runtime Validation
// ============================================

/**
 * Contact form validation schema
 * Demonstrates: Zod integration with TypeScript
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(200, 'Subject must be less than 200 characters')
    .trim(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters')
    .trim(),
});

/**
 * Infer type from Zod schema
 * This ensures our schema matches our TypeScript type
 */
export type ValidatedContactForm = z.infer<typeof contactFormSchema>;

// ============================================
// Generic Validation Result Type
// ============================================

/**
 * Validation result using discriminated union
 * Demonstrates: Type-safe error handling pattern
 */
export type ValidationResult<T> =
  | { readonly success: true; readonly data: T }
  | { readonly success: false; readonly errors: Record<string, string> };

/**
 * Validate contact form data
 * Returns type-safe result with either validated data or errors
 */
export function validateContactForm(
  data: unknown
): ValidationResult<ValidatedContactForm> {
  const result = contactFormSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  // Transform Zod errors to our error format
  const errors: Record<string, string> = {};
  for (const error of result.error.errors) {
    const path = error.path.join('.');
    errors[path] = error.message;
  }

  return { success: false, errors };
}

// ============================================
// Email Validation Utilities
// ============================================

/**
 * Email validation regex pattern
 * RFC 5322 compliant (simplified)
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Type guard for valid email
 * Demonstrates: Type predicate with runtime validation
 */
export function isValidEmail(value: unknown): value is ValidEmail {
  return typeof value === 'string' && EMAIL_REGEX.test(value);
}

/**
 * Create validated email
 * Throws if email is invalid
 */
export function createValidatedEmail(email: string): ValidEmail {
  if (!isValidEmail(email)) {
    throw new Error(`Invalid email: ${email}`);
  }
  return email;
}

// ============================================
// Sanitization Utilities
// ============================================

/**
 * Sanitize string input
 * Removes potential XSS vectors
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim();
}

/**
 * Sanitize contact form data
 * Demonstrates: Type-safe data transformation
 */
export function sanitizeContactForm(data: ContactFormData): ContactFormData {
  return {
    name: sanitizeString(data.name),
    email: data.email.toLowerCase().trim(),
    subject: sanitizeString(data.subject),
    message: sanitizeString(data.message),
  };
}

// ============================================
// API Response Helpers
// ============================================

/**
 * Create success response
 * Type-safe API response factory
 */
export function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return { success: true, data };
}

/**
 * Create error response
 * Type-safe API error factory
 */
export function createErrorResponse<T>(error: string): ApiResponse<T> {
  return { success: false, error };
}

// ============================================
// Rate Limiting Types (for demonstration)
// ============================================

/**
 * Rate limit configuration
 */
export interface RateLimitConfig {
  readonly windowMs: number;
  readonly maxRequests: number;
}

/**
 * Rate limit result
 */
export interface RateLimitResult {
  readonly allowed: boolean;
  readonly remaining: number;
  readonly resetAt: Date;
}

/**
 * Simple in-memory rate limiter (for demonstration)
 * In production, use Redis or similar
 */
export class RateLimiter {
  private readonly requests: Map<string, number[]> = new Map();
  private readonly config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  /**
   * Check if request is allowed
   * Demonstrates: Class with proper typing
   */
  check(identifier: string): RateLimitResult {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    // Get existing requests for this identifier
    const existingRequests = this.requests.get(identifier) ?? [];

    // Filter to only requests within the window
    const recentRequests = existingRequests.filter((time) => time > windowStart);

    // Check if under limit
    const allowed = recentRequests.length < this.config.maxRequests;

    if (allowed) {
      // Add current request
      recentRequests.push(now);
      this.requests.set(identifier, recentRequests);
    }

    return {
      allowed,
      remaining: Math.max(0, this.config.maxRequests - recentRequests.length),
      resetAt: new Date(windowStart + this.config.windowMs),
    };
  }
}
