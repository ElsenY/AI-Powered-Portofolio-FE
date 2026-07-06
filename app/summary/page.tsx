import Link from "next/link";
import {
  ArrowRight,
  Code,
  Briefcase,
  Gamepad2,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { SkillCategorySection } from "@/components/skill-category-section";
import { experiences } from "@/lib/experience-data";
import { skillCategories } from "@/lib/skills-data";

import { getGitHubProjects, FEATURED_REPOS } from "@/lib/github";

export const revalidate = 3600;

export default async function SummaryPage() {
  const projects = await getGitHubProjects();
  const featuredProjects = projects
    .filter((p) => p.featured)
    .sort((a, b) => {
      const idxA = FEATURED_REPOS.indexOf(a.name.toLowerCase());
      const idxB = FEATURED_REPOS.indexOf(b.name.toLowerCase());
      return idxA - idxB;
    })
    .slice(0, 3);
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Hero Section */}
        <AnimatedSection className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Everything at a Glance
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            A quick look of me as a software engineer.
          </p>
        </AnimatedSection>

        {/* Quick Stats */}
        <AnimatedSection delay={100} className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "6+", label: "Years Experience" },
              { value: "50+", label: "Projects" },
              { value: "20+", label: "AI Tools used" },
              { value: "30+", label: "Complex Project Completed" },
            ].map((stat, index) => (
              <AnimatedSection
                key={stat.label}
                delay={100 + index * 50}
                className="bg-card border border-border rounded-xl p-6 text-center"
              >
                <p className="text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Experience */}
        <AnimatedSection delay={200} className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Experience</h2>
            </div>
            <Link
              href="/experience"
              className="text-primary hover:underline text-sm flex items-center gap-1"
            >
              View full <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <div className="space-y-6">
              {experiences.map((job, index) => (
                <div
                  key={`${job.company}-${job.period}`}
                  className={`flex items-start gap-4 ${index < experiences.length - 1
                    ? "pb-6 border-b border-border"
                    : ""
                    }`}
                >
                  <div
                    className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${job.current ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                  />
                  <div className="flex-1 min-w-0">
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-bold hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                    >
                      {job.company}
                    </a>
                    <p className="text-sm font-medium">{job.title}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">
                      {job.period}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-sm text-primary mb-2">
                Bachelor of Computer Science
              </p>
              <p className="text-xs text-muted-foreground">
                Bina Nusantara University
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Skills */}
        <AnimatedSection delay={200} className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Skills</h2>
            </div>
            <Link
              href="/skills"
              className="text-primary hover:underline text-sm flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-8">
              {skillCategories.map((category) => (
                <div
                  key={category.title}
                  className={
                    category.title === "Other Tools"
                      ? "sm:col-span-2"
                      : undefined
                  }
                >
                  <SkillCategorySection category={category} compact />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Featured Projects */}
        <AnimatedSection delay={200} className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Projects</h2>
            <Link
              href="/portfolio"
              className="text-primary hover:underline text-sm flex items-center gap-1"
            >
              View all projects <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <a
                key={project.title}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <AnimatedSection
                  delay={200 + index * 50}
                  direction="up"
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors h-full"
                >
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                    {project.title}
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </AnimatedSection>
              </a>
            ))}
          </div>
        </AnimatedSection>

        {/* Game Teaser */}
        <AnimatedSection delay={200} className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Try this Game</h2>
            <Link
              href="/game"
              className="text-primary hover:underline text-sm flex items-center gap-1"
            >
              Play now <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <Link
            href="/game"
            className="block bg-gradient-to-br from-card to-secondary border border-border rounded-xl p-8 hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Gamepad2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    Terminal Hacker
                  </h3>
                  <p className="text-muted-foreground">
                    Test your backend command skills in this typing game
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>
        </AnimatedSection>

        {/* Contact */}
        <AnimatedSection delay={200} className="text-center">
          <div className="bg-card border border-border rounded-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-4">Let&apos;s Connect</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Open to new opportunities and interesting projects.
            </p>

            <div className="flex justify-center gap-6 mb-6">
              <a
                href="https://github.com/elseny"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/elsen-yacub"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              {/* TODO: Implement Email */}
              {/* <a
                href="mailto:hello@example.com"
                className="p-3 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a> */}
            </div>

            {/* <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </a> */}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
