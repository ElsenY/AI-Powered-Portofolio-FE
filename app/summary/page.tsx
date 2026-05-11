import Link from "next/link";
import {
  ArrowRight,
  Code,
  Database,
  Server,
  Cloud,
  Briefcase,
  Gamepad2,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { AnimatedSkillBar } from "@/components/animated-skill-bar";

const topSkillsLeft = [
  { name: "Go" },
  { name: "Redis" },
  { name: "PostgreSQL" },
  { name: "Docker" },
];

const topSkillsRight = [
  { name: "Node.js/Typescript" },
  { name: "Kafka" },
  { name: "PostgreSQL" },
  { name: "Docker" },
];

const featuredProjects = [
  {
    title: "Distributed API Gateway",
    description: "High-performance gateway handling 10M+ requests/day",
    tags: ["Go", "Kubernetes", "Redis"],
  },
  {
    title: "Real-time Analytics Pipeline",
    description: "Stream processing for 5M events/hour",
    tags: ["Python", "Kafka", "ClickHouse"],
  },
  {
    title: "Microservices E-commerce",
    description: "Multi-vendor marketplace handling 50K orders/day",
    tags: ["Node.js", "PostgreSQL", "RabbitMQ"],
  },
];

const careerHighlights = [
  {
    title: "Middle Backend Engineer",
    company: "Synapsis.id",
    period: "2024-2025",
    link: "https://synapsis.id",
  },
  {
    title: "Backend Engineer",
    company: "TikTok Tokopedia",
    period: "2022 - 2024",
    link: "https://shop-id.tokopedia.com/",
  },
  {
    title: "Software Engineer",
    company: "Itemku.com",
    period: "2021 - 2022",
    link: "https://itemku.com",
  },
];

export default function SummaryPage() {
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
                delay={150 + index * 100}
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

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Skills */}
          <AnimatedSection delay={200}>
            <div className="bg-card border border-border rounded-xl p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Top Skills</h2>
                </div>
                <Link
                  href="/skills"
                  className="text-primary hover:underline text-sm flex items-center gap-1"
                >
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  {topSkillsLeft.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center hover:cursor-pointer justify-between rounded-lg border border-border bg-muted/30 px-4 py-3 transition-all duration-300 hover:border-primary  hover:shadow-[0_0_12px_hsl(var(--primary)/0.75)]"
                    >
                      <p className="font-medium text-foreground">
                        {skill.name}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {topSkillsRight.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center hover:cursor-pointer justify-between rounded-lg border  border-border bg-muted/30 px-4 py-3 transition-all duration-300 hover:border-primary hover:shadow-[0_0_12px_hsl(var(--primary)/0.75)]"
                    >
                      <p className="font-medium text-foreground">
                        {skill.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Database className="h-5 w-5 text-primary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">6 Databases</p>
                  </div>
                  <div>
                    <Cloud className="h-5 w-5 text-primary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">AWS/GCP</p>
                  </div>
                  <div>
                    <Server className="h-5 w-5 text-primary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">
                      Microservices
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Experience */}
          <AnimatedSection delay={300}>
            <div className="bg-card border border-border rounded-xl p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Career</h2>
                </div>
                <Link
                  href="/experience"
                  className="text-primary hover:underline text-sm flex items-center gap-1"
                >
                  View full <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="space-y-4">
                {careerHighlights.map((job, index) => (
                  <AnimatedSection
                    key={job.title}
                    delay={400 + index * 100}
                    direction="left"
                    className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                  >
                    <div
                      className={`mt-1 h-3 w-3 rounded-full ${index === 0 ? "bg-primary" : "bg-muted-foreground/30"}`}
                    />
                    <div className="flex-1">
                      <a
                        href={job.link}
                        className="text-md text-primary font-bold hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                      >
                        {job.company}
                      </a>
                      <p className="text-sm">{job.title}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-1">
                        {job.period}
                      </p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              <AnimatedSection
                delay={700}
                className="mt-6 pt-6 border-t border-border text-center"
              >
                <p className="text-sm text-primary mb-2">
                  Bachelor of Computer Science
                </p>
                <p className="text-xs text-muted-foreground">
                  Bina Nusantara University
                </p>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>

        {/* Featured Projects */}
        <AnimatedSection delay={400} className="mb-20">
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
              <AnimatedSection
                key={project.title}
                delay={500 + index * 100}
                direction="up"
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
              >
                <h3 className="font-semibold mb-2">{project.title}</h3>
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
            ))}
          </div>
        </AnimatedSection>

        {/* Game Teaser */}
        <AnimatedSection delay={600} className="mb-20">
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
        <AnimatedSection delay={700} className="text-center">
          <div className="bg-card border border-border rounded-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-4">Let&apos;s Connect</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Open to new opportunities and interesting projects.
            </p>

            <div className="flex justify-center gap-6 mb-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@example.com"
                className="p-3 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>

            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
