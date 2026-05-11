import { Briefcase, GraduationCap } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

const experiences = [
  {
    title: "Senior Backend Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    period: "2022 - Present",
    current: true,
    description: [
      "Lead backend architecture for a platform serving 10M+ users",
      "Designed and implemented microservices reducing latency by 40%",
      "Mentored team of 5 engineers on best practices and system design",
      "Migrated legacy monolith to Kubernetes-based microservices architecture",
    ],
    technologies: ["Go", "Kubernetes", "PostgreSQL", "gRPC", "Redis"],
  },
  {
    title: "Backend Engineer",
    company: "DataFlow Systems",
    location: "New York, NY",
    period: "2019 - 2022",
    description: [
      "Built real-time data processing pipelines handling 5M events/hour",
      "Implemented event-driven architecture using Apache Kafka",
      "Optimized database queries resulting in 60% performance improvement",
      "Developed internal CLI tools adopted by 200+ developers",
    ],
    technologies: ["Python", "Kafka", "AWS", "Docker", "MongoDB"],
  },
  {
    title: "Software Engineer",
    company: "StartupXYZ",
    location: "Austin, TX",
    period: "2017 - 2019",
    description: [
      "Full-stack development with focus on backend API development",
      "Built RESTful APIs serving mobile and web applications",
      "Implemented OAuth 2.0 authentication system",
      "Set up CI/CD pipelines and automated testing infrastructure",
    ],
    technologies: ["Node.js", "Express", "PostgreSQL", "AWS", "Docker"],
  },
  {
    title: "Junior Developer",
    company: "WebAgency Co.",
    location: "Remote",
    period: "2016 - 2017",
    description: [
      "Developed backend services for client web applications",
      "Maintained and optimized existing database structures",
      "Collaborated with frontend team on API specifications",
    ],
    technologies: ["Python", "Django", "MySQL", "Linux"],
  },
]

const education = [
  {
    degree: "B.S. Computer Science",
    school: "University of Technology",
    period: "2012 - 2016",
    highlights: ["Graduated with Honors", "Focus on Distributed Systems"],
  },
]

export default function ExperiencePage() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <AnimatedSection className="mb-16">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-4">
            Career Journey
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Experience
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            8+ years of experience building backend systems at startups and 
            enterprise companies. Here&apos;s my professional journey.
          </p>
        </AnimatedSection>

        {/* Work Experience */}
        <AnimatedSection delay={100} className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Work Experience</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-3 bottom-3 w-px bg-border" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <AnimatedSection key={index} delay={200 + index * 150} direction="left" className="relative pl-8">
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-2 h-4 w-4 rounded-full border-2 ${
                    exp.current 
                      ? "bg-primary border-primary" 
                      : "bg-background border-border"
                  }`} />

                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{exp.title}</h3>
                        <p className="text-muted-foreground">
                          {exp.company} · {exp.location}
                        </p>
                      </div>
                      <span className={`font-mono text-sm ${
                        exp.current ? "text-primary" : "text-muted-foreground"
                      }`}>
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-muted-foreground text-sm flex gap-2">
                          <span className="text-primary mt-1">›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Education */}
        <AnimatedSection delay={700}>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/10 rounded-lg">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Education</h2>
          </div>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <AnimatedSection
                key={index}
                delay={800 + index * 100}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
                    <p className="text-muted-foreground">{edu.school}</p>
                  </div>
                  <span className="font-mono text-sm text-muted-foreground">
                    {edu.period}
                  </span>
                </div>

                <ul className="space-y-1">
                  {edu.highlights.map((highlight, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex gap-2">
                      <span className="text-primary">›</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Download Resume CTA */}
        <AnimatedSection delay={900} className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
            Download Resume (PDF)
          </button>
        </AnimatedSection>
      </div>
    </div>
  )
}
