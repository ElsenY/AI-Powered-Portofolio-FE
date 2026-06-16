import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { AnimatedSection } from "@/components/animated-section"

const projects = [
  {
    title: "Distributed API Gateway",
    description: "High-performance API gateway handling 10M+ requests/day with rate limiting, caching, and authentication. Built with Go and deployed on Kubernetes.",
    tags: ["Go", "Kubernetes", "Redis", "gRPC"],
    metrics: "10M req/day • 99.99% uptime",
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    title: "Real-time Analytics Pipeline",
    description: "Stream processing pipeline for real-time user analytics. Processes and aggregates millions of events using Kafka and ClickHouse.",
    tags: ["Python", "Kafka", "ClickHouse", "Docker"],
    metrics: "5M events/hour",
    github: "https://github.com",
    featured: true,
  },
  {
    title: "Microservices E-commerce Platform",
    description: "Complete backend architecture for a multi-vendor marketplace with inventory management, order processing, and payment integration.",
    tags: ["Node.js", "PostgreSQL", "RabbitMQ", "AWS"],
    metrics: "50K orders/day",
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
  },
  {
    title: "Authentication Service",
    description: "OAuth 2.0 compliant authentication microservice with MFA support, session management, and role-based access control.",
    tags: ["Go", "PostgreSQL", "Redis", "JWT"],
    metrics: "1M active users",
    github: "https://github.com",
  },
  {
    title: "Container Orchestration Tool",
    description: "CLI tool for managing Docker containers in development environments with hot-reloading and service dependencies.",
    tags: ["Rust", "Docker", "CLI"],
    metrics: "5K+ downloads",
    github: "https://github.com",
  },
  {
    title: "Database Migration Framework",
    description: "Zero-downtime database migration framework supporting multiple database engines with rollback capabilities.",
    tags: ["Python", "PostgreSQL", "MySQL", "SQLite"],
    metrics: "Used by 100+ teams",
    github: "https://github.com",
  },
]

export default function PortfolioPage() {
  const featuredProjects = projects.filter(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <AnimatedSection className="mb-16">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-4">
            Selected Work
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Portfolio
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            A collection of backend systems, APIs, and infrastructure projects
            I&apos;ve built. Each project showcases different aspects of my expertise in
            building scalable, reliable systems.
          </p>
        </AnimatedSection>

        {/* Featured Projects */}
        <AnimatedSection delay={100} className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
          <div className="grid gap-6">
            {featuredProjects.map((project, index) => (
              <AnimatedSection
                key={project.title}
                delay={200 + index * 100}
                className="bg-card border border-border rounded-xl p-6 md:p-8 hover:border-primary/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-primary font-mono text-sm">{project.metrics}</p>
                  </div>

                  <div className="flex gap-3">
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
                        aria-label="View on GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </Link>
                    )}
                    {project.live && (
                      <Link
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-primary text-primary-foreground hover:opacity-90 rounded-lg transition-opacity"
                        aria-label="View live project"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </Link>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Other Projects */}
        <AnimatedSection delay={400}>
          <h2 className="text-2xl font-bold mb-8">Other Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <AnimatedSection
                key={project.title}
                delay={500 + index * 100}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors group"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <div className="flex gap-2">
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="View on GitHub"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    )}
                    {project.live && (
                      <Link
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="View live project"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-primary font-mono text-xs">{project.metrics}</p>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={700} className="mt-16 text-center">
          <div className="bg-card border border-border rounded-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-4">Interested in working together?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              I&apos;m always open to discussing new projects and opportunities
              to build something great.
            </p>
            <a
              href="mailto:elsenyacub@yahoo.co.id"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Get in touch
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
