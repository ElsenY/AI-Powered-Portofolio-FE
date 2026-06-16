import { Briefcase, GraduationCap } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { education, experiences } from "@/lib/experience-data";

export default function ExperiencePage() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection className="mb-16">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-4">
            Career Journey
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Experience</h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Professional roles building backend systems, databases, and
            full-stack products at startups and enterprise teams.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100} className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Work Experience</h2>
          </div>

          <div className="relative">
            <div className="absolute left-[7px] top-3 bottom-3 w-px bg-border" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <AnimatedSection
                  key={`${exp.company}-${exp.period}`}
                  delay={200 + index * 150}
                  direction="left"
                  className="relative pl-8"
                >
                  <div
                    className={`absolute left-0 top-2 h-4 w-4 rounded-full border-2 ${
                      exp.current
                        ? "bg-primary border-primary"
                        : "bg-background border-border"
                    }`}
                  />

                  <div className="bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:border-primary hover:shadow-[0_0_12px_hsl(var(--primary)/0.75)]">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{exp.title}</h3>
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary font-medium hover:underline"
                        >
                          {exp.company}
                        </a>
                      </div>
                      <span
                        className={`font-mono text-sm ${
                          exp.current
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {exp.period}
                      </span>
                    </div>

                    {exp.description && exp.description.length > 0 && (
                      <ul className="space-y-2">
                        {exp.description.map((item) => (
                          <li
                            key={item}
                            className="text-muted-foreground text-sm flex gap-2"
                          >
                            <span className="text-primary mt-1">›</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={700}>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/10 rounded-lg">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Education</h2>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold">{education.degree}</h3>
            <p className="text-muted-foreground">{education.school}</p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
