export type Experience = {
  title: string;
  company: string;
  period: string;
  link: string;
  intro: string;
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
    intro: "Bank INA is a Bank owned by one of the biggest conglomerate group in Indonesia (Salim group). As a backend engineer in the Digital division, I developed Bank INA Digital Banking system, including core system such as VA Engine, Fraud Detection System, etc",
    description: [
      "Developed new VA Engine to handle VA transaction from client to partner (3rd party clients like payment gateway, e-commerce, etc)",
      "Revamped Bank INA Back-end repositories from using DDD Architecture to Hexagonal Architecture to make the codebase easier to scale and maintain",
    ],
  },
  {
    title: "Middle Backend Engineer",
    company: "Synapsis.id",
    period: "Apr 2025 – Apr 2026",
    link: "https://synapsis.id",
    intro: `Synapsis is a SaaS company and also the exclusive IT consultant for one of the Top 5 mining contractor in Indonesia, as a Backend
    Engineer here, I am responsible in developing REST APIs and MQTT services for IoT Web Application using Go, gRPC, Kafka,
    PostgreSQL, MongoDB, QuestDB, WebSocket, Redis, Grafana`,
    description: [
      `Refactored and fixed inefficient services by implementing efficient query and concurrency cleanup strategy, which reduced
memory usage by 97.4 % and eliminated service crashing problem`,
      `Identified and fixed a long - existing, critical intermittent bug that caused most services not gracefully shut down which in turn fixed
occurring data inconsistency issue`,
      `Developed highly scalable Sensor Health Check and Automation system that is implemented to at least 12,000 + sensors at the
time of creation.This system improves productivity significantly by eliminating Firmware team's manual sensor configuration and
health checking`,
      `Initiated database - level checking technique using Generated Column to safely execute DML Operations in tables with soft delete
capability, resulting in higher data integrity since the checking was only implemented on application level`,
      `Designed and developed the new Internal Solutions App from the ground up, this app is used to centralize opportunity progress,
    resources needed, and documents data which were very scattered and not documented well`,
      `Successfully migrated 10M+ row data from MongoDB to PostgreSQL for "system modernization" initiative`
    ],
  },
  {
    title: "Backend Engineer",
    company: "TikTok Tokopedia",
    period: "Mar 2022 – Aug 2024",
    link: "https://shop-id.tokopedia.com/",
    intro: `TikTok Tokopedia is one of the Largest E-Commerce in Indonesia, having ~140 Million Monthly Active Users, as a Backend
Engineer here, I am responsible in developing database related Automations and maintaining Database & Redis day-to-day activity
using : Go, Ansible, Redis, REST API, PostgreSQL, MySQL, Jenkins, Grafana, NewRelic`,
    description: [
      `Contributed in Redis downscaling initiative, which saved Tokopedia around ~$7,506 / month in Q4 22.`,
      `Developed "Postgres Request Automation” to automate DDL Requests across all Tokopedia's database which contributes
significantly in engineer's productivity since DDL Requests were manually checked and executed`,
      `Developed “Data Deletion Framework” to automate the deletion of old data in PostgreSQL Database which contributes to the
engineer's productivity because before it was a tedious, semi automated task`,
      `Developed "Groot" an automation that collects and simplifies metrics collected from system and send it to monitoring apps such
as Grafana or New Relic which improves engineer's productivity by not needing to implement separate metrics collector`,
      `Migrated existing automations to ByteHouse environment (cloud service owned by ByteDance)`
    ],
  },
  {
    title: "Software Engineer",
    company: "Itemku.com",
    period: "Mar 2021 – Apr 2022",
    link: "https://itemku.com",
    intro: `Itemku is the Largest C2C digital goods focused E-Commerce with 6.5 Millions Monthly Visits, as a Software Engineer here, I
developed the Frontend and Backend of itemku.com using Next JS and Express JS and making test automations with Cypress`,
    description: [
      `Developed credit card payment system which enables overseas users to perform transaction at Itemku.com `,
      `Created integration and end-to-end testing across Itemku codebase`,
      `Developed the backend and frontend of itemku seller page`
    ],
  },
  {
    title: "Frontend Engineer",
    company: "Astra Graphia Information Technology",
    period: "Mar 2020 – Mar 2021",
    link: "https://www.agit.co.id/",
    intro: `Astra Graphia Information Technology (AGIT) is an IT Company under one of the Largest conglomeration group (Astra), as a
Frontend Engineer here, I am responsible in developing a new Web Application while maintaining the old version using
JavaScript, ReactJS, AngularJS, Material UI, and Redux`,
    description: [
      `Initiated the creation of auto-scaling dashboard, which automatically scale and fill a new item that is created to the dashboard`,
      `Developed a new dashboard system for "UI Modernization" initiative, while also maintained the old dashboard system`
    ],
  },
];

export const education = {
  degree: "Bachelor of Computer Science",
  school: "Bina Nusantara University",
  gpa: "3.66/4.00"
};
