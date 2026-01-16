'use client';

import { Section } from './Section';
import { profile, education } from '@/lib/data';

/**
 * About Section Component
 * Demonstrates: Personal introduction with education
 */
export function About(): React.ReactElement {
  return (
    <Section
      id="about"
      title="About"
      subtitle="A bit about me and my background"
    >
      <div className="grid md:grid-cols-2 gap-12">
        {/* Bio */}
        <div>
          <h3 className="font-semibold mb-4">Background</h3>
          <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
            <p>
              I&apos;m <strong className="text-black dark:text-white">{profile.fullName}</strong>, a Software
              Engineer based in <strong className="text-black dark:text-white">{profile.location}</strong>.
              I build end-to-end applications using TypeScript, React, Next.js, and cloud-native
              technologies on AWS and GCP.
            </p>
            <p>
              I&apos;m passionate about creating <strong className="text-black dark:text-white">seamless user experiences</strong> backed
              by <strong className="text-black dark:text-white">robust, scalable systems</strong>. From crafting intuitive interfaces
              to designing reliable backend services, I enjoy working across the full stack.
            </p>
            <p>
              Beyond coding, I&apos;m also a <strong className="text-black dark:text-white">singer-songwriter</strong>
              and artist. This creative background gives me a unique perspective on design and user
              experience—I believe beautiful products work better.
            </p>
          </div>

          {/* Duolingo Achievement */}
          <div className="mt-6 p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400">Duolingo Streak</p>
                <p className="font-semibold">1,600+ days</p>
              </div>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
              Demonstrating consistency and dedication in continuous learning
            </p>
          </div>
        </div>

        {/* Education & Values */}
        <div>
          <h3 className="font-semibold mb-4">Education</h3>
          {education.map((edu) => (
            <div key={edu.id} className="mb-6 p-4 border border-border rounded-lg">
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-zinc-600 dark:text-zinc-400">{edu.field}</p>
              <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {edu.institution}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{edu.location}</p>
              {edu.achievements && (
                <ul className="mt-3 space-y-1">
                  {edu.achievements.map((achievement, index) => (
                    <li key={index} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start">
                      <span className="text-zinc-400 dark:text-zinc-500 mr-2">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <h3 className="font-semibold mb-4 mt-8">What I Value</h3>
          <ul className="space-y-3">
            {[
              { icon: '🎯', title: 'Type Safety', desc: 'Generics and strict typing from day one' },
              { icon: '🏗️', title: 'Clean Architecture', desc: 'SOLID principles, DRY methodology' },
              { icon: '📐', title: 'Design First', desc: 'I sketch diagrams before I write code' },
              { icon: '🔍', title: 'Attention to Detail', desc: 'The small things matter' },
            ].map((value) => (
              <li key={value.title} className="flex items-start space-x-3">
                <span className="text-xl">{value.icon}</span>
                <div>
                  <p className="font-medium">{value.title}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{value.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export default About;
