// Read every write-up below and fix anything that doesn't match what you actually built.
// Interviewers will ask about these, so the details should be yours.

export interface Project {
  slug: string;
  title: string;
  year: string;
  summary: string;
  stack: string[];
  links: { github?: string; live?: string };
  image?: string;
  featured: boolean;
  sections: { heading: string; body: string[] }[];
}

export const projects: Project[] = [
  {
    slug: "video-platform",
    title: "Video sharing platform",
    year: "2025",
    summary: "A YouTube-style site: upload a video, it gets transcoded, and people can watch it on your channel.",
    stack: ["React", "Node.js", "PostgreSQL", "AWS S3", "FFmpeg"],
    links: {},
    featured: true,
    sections: [
      {
        heading: "Why I built it",
        body: [
          "I wanted to know what actually happens between clicking upload and watching a video. The player is the easy part. Most of the work is in getting the file stored, processed and ready to stream.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "Uploaded files go to S3. A Node worker picks up new uploads and runs FFmpeg to make lower-resolution copies, and the database keeps track of where each video is in that process so the page can say it's still processing instead of showing a broken player.",
          "On top of that there are channel pages, subscriptions, and a basic recommendation feed on the home page.",
        ],
      },
      {
        heading: "What I'd do next",
        body: ["Serve videos through a CDN instead of straight from S3, and add comments."],
      },
    ],
  },
  {
    slug: "banking-app",
    title: "Banking app",
    year: "2025",
    summary: "Accounts, transfers and transaction history, built so that money can't appear or disappear.",
    stack: ["Java", "Spring", "PostgreSQL", "React"],
    links: {},
    featured: true,
    sections: [
      {
        heading: "The idea",
        body: [
          "Most apps can get away with being a little bit wrong. A bank can't, so I picked this project to make myself think carefully about data that has to stay correct.",
          "Customers can see their accounts, move money between them and look through their history. Admins can see every account.",
        ],
      },
      {
        heading: "The hard part",
        body: [
          "Transfers. A transfer takes money out of one account and puts it into another, and both steps have to happen or neither does, even when two requests hit the same account at once. Each transfer runs inside a single database transaction so a failure halfway through rolls the whole thing back.",
        ],
      },
      {
        heading: "If I kept going",
        body: ["An audit log of every change and two-factor login."],
      },
    ],
  },
  {
    slug: "chess-engine",
    title: "Chess engine",
    year: "2024",
    summary: "An engine you can play against in the terminal. It searches a few moves ahead and picks the best one it finds.",
    stack: ["C++", "Python"],
    links: {},
    featured: true,
    sections: [
      {
        heading: "What it does",
        body: [
          "It generates every legal move in a position, including castling, en passant and promotion. Then it searches ahead with minimax and alpha-beta pruning and scores the positions it reaches by material and by where the pieces are on the board.",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "Speed matters a lot more than I expected. The number of positions grows so fast that looking at the most promising moves first, so alpha-beta can skip more of the tree, made a bigger difference than tweaking the evaluation.",
        ],
      },
      {
        heading: "What's missing",
        body: ["A transposition table so it stops re-searching positions it has already seen, and an opening book."],
      },
    ],
  },
  {
    slug: "housing-dashboard",
    title: "Housing affordability dashboard",
    year: "2025",
    summary: "A map and charts showing how housing affordability has changed across regions over time.",
    stack: ["Python", "Pandas", "PostgreSQL", "PostGIS", "Plotly", "React"],
    links: {},
    featured: true,
    sections: [
      {
        heading: "Why",
        body: [
          "Housing cost data is public, but it's spread across different sources and the raw tables are hard to read. I wanted one place where you could click on a region and see how affordable it's been over the years.",
        ],
      },
      {
        heading: "How it's put together",
        body: [
          "A Python and Pandas pipeline cleans the source data and loads it into PostgreSQL, with PostGIS holding the region boundaries. The frontend has a map colored by affordability. Clicking a region updates a chart of price-to-income over time, and you can filter by metro area, income bracket and year.",
        ],
      },
      {
        heading: "Takeaway",
        body: [
          "Most of my time went into cleaning and lining up the data, not drawing charts. Once the data was right, the charts were quick.",
        ],
      },
    ],
  },
  {
    slug: "weather-app",
    title: "Weather app",
    year: "2024",
    summary: "A weather app that only shows what I actually check: right now, the next few hours, and the week.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    links: {},
    featured: false,
    sections: [
      {
        heading: "About it",
        body: [
          "Most weather apps are crowded with ads and numbers nobody reads. This one shows current conditions, an hourly forecast and a 7-day forecast, and that's it. You can search for a city or use your location.",
          "It caches forecasts in the browser so it doesn't call the weather API on every reload, and the layout is built for phones first, since that's where people check the weather.",
        ],
      },
    ],
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
