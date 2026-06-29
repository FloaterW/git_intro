export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  status: "completed" | "in-progress" | "coursework";
  category: "full-stack" | "systems" | "data" | "frontend";
  summary: string;
  problem: string;
  role: string;
  stack: string[];
  highlights: string[];
  technicalDetails: string;
  lessons: string;
  improvements: string;
  links: {
    github?: string;
    live?: string;
  };
  image?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "video-platform",
    title: "Video Sharing Platform",
    subtitle: "Full-stack YouTube-style application",
    year: "2025", // TODO: Confirm year
    status: "completed",
    category: "full-stack",
    summary:
      "A video sharing platform with upload, transcoding, user channels, and a recommendation feed. Built to understand the full lifecycle of media-heavy web applications.",
    problem:
      "Wanted to understand how platforms like YouTube handle video upload, processing, storage, and delivery at a practical level — not just the frontend.",
    role: "Sole developer — designed the architecture, built the frontend and backend, and handled video processing pipeline.",
    stack: ["React", "Node.js", "PostgreSQL", "AWS S3", "FFmpeg"], // TODO: Confirm actual stack
    highlights: [
      "Video upload with client-side chunking and progress tracking",
      "Server-side transcoding to multiple resolutions",
      "Channel pages, subscriptions, and a basic recommendation feed",
      "Responsive video player with adaptive streaming",
    ],
    technicalDetails:
      "The trickiest part was the transcoding pipeline. Videos are uploaded in chunks to avoid timeout issues, then queued for processing. Each video gets transcoded into multiple resolutions, with the system tracking progress and making lower-quality versions available first while higher-quality encodes finish.", // TODO: Expand with actual implementation details
    lessons:
      "Learned how much complexity hides behind simple-looking media features. Handling upload failures gracefully, managing storage costs, and building a responsive player that works across devices each turned out to be substantial sub-problems.",
    improvements:
      "Would add proper CDN integration for video delivery, implement more sophisticated recommendation logic, and add comment threading.", // TODO: Update with actual planned improvements
    links: {
      // TODO: Add GitHub URL
      // TODO: Add live demo URL if deployed
    },
    // TODO: Add screenshot to /public/images/projects/video-platform.png
    featured: true,
  },
  {
    slug: "banking-app",
    title: "Banking Application",
    subtitle: "Secure transaction processing system",
    year: "2025", // TODO: Confirm year
    status: "completed",
    category: "full-stack",
    summary:
      "A banking application with account management, fund transfers, transaction history, and role-based access. Focused on data integrity and secure state management.",
    problem:
      "Needed a project that forced careful thinking about data consistency, authentication, and transactional operations where correctness matters more than speed.",
    role: "Full-stack development with emphasis on backend transaction logic and security.", // TODO: Specify if team project and role
    stack: ["Java", "Spring", "PostgreSQL", "React"], // TODO: Confirm actual stack
    highlights: [
      "ACID-compliant transaction processing with proper isolation levels",
      "Role-based access control for customers and administrators",
      "Real-time balance updates with optimistic locking",
      "Transaction history with filtering and export",
    ],
    technicalDetails:
      "The core challenge was ensuring transaction correctness. Implemented serializable isolation for transfers between accounts, with retry logic for serialization failures. Used optimistic locking for balance reads to prevent dirty reads without excessive lock contention.", // TODO: Expand with actual details
    lessons:
      "Solidified understanding of database transaction isolation levels and why they matter. Also learned how much UX work goes into making financial data feel trustworthy — loading states, confirmation flows, and clear error messages.",
    improvements:
      "Would add proper audit logging, implement two-factor authentication, and build a more sophisticated fraud detection pipeline.", // TODO: Update
    links: {
      // TODO: Add GitHub URL
    },
    // TODO: Add screenshot to /public/images/projects/banking-app.png
    featured: true,
  },
  {
    slug: "chess-engine",
    title: "Chess Engine",
    subtitle: "Algorithmic game engine with search and evaluation",
    year: "2024", // TODO: Confirm year
    status: "completed",
    category: "systems",
    summary:
      "A chess engine with move generation, position evaluation, and search. Built to apply algorithms and data structures to a problem with real depth.",
    problem:
      "Wanted a systems-level project that required careful optimization and algorithmic thinking — not just CRUD.",
    role: "Sole developer.", // TODO: Specify if coursework or personal
    stack: ["C++", "Python"], // TODO: Confirm actual stack
    highlights: [
      "Legal move generation with special moves (castling, en passant, promotion)",
      "Minimax search with alpha-beta pruning",
      "Position evaluation using material, piece-square tables, and basic positional factors",
      "Interactive CLI and optional GUI for playing against the engine",
    ],
    technicalDetails:
      "Move generation uses bitboards for performance-critical operations. The search implements iterative deepening with alpha-beta pruning and move ordering to maximize cutoffs. Evaluation considers material balance, piece activity, king safety, and pawn structure.", // TODO: Expand with actual details
    lessons:
      "Taught me how much performance matters when your search tree branches exponentially. Small improvements in move ordering or evaluation speed compound across millions of nodes.",
    improvements:
      "Would add an opening book, implement transposition tables for search efficiency, and explore neural network-based evaluation.", // TODO: Update
    links: {
      // TODO: Add GitHub URL
    },
    featured: true,
  },
  {
    slug: "housing-dashboard",
    title: "Housing Affordability Dashboard",
    subtitle: "Interactive data visualization for housing trends",
    year: "2025", // TODO: Confirm year
    status: "completed",
    category: "data",
    summary:
      "An interactive dashboard visualizing housing affordability trends across regions. Combines geospatial data, economic indicators, and clear visual storytelling.",
    problem:
      "Housing affordability data is publicly available but scattered across sources and hard to interpret without context. Wanted to build a tool that makes the data accessible and explorable.",
    role: "Data pipeline, visualization design, and frontend development.", // TODO: Specify if team project
    stack: ["Python", "Plotly", "Pandas", "PostgreSQL", "PostGIS", "React"], // TODO: Confirm actual stack
    highlights: [
      "Interactive choropleth maps showing affordability by region",
      "Time-series analysis of price-to-income ratios",
      "Filterable views by metro area, income bracket, and time period",
      "Data pipeline pulling from multiple public data sources",
    ],
    technicalDetails:
      "The data pipeline normalizes data from Census ACS, Zillow, and BLS sources into a unified schema. PostGIS handles geospatial queries for regional aggregation. The frontend uses Plotly for interactive charts with linked brushing — selecting a region on the map updates the time-series view.", // TODO: Expand with actual details
    lessons:
      "Learned that 80% of data visualization work is data cleaning and normalization. The visualization itself is the easy part once the data pipeline is solid.",
    improvements:
      "Would add predictive modeling for affordability trends, implement more granular geographic resolution, and add comparison tools for specific metro areas.", // TODO: Update
    links: {
      // TODO: Add GitHub URL
      // TODO: Add live demo URL if deployed
    },
    // TODO: Add screenshot to /public/images/projects/housing-dashboard.png
    featured: true,
  },
  {
    slug: "weather-app",
    title: "Weather Application",
    subtitle: "Real-time weather data with clean interface",
    year: "2024", // TODO: Confirm year
    status: "completed",
    category: "frontend",
    summary:
      "A weather application with location-based forecasts, hourly and daily views, and a clean responsive interface. Built to practice API integration and thoughtful UI design.",
    problem:
      "Most weather apps are cluttered with ads and unnecessary data. Wanted to build something that surfaces the information people actually check — current conditions, hourly forecast, and whether to bring a jacket.",
    role: "Sole developer — design and implementation.",
    stack: ["React", "TypeScript", "Tailwind CSS"], // TODO: Confirm actual stack and weather API used
    highlights: [
      "Location-based weather with search and geolocation",
      "Hourly and 7-day forecast views",
      "Responsive design that works well on phone screens",
      "Clean data visualization for temperature and precipitation",
    ],
    technicalDetails:
      "Uses a weather API for forecast data with client-side caching to minimize API calls. Implemented a custom hook for geolocation with proper permission handling and fallback to IP-based location. Temperature charts use lightweight SVG rendering instead of a charting library.", // TODO: Expand with actual details
    lessons:
      "Good practice in API integration, error handling for unreliable external services, and designing information-dense interfaces that still feel clean.",
    improvements:
      "Would add weather alerts, implement offline caching with service workers, and add widgets for air quality and UV index.", // TODO: Update
    links: {
      // TODO: Add GitHub URL
      // TODO: Add live demo URL if deployed
    },
    // TODO: Add screenshot to /public/images/projects/weather-app.png
    featured: false,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}
