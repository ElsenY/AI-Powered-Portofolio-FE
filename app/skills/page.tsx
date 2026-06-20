import { Code } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { SkillCategorySection } from "@/components/skill-category-section";
import { skillCategories } from "@/lib/skills-data";

export default function SkillsPage() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="mb-16">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-4">
            Technical Expertise
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Skills</h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Technologies and tools I use across backend, frontend, databases,
            CI/CD, and day-to-day development.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-10 pb-6 border-b border-border">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Skills</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {skillCategories.map((category, index) => (
                <AnimatedSection
                  key={category.title}
                  delay={50 + index * 30}
                  className={
                    category.title === "Other Tools"
                      ? "md:col-span-2"
                      : undefined
                  }
                  rootMargin="100px"
                >
                  <SkillCategorySection category={category} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
