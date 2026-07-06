export interface Project {
  name: string;
  title: string;
  description: string;
  tags: string[];
  metrics: string;
  github: string;
  live?: string;
  featured: boolean;
  updatedAt: string;
}

export const FEATURED_REPOS = [
  "multistream-chat-aggregator",
  "ai-powered-portofolio-fe",
  "dexen-backend",
  "reconciliation-service",
  "flearch",
];

const REPO_DESCRIPTIONS: Record<string, string> = {
  "multistream-chat-aggregator": "High-performance aggregator that consolidates real-time chat streams from multiple streaming platforms into a single unified feed.",
  "ai-powered-portofolio-fe": "The frontend for this AI-powered portfolio and resume website, featuring interactive components, animations, and clean modern design.",
  "dexen-backend": "Scalable backend services for the Dexen platform, handling authentication, data persistence, and core business logic.",
  "dexen-frontend": "Modern, responsive user interface for the Dexen platform, built with React and optimized for performance.",
  "reconciliation-service": "Financial transaction reconciliation microservice designed in Go, processing transaction logs to identify and resolve discrepancies.",
  "flearch": "A flight search aggregation system that queries multiple airlines and booking APIs to find the best routes and prices in real-time.",
  "book_grpc_rest": "Book catalog and management service demonstrating dual-protocol support with gRPC and REST APIs in Go.",
  "movie": "A movie cataloging and discovery API built with Go, offering rich search, filtering, and rating features.",
  "loan": "A PHP-based loan management system handling application processing, interest calculation, and repayment tracking.",
  "bingo-game": "An interactive, multiplayer online Bingo game built with TypeScript, featuring real-time state synchronization.",
};

const FALLBACK_PROJECTS: Project[] = [
  {
    name: "multistream-chat-aggregator",
    title: "Multistream Chat Aggregator",
    description: "High-performance aggregator that consolidates real-time chat streams from multiple streaming platforms into a single unified feed.",
    tags: ["TypeScript", "Node.js", "WebSockets"],
    metrics: "Updated Jul 2026",
    github: "https://github.com/ElsenY/multistream-chat-aggregator",
    featured: true,
    updatedAt: "2026-07-06T17:35:43Z"
  },
  {
    name: "AI-Powered-Portofolio-FE",
    title: "AI Powered Portofolio FE",
    description: "The frontend for this AI-powered portfolio and resume website, featuring interactive components, animations, and clean modern design.",
    tags: ["TypeScript", "Next.js", "Tailwind CSS"],
    metrics: "Updated Jul 2026",
    github: "https://github.com/ElsenY/AI-Powered-Portofolio-FE",
    featured: true,
    updatedAt: "2026-07-06T17:35:43Z"
  },
  {
    name: "Dexen-Backend",
    title: "Dexen Backend",
    description: "Scalable backend services for the Dexen platform, handling authentication, data persistence, and core business logic.",
    tags: ["TypeScript", "Express", "Node.js"],
    metrics: "Updated Jun 2026",
    github: "https://github.com/ElsenY/Dexen-Backend",
    featured: true,
    updatedAt: "2026-06-15T12:00:00Z"
  },
  {
    name: "Dexen-Frontend",
    title: "Dexen Frontend",
    description: "Modern, responsive user interface for the Dexen platform, built with React and optimized for performance.",
    tags: ["TypeScript", "React", "CSS"],
    metrics: "Updated Jun 2026",
    github: "https://github.com/ElsenY/Dexen-Frontend",
    featured: false,
    updatedAt: "2026-06-15T12:00:00Z"
  },
  {
    name: "Reconciliation-Service",
    title: "Reconciliation Service",
    description: "Financial transaction reconciliation microservice designed in Go, processing transaction logs to identify and resolve discrepancies.",
    tags: ["Go", "Microservices", "Finance"],
    metrics: "Updated May 2026",
    github: "https://github.com/ElsenY/Reconciliation-Service",
    featured: true,
    updatedAt: "2026-05-10T12:00:00Z"
  },
  {
    name: "Flearch",
    title: "Flearch",
    description: "A flight search aggregation system that queries multiple airlines and booking APIs to find the best routes and prices in real-time.",
    tags: ["Go", "API Integration", "Caching"],
    metrics: "Updated Apr 2026",
    github: "https://github.com/ElsenY/Flearch",
    featured: true,
    updatedAt: "2026-04-05T12:00:00Z"
  },
  {
    name: "book_grpc_rest",
    title: "Book gRPC REST",
    description: "Book catalog and management service demonstrating dual-protocol support with gRPC and REST APIs in Go.",
    tags: ["Go", "gRPC", "REST API"],
    metrics: "Updated Mar 2026",
    github: "https://github.com/ElsenY/book_grpc_rest",
    featured: false,
    updatedAt: "2026-03-20T12:00:00Z"
  },
  {
    name: "Movie",
    title: "Movie",
    description: "A movie cataloging and discovery API built with Go, offering rich search, filtering, and rating features.",
    tags: ["Go", "REST API", "Database"],
    metrics: "Updated Feb 2026",
    github: "https://github.com/ElsenY/Movie",
    featured: false,
    updatedAt: "2026-02-15T12:00:00Z"
  },
  {
    name: "Loan",
    title: "Loan",
    description: "A PHP-based loan management system handling application processing, interest calculation, and repayment tracking.",
    tags: ["PHP", "MySQL", "Web App"],
    metrics: "Updated Jan 2026",
    github: "https://github.com/ElsenY/Loan",
    featured: false,
    updatedAt: "2026-01-10T12:00:00Z"
  },
  {
    name: "bingo-game",
    title: "Bingo Game",
    description: "An interactive, multiplayer online Bingo game built with TypeScript, featuring real-time state synchronization.",
    tags: ["TypeScript", "HTML5", "Game Dev"],
    metrics: "Updated Dec 2025",
    github: "https://github.com/ElsenY/bingo-game",
    featured: false,
    updatedAt: "2025-12-01T12:00:00Z"
  }
];

