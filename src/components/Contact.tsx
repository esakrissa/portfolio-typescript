"use client";

import { useState, useCallback, type FormEvent, type ChangeEvent } from "react";
import { Section } from "./Section";
import { profile } from "@/lib/data";
import type { ContactFormData, ContactFormErrors } from "@/types";

/**
 * Form validation using type-safe approach
 * Demonstrates: Validation logic with proper typing
 */
function validateForm(data: ContactFormData): ContactFormErrors {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors["name"] = "Name is required";
  }

  if (!data.email.trim()) {
    errors["email"] = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors["email"] = "Please enter a valid email";
  }

  if (!data.subject.trim()) {
    errors["subject"] = "Subject is required";
  }

  if (!data.message.trim()) {
    errors["message"] = "Message is required";
  } else if (data.message.length < 10) {
    errors["message"] = "Message must be at least 10 characters";
  }

  return errors as ContactFormErrors;
}

/**
 * Check if errors object is empty
 */
function hasErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * Input Field Component
 * Demonstrates: Controlled input with error handling
 */
interface InputFieldProps {
  readonly id: string;
  readonly label: string;
  readonly type?: "text" | "email";
  readonly value: string;
  readonly error?: string | undefined;
  readonly onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  readonly placeholder?: string;
}

function InputField({
  id,
  label,
  type = "text",
  value,
  error,
  onChange,
  placeholder,
}: InputFieldProps): React.ReactElement {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg font-mono text-sm bg-white dark:bg-zinc-800 text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white ${
          error ? "border-red-500" : "border-border"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

/**
 * Textarea Field Component
 */
interface TextareaFieldProps {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly error?: string | undefined;
  readonly onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  readonly placeholder?: string;
  readonly rows?: number;
}

function TextareaField({
  id,
  label,
  value,
  error,
  onChange,
  placeholder,
  rows = 5,
}: TextareaFieldProps): React.ReactElement {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-2 border rounded-lg font-mono text-sm bg-white dark:bg-zinc-800 text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none ${
          error ? "border-red-500" : "border-border"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

/**
 * Contact Form State Type
 */
type FormStatus = "idle" | "submitting" | "success" | "error";

/**
 * Contact Section Component
 * Demonstrates: Complex form handling with TypeScript
 */
export function Contact(): React.ReactElement {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  // Handle input change with type-safe callback
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error when user starts typing
      if (errors[name as keyof ContactFormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors],
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();

      // Validate form
      const validationErrors = validateForm(formData);
      if (hasErrors(validationErrors)) {
        setErrors(validationErrors);
        return;
      }

      setStatus("submitting");

      // Simulate API call (in production, this would hit the backend API)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // For demo, we'll just show success
        // In production: const response = await fetch('/api/contact', { ... });
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } catch {
        setStatus("error");
      }
    },
    [formData],
  );

  return (
    <Section id="contact" title="Contact" subtitle="Get in touch with me">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-4">Let&apos;s Connect</h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            I&apos;m always interested in hearing about new opportunities,
            collaborations, or just having a chat about technology. Feel free to
            reach out!
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-xl">📧</span>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Email
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-mono text-sm hover:underline"
                >
                  {profile.email}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xl">🔗</span>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  GitHub
                </p>
                <a
                  href="https://github.com/esakrissa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm hover:underline"
                >
                  github.com/esakrissa
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xl">💼</span>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  LinkedIn
                </p>
                <a
                  href="https://www.linkedin.com/in/esakrissa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm hover:underline"
                >
                  linkedin.com/in/esakrissa
                </a>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="mt-8 p-4 border border-black dark:border-white rounded-lg bg-zinc-50 dark:bg-zinc-800">
            <p className="font-semibold mb-2">🟢 Currently Available</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Open to remote opportunities — especially Python backend roles
              involving FastAPI, microservices, AI agents, and cloud
              infrastructure (AWS/GCP). Based in Bali (UTC+8), aligned with APAC
              and EU timezones.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              id="name"
              label="Name"
              value={formData.name}
              error={errors.name}
              onChange={handleChange}
              placeholder="Your name"
            />

            <InputField
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              error={errors.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />

            <InputField
              id="subject"
              label="Subject"
              value={formData.subject}
              error={errors.subject}
              onChange={handleChange}
              placeholder="What's this about?"
            />

            <TextareaField
              id="message"
              label="Message"
              value={formData.message}
              error={errors.message}
              onChange={handleChange}
              placeholder="Your message..."
            />

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-green-600 dark:text-green-400 text-sm text-center">
                ✓ Message sent successfully! I&apos;ll get back to you soon.
              </p>
            )}

            {status === "error" && (
              <p className="text-red-500 text-sm text-center">
                ✗ Something went wrong. Please try again or email me directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </Section>
  );
}

export default Contact;
