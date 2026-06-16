export type Experience = {
  title: string;
  company: string;
  period: string;
  link: string;
  current?: boolean;
  description?: string[];
};

export const experiences: Experience[] = [
  {
    title: "Backend Developer",
    company: "Bank INA",
    period: "May 2026 - Now",
    link: "https://bankina.co.id/",
    current: true,
    description: [
      "Building critical systems for BINA Digital apps, such as Virtual Account system, Fraud detection system, and more.",
    ],
  },
  {
    title: "Middle Backend Engineer",
    company: "Synapsis.id",
    period: "Apr 2025 – Apr 2026",
    link: "https://synapsis.id",
    description: [
      "Developed core features for Nearon, an IoT sensor monitoring platform.",
      "Built sensor automations, healthcheck systems, and backend APIs.",
    ],
  },
  {
    title: "Backend Engineer",
    company: "TikTok Tokopedia",
    period: "Mar 2022 – Aug 2024",
    link: "https://shop-id.tokopedia.com/",
    description: [
      "Maintained day-to-day operations for Tokopedia's databases and Redis.",
      "Developed automations to improve efficiency for the DB and Redis team.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Itemku.com",
    period: "Mar 2021 – Apr 2022",
    link: "https://itemku.com",
    description: [
      "Worked on payment and transaction services.",
      "Developed credit card payment and transaction systems.",
    ],
  },
  {
    title: "Frontend Engineer",
    company: "Astra Graphia Information Technology",
    period: "Mar 2020 – Mar 2021",
    link: "https://www.agit.co.id/",
    description: [
      "Developed the frontend for new modern client applications.",
      "Maintained legacy applications.",
    ],
  },
];

export const education = {
  degree: "Bachelor of Computer Science",
  school: "Bina Nusantara University",
};
