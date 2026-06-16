import type { SkillCategory } from "@/lib/skills-data";

const chipClassName =
  "rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:cursor-default hover:border-primary hover:shadow-[0_0_12px_hsl(var(--primary)/0.75)]";

type SkillCategorySectionProps = {
  category: SkillCategory;
  compact?: boolean;
};

export function SkillCategorySection({
  category,
  compact = false,
}: SkillCategorySectionProps) {
  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      <h3
        className={
          compact
            ? "text-base font-semibold text-primary"
            : "text-lg font-semibold"
        }
      >
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span key={skill} className={chipClassName}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