function formatTitle(name: string): string {
  // Replace suffix -FE with " Frontend" and -BE with " Backend"
  let formatted = name.replace(/-FE$/i, " Frontend").replace(/-BE$/i, " Backend");
  return formatted
    .split(/[-_]/)
    .map((word) => {
      const lower = word.toLowerCase();
      if (lower === "fe") return "Frontend";
      if (lower === "be") return "Backend";
      if (lower === "grpc") return "gRPC";
      if (lower === "rest") return "REST";
      if (lower === "api") return "API";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function getTags(repo: any): string[] {
  const tagsSet = new Set<string>();
  if (repo.language) {
    tagsSet.add(repo.language);
  }
  if (repo.topics && Array.isArray(repo.topics)) {
    repo.topics.forEach((topic: string) => {
      const lower = topic.toLowerCase();
      const mapped = lower === "go" ? "Go" :
                     lower === "mongodb" ? "MongoDB" :
                     lower === "nodejs" ? "Node.js" :
                     lower === "react" ? "React" :
                     topic.charAt(0).toUpperCase() + topic.slice(1);
      tagsSet.add(mapped);
    });
  }
  if (tagsSet.size === 0) {
    tagsSet.add("Project");
  }
  return Array.from(tagsSet);
}

function getMetrics(repo: any): string {
  const parts: string[] = [];
  if (repo.stargazers_count > 0) {
    parts.push(`⭐ ${repo.stargazers_count}`);
  }
  if (repo.forks_count > 0) {
    parts.push(`🍴 ${repo.forks_count}`);
  }
  
  const date = new Date(repo.updated_at);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  parts.push(`Updated ${formattedDate}`);
  
  return parts.join(" • ");
}

export async function getGitHubProjects(): Promise<Project[]> {
  try {
    const res = await fetch("https://api.github.com/users/ElsenY/repos?sort=updated&per_page=100", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "ElsenY-Portfolio",
      },
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
    });

    if (!res.ok) {
      console.error(`GitHub API returned status ${res.status}`);
      return FALLBACK_PROJECTS;
    }

    const repos = await res.json();
    if (!Array.isArray(repos)) {
      console.error("GitHub API response is not an array");
      return FALLBACK_PROJECTS;
    }

    return repos.map((repo: any) => {
      const name = repo.name;
      const title = formatTitle(name);
      
      const descKey = name.toLowerCase();
      const description = REPO_DESCRIPTIONS[descKey] || repo.description || "A public repository on GitHub.";
      
      const tags = getTags(repo);
      const metrics = getMetrics(repo);
      const featured = FEATURED_REPOS.includes(descKey);

      return {
        name,
        title,
        description,
        tags,
        metrics,
        github: repo.html_url,
        live: repo.homepage || undefined,
        featured,
        updatedAt: repo.updated_at,
      };
    });
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    return FALLBACK_PROJECTS;
  }
}
