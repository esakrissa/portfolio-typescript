"use client";

import { Section } from "./Section";
import { profile, education } from "@/lib/data";

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
              I&apos;m{" "}
              <strong className="text-black dark:text-white">
                {profile.fullName}
              </strong>
              , a Python Backend Engineer based in{" "}
              <strong className="text-black dark:text-white">
                {profile.location}
              </strong>
              . I build backend systems, AI agents, and microservices with
              Python, FastAPI, and cloud-native technologies on AWS and GCP.
            </p>
            <p>
              I&apos;m passionate about building{" "}
              <strong className="text-black dark:text-white">
                robust, scalable backend services
              </strong>{" "}
              and working with{" "}
              <strong className="text-black dark:text-white">
                AI agent architectures
              </strong>
              . From designing reliable APIs to orchestrating multi-agent
              systems with LangGraph and MCP, I focus on shipping things that
              work.
            </p>
            <p>
              I&apos;m also a{" "}
              <strong className="text-black dark:text-white">
                published researcher
              </strong>{" "}
              with papers on AI-based travel agent systems and chatbot search
              algorithms. My creative background as a singer-songwriter gives me
              a unique eye for design and UX.
            </p>
          </div>

          {/* AI Tools */}
          <div className="mt-6 p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🤖</span>
              <div>
                <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
                  AI-Assisted Development
                </p>
                <p className="font-semibold">Cursor + Claude Code</p>
              </div>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
              Building faster with AI tooling as a daily driver
            </p>
          </div>
        </div>

        {/* Education & Values */}
        <div>
          <h3 className="font-semibold mb-4">Education</h3>
          {education.map((edu) => (
            <div
              key={edu.id}
              className="mb-6 p-4 border border-border rounded-lg"
            >
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-zinc-600 dark:text-zinc-400">{edu.field}</p>
              <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {edu.institution}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {edu.location}
              </p>
              {edu.achievements && (
                <ul className="mt-3 space-y-1">
                  {edu.achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start"
                    >
                      <span className="text-zinc-400 dark:text-zinc-500 mr-2">
                        •
                      </span>
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
              {
                icon: "🐍",
                title: "Python First",
                desc: "FastAPI, clean APIs, and production-grade backend code",
              },
              {
                icon: "🏗️",
                title: "Clean Architecture",
                desc: "SOLID principles, microservices, and system design",
              },
              {
                icon: "🤖",
                title: "AI-Native",
                desc: "LangChain, LangGraph, MCP — building with AI agents",
              },
              {
                icon: "🚀",
                title: "Ship It",
                desc: "Done beats perfect. Deploy, learn, iterate.",
              },
            ].map((value) => (
              <li key={value.title} className="flex items-start space-x-3">
                <span className="text-xl">{value.icon}</span>
                <div>
                  <p className="font-medium">{value.title}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {value.desc}
                  </p>
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
