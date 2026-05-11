import { Database, Server, Cloud, Code, Lock, Gauge, Terminal, Layers } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedSkillBar } from "@/components/animated-skill-bar"

const skillCategories = [
  {
    title: "Languages",
    icon: Code,
    skills: [
      { name: "Python", level: 95 },
      { name: "Go", level: 90 },
      { name: "Node.js/TypeScript", level: 92 },
      { name: "Rust", level: 70 },
      { name: "Java", level: 80 },
      { name: "SQL", level: 95 },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: 95 },
      { name: "MongoDB", level: 88 },
      { name: "Redis", level: 92 },
      { name: "Elasticsearch", level: 80 },
      { name: "DynamoDB", level: 75 },
      { name: "Cassandra", level: 70 },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      { name: "AWS", level: 90 },
      { name: "Docker", level: 95 },
      { name: "Kubernetes", level: 85 },
      { name: "Terraform", level: 80 },
      { name: "CI/CD", level: 90 },
      { name: "Linux/Unix", level: 92 },
    ],
  },
  {
    title: "API & Architecture",
    icon: Server,
    skills: [
      { name: "REST APIs", level: 95 },
      { name: "GraphQL", level: 85 },
      { name: "gRPC", level: 82 },
      { name: "Microservices", level: 90 },
      { name: "Event-Driven", level: 88 },
      { name: "System Design", level: 90 },
    ],
  },
]

const additionalSkills = [
  { name: "Message Queues", description: "Kafka, RabbitMQ, SQS", icon: Layers },
  { name: "Security", description: "OAuth, JWT, OWASP", icon: Lock },
  { name: "Performance", description: "Profiling, Caching, Load Balancing", icon: Gauge },
  { name: "CLI Tools", description: "Custom CLI development", icon: Terminal },
]

export default function SkillsPage() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <AnimatedSection className="mb-16">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-4">
            Technical Expertise
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Skills & Technologies
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Over 8 years of hands-on experience building and scaling backend systems. 
            Here&apos;s a comprehensive overview of my technical toolkit.
          </p>
        </AnimatedSection>

        {/* Main Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, catIndex) => (
            <AnimatedSection
              key={category.title}
              delay={100 + catIndex * 100}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">{category.title}</h2>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <AnimatedSkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={200 + catIndex * 100 + skillIndex * 50}
                  />
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Additional Skills */}
        <AnimatedSection delay={500} className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Additional Expertise</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {additionalSkills.map((skill, index) => (
              <AnimatedSection
                key={skill.name}
                delay={600 + index * 100}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors"
              >
                <div className="p-2 bg-primary/10 rounded-lg w-fit mb-4">
                  <skill.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{skill.name}</h3>
                <p className="text-sm text-muted-foreground">{skill.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Certifications */}
        <AnimatedSection delay={800}>
          <h2 className="text-2xl font-bold mb-8">Certifications</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "AWS Solutions Architect", org: "Amazon Web Services", year: "2023" },
              { name: "Kubernetes Administrator", org: "CNCF", year: "2022" },
              { name: "Professional Cloud Architect", org: "Google Cloud", year: "2021" },
            ].map((cert, index) => (
              <AnimatedSection
                key={cert.name}
                delay={900 + index * 100}
                className="bg-card border border-border rounded-xl p-5"
              >
                <p className="font-semibold mb-1">{cert.name}</p>
                <p className="text-sm text-muted-foreground">{cert.org}</p>
                <p className="text-xs text-primary mt-2 font-mono">{cert.year}</p>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
