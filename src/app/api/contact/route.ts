/**
 * Contact Form API Route
 * Demonstrates backend TypeScript with Next.js Route Handlers
 *
 * NOTE: This route is for demonstration purposes.
 * For Cloudflare Pages static export, you would need to:
 * 1. Deploy this as a Cloudflare Worker separately
 * 2. Or use Cloudflare Pages Functions
 * 3. Or use an external API service
 *
 * This code demonstrates:
 * - Type-safe request handling
 * - Input validation with Zod
 * - Error handling patterns
 * - Rate limiting implementation
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  validateContactForm,
  sanitizeContactForm,
  createSuccessResponse,
  createErrorResponse,
  RateLimiter,
} from '@/lib/validation';
import type { ApiResponse, ContactFormData } from '@/types';

// ============================================
// Rate Limiter Configuration
// ============================================

const rateLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 5, // 5 requests per minute
});

// ============================================
// Response Helpers
// ============================================

/**
 * Create JSON response with proper typing
 */
function jsonResponse<T>(
  data: ApiResponse<T>,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(data, { status });
}

/**
 * Get client IP from request
 * Handles various proxy headers
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() ?? 'unknown';
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  return 'unknown';
}

// ============================================
// POST Handler
// ============================================

/**
 * Handle contact form submission
 *
 * @example
 * POST /api/contact
 * Content-Type: application/json
 *
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "subject": "Job Opportunity",
 *   "message": "I'd like to discuss..."
 * }
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<{ message: string }>>> {
  try {
    // 1. Rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = rateLimiter.check(clientIP);

    if (!rateLimitResult.allowed) {
      return jsonResponse(
        createErrorResponse('Too many requests. Please try again later.'),
        429
      );
    }

    // 2. Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return jsonResponse(
        createErrorResponse('Invalid JSON in request body'),
        400
      );
    }

    // 3. Validate input
    const validationResult = validateContactForm(body);

    if (!validationResult.success) {
      return jsonResponse(
        createErrorResponse(
          `Validation failed: ${Object.values(validationResult.errors).join(', ')}`
        ),
        400
      );
    }

    // 4. Sanitize data
    const sanitizedData = sanitizeContactForm(validationResult.data);

    // 5. Process the contact form
    // In production, you would:
    // - Send email via SendGrid/Resend/etc.
    // - Store in database
    // - Send to CRM
    // - etc.

    // Simulate processing delay
    await simulateEmailSend(sanitizedData);

    // 6. Return success response
    return jsonResponse(
      createSuccessResponse({
        message: 'Thank you for your message! I will get back to you soon.',
      }),
      200
    );
  } catch (error) {
    // Log error in production
    console.error('Contact form error:', error);

    return jsonResponse(
      createErrorResponse('An unexpected error occurred. Please try again.'),
      500
    );
  }
}

// ============================================
// GET Handler (for health check)
// ============================================

/**
 * Health check endpoint
 */
export async function GET(): Promise<NextResponse<ApiResponse<{ status: string }>>> {
  return jsonResponse(
    createSuccessResponse({
      status: 'Contact API is operational',
    }),
    200
  );
}

// ============================================
// Helper Functions
// ============================================

/**
 * Simulate sending email
 * In production, replace with actual email service
 */
async function simulateEmailSend(data: ContactFormData): Promise<void> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Log for demonstration
  console.log('📧 Contact form submission:', {
    from: data.email,
    name: data.name,
    subject: data.subject,
    messageLength: data.message.length,
    timestamp: new Date().toISOString(),
  });
}

// ============================================
// Type Exports for Testing
// ============================================

export type { ApiResponse, ContactFormData };
