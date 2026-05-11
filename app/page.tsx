import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { TerminalAnimation } from "@/components/terminal-animation";
import { AnimatedSection } from "@/components/animated-section";

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col justify-center px-6">
        <div className="mx-auto max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <AnimatedSection delay={0}>
                  <p className="text-primary font-mono text-sm tracking-wider uppercase">
                    Software Engineer
                  </p>
                </AnimatedSection>
                <AnimatedSection delay={100}>
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance">
                    Building Efficient and Scalable systems that actually matter
                  </h1>
                </AnimatedSection>
                <AnimatedSection delay={200}>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                    I specialize in designing and implementing robust backend
                    systems, RESTful APIs, microservices, automations, and
                    database systems that handle millions of requests.
                  </p>
                </AnimatedSection>
              </div>

              <AnimatedSection delay={300}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    View Projects
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/experience"
                    className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
                  >
                    My Experience
                  </Link>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <div className="flex items-center gap-6 pt-4">
                  <a
                    href="https://github.com/elseny"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href="https://linkedin.com/in/elsenyacub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="mailto:elsenyacub@yahoo.co.id"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-6 w-6" />
                  </a>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection
              delay={200}
              direction="right"
              className="hidden lg:block"
            >
              <TerminalAnimation />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 px-6 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "6+", label: "Years Experience" },
              { value: "50+", label: "Tech stacks used" },
              { value: "20+", label: "AI Tools utilized" },
              { value: "30+", label: "Complex Projects Completed" },
            ].map((stat, index) => (
              <AnimatedSection
                key={stat.label}
                delay={index * 100}
                className="text-center"
              >
                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Preview */}
      <section className="py-20 px-6 bg-card">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Core Technologies</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Expert-level proficiency in modern technologies
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Go",
              "Node.js",
              "Kafka",
              "Redis",
              "PostgreSQL",
              "gRPC",
              "Next",
              "React",
              "Ansible",
              "Jenkins",
              "Docker",
              "MongoDB",
            ].map((tech, index) => (
              <AnimatedSection key={tech} delay={index * 50}>
                <div className="bg-secondary/50 border border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                  <span className="font-mono text-sm">{tech}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={600} className="text-center mt-12">
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              View all skills
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="mx-auto max-w-6xl text-center text-muted-foreground text-sm">
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
