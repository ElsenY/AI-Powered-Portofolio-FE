export type SkillCategory = {
  title: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend",
    skills: [
      "Golang",
      "Java",
      "PHP",
      "Node.js",
      "Spring Boot",
      "GoFiber",
      "PHP Slim",
      "Express.js",
      "Kafka",
      "Redis",
      "HTTP",
      "gRPC",
      "MQTT",
      "WebSocket",
    ],
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "MySQL", "QuestDB", "MongoDB", "Supabase"],
  },
  {
    title: "Frontend",
    skills: [
      "Next.js",
      "React",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Angular",
      "Redux",
      "WebSocket",
      "Shadcn/ui",
      "Material UI",
      "Bootstrap",
    ],
  },
  {
    title: "CI/CD",
    skills: [
      "Ansible",
      "Jenkins",
      "Git",
      "Docker",
      "Vercel",
      "Portainer",
    ],
  },
  {
    title: "Other Tools",
    skills: [
      "DBeaver",
      "PgAdmin",
      "Postman",
      "Bruno",
      "Grafana",
      "New Relic",
      "Upstash",
      "Cypress",
      "Jest",
    ],
  },
];
