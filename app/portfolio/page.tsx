import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { AnimatedSection } from "@/components/animated-section"
import { getGitHubProjects, FEATURED_REPOS } from "@/lib/github"

export const revalidate = 3600 // Revalidate the page at most every hour

export default async function PortfolioPage() {
  const projects = await getGitHubProjects()

  const featuredProjects = projects
    .filter((p) => p.featured)
    .sort((a, b) => {
      const idxA = FEATURED_REPOS.indexOf(a.name.toLowerCase())
      const idxB = FEATURED_REPOS.indexOf(b.name.toLowerCase())
      return idxA - idxB
    })

  const otherProjects = projects
    .filter((p) => !p.featured)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

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
                delay={150 + index * 50}
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
                delay={250 + (index % 3) * 50}
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
