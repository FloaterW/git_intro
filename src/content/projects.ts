// Values marked PLACEHOLDER are made up. See "Before publishing" in the README.

export interface Project {
  slug: string;
  title: string;
  year: string;
  summary: string;
  role: string;
  team: string;
  timeline: string;
  stack: string[];
  links: { github?: string; live?: string };
  image: string;
  video?: { webm: string; mp4: string };
  metrics: { value: string; label: string }[];
  featured: boolean;
  sections: { heading: string; body: string[] }[];
  code?: { language: string; caption: string; source: string };
}

export const projects: Project[] = [
  {
    slug: "banking-app",
    title: "Banking app",
    year: "2025",
    summary: "Accounts, transfers and transaction history, built so that money can't appear or disappear, even under load.",
    role: "Backend lead: transfer logic, database schema and login", // PLACEHOLDER
    team: "3 people, class project", // PLACEHOLDER
    timeline: "Winter 2025, 10 weeks", // PLACEHOLDER
    stack: ["Java", "Spring Boot", "PostgreSQL", "React"],
    links: {
      github: "https://github.com/floaterw/banking-app", // PLACEHOLDER
      live: "https://bank-demo.faradwahab.com", // PLACEHOLDER
    },
    image: "/images/projects/banking-app.png", // PLACEHOLDER
    metrics: [
      // PLACEHOLDER
      { value: "10,000", label: "concurrent test transfers" },
      { value: "0", label: "balance mismatches" },
      { value: "94%", label: "test coverage on transfers" },
    ],
    featured: true,
    sections: [
      {
        heading: "The idea",
        body: [
          "Most apps can get away with being a little bit wrong. A bank can't, so we picked this project to force ourselves to think carefully about data that has to stay correct. Customers can see their accounts, move money and look through their history. Admins can see every account.",
        ],
      },
      {
        heading: "The bug that taught me the most",
        body: [
          // PLACEHOLDER
          "Our first version passed every test we wrote and still lost money. Two transfers out of the same account at the same moment could both read the old balance, and both would go through. I only found it by writing a test that fired 10,000 transfers at once and checked that the total money in the system never changed.",
          "The fix was to lock both account rows for the length of each transfer, so the second one waits for the first. After that the stress test came back clean every time, and it still runs on every change.",
        ],
      },
      {
        heading: "If I kept going",
        body: ["An audit log of every change and two-factor login."],
      },
    ],
    code: {
      // PLACEHOLDER
      language: "java",
      caption:
        "The core of a transfer. Both rows stay locked until the transaction commits, and they're always locked in the same order so two opposite transfers can't deadlock.",
      source: `@Transactional
public void transfer(long fromId, long toId, BigDecimal amount) {
    Account first = accounts.findByIdForUpdate(Math.min(fromId, toId));
    Account second = accounts.findByIdForUpdate(Math.max(fromId, toId));
    Account from = first.getId() == fromId ? first : second;
    Account to = from == first ? second : first;

    if (from.getBalance().compareTo(amount) < 0) {
        throw new InsufficientFundsException(fromId);
    }
    from.debit(amount);
    to.credit(amount);
}`,
    },
  },
  {
    slug: "video-platform",
    title: "Video sharing platform",
    year: "2025",
    summary: "A YouTube-style site: upload a video, it gets transcoded into three resolutions, and people can watch it on your channel.",
    role: "Everything", // PLACEHOLDER
    team: "Solo",
    timeline: "Fall 2024 to winter 2025, on and off", // PLACEHOLDER
    stack: ["React", "Node.js", "PostgreSQL", "AWS S3", "FFmpeg"],
    links: {
      github: "https://github.com/floaterw/video-platform", // PLACEHOLDER
      live: "https://video.faradwahab.com", // PLACEHOLDER
    },
    image: "/images/projects/video-platform.png", // PLACEHOLDER
    metrics: [
      // PLACEHOLDER
      { value: "3", label: "resolutions per upload" },
      { value: "~40 s", label: "to process a 5-minute video" },
      { value: "2 GB", label: "max upload size" },
    ],
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
          "Uploads stream straight to S3. A Node worker picks up each new file and runs FFmpeg to make 1080p, 720p and 360p versions, and the database tracks where each video is in that process so the page can say it's still processing instead of showing a broken player. On top of that there are channel pages, subscriptions and a feed of new uploads from channels you follow.",
        ],
      },
      {
        heading: "What went wrong first",
        body: [
          // PLACEHOLDER
          "My first upload handler read the whole file into memory before saving it, and the server crashed on anything over about 500 MB. Streaming the upload directly to S3 fixed it and is why uploads up to 2 GB work now.",
        ],
      },
    ],
  },
  {
    slug: "housing-dashboard",
    title: "Housing affordability dashboard",
    year: "2025",
    summary: "A map of every US county showing how the cost of a home compares to local income, from 2009 to today.",
    role: "Data pipeline and the map", // PLACEHOLDER
    team: "2 people", // PLACEHOLDER
    timeline: "Spring 2025, about 6 weeks", // PLACEHOLDER
    stack: ["Python", "Pandas", "PostgreSQL", "PostGIS", "Plotly", "React"],
    links: {
      github: "https://github.com/floaterw/housing-dashboard", // PLACEHOLDER
      live: "https://housing.faradwahab.com", // PLACEHOLDER
    },
    image: "/images/projects/housing-dashboard.png", // PLACEHOLDER
    metrics: [
      // PLACEHOLDER
      { value: "3,100+", label: "counties" },
      { value: "15 years", label: "of data" },
      { value: "4", label: "public data sources joined" },
    ],
    featured: true,
    sections: [
      {
        heading: "Why",
        body: [
          "Housing cost data is public, but it's spread across different sources and the raw tables are hard to read. We wanted one place where you could click on a county and see how affordable it's been over the years.",
        ],
      },
      {
        heading: "How it's put together",
        body: [
          "A Python and Pandas pipeline cleans the source data and loads it into PostgreSQL, with PostGIS holding the county shapes. The map is colored by the ratio of median home price to median income. Clicking a county draws its history as a line chart next to the state and national averages.",
        ],
      },
      {
        heading: "The annoying part",
        body: [
          // PLACEHOLDER
          "County boundaries and codes aren't stable over time. Connecticut replaced its counties with planning regions in 2022, so its data just vanished from the newer years until I wrote a mapping between the old and new areas. Most of the project went into problems like that, not into the charts.",
        ],
      },
    ],
  },
  {
    slug: "chess-engine",
    title: "Chess engine",
    year: "2024",
    summary: "A chess engine in C++ that you can play against in the terminal. It looks six moves ahead in under two seconds.",
    role: "Everything", // PLACEHOLDER
    team: "Solo",
    timeline: "Summer 2024, about 8 weeks", // PLACEHOLDER
    stack: ["C++", "Python"],
    links: { github: "https://github.com/floaterw/chess-engine" }, // PLACEHOLDER
    image: "/images/projects/chess-engine.png", // PLACEHOLDER
    video: {
      // PLACEHOLDER
      webm: "/images/projects/chess-engine-demo.webm",
      mp4: "/images/projects/chess-engine-demo.mp4",
    },
    metrics: [
      // PLACEHOLDER
      { value: "6 ply", label: "search depth in under 2 s" },
      { value: "1.2M", label: "positions searched per second" },
      { value: "9×", label: "faster after move ordering" },
    ],
    featured: true,
    sections: [
      {
        heading: "What it does",
        body: [
          "It generates every legal move in a position, including castling, en passant and promotion, then searches ahead with minimax and alpha-beta pruning. Positions are scored by material and by where each piece sits on the board. A small Python script runs it against other engines so I can tell whether a change actually made it stronger.",
        ],
      },
      {
        heading: "Making it fast",
        body: [
          // PLACEHOLDER
          "My first version took about 9 seconds to search four moves deep, which is too slow to play against. The fix wasn't a faster evaluation. It was searching captures and checks first, so alpha-beta could throw away bad branches earlier. That one change made it about nine times faster and let it look two moves further ahead in the same time.",
        ],
      },
      {
        heading: "What's missing",
        body: ["A transposition table so it stops re-searching positions it has already seen, and an opening book."],
      },
    ],
    code: {
      // PLACEHOLDER
      language: "cpp",
      caption:
        "Move ordering. Captures are ranked by most valuable victim, least valuable attacker, then checks, then everything else.",
      source: `int moveScore(const Move& m, const Board& board) {
    if (m.isCapture()) {
        return 1000 + 10 * value(board.pieceAt(m.to)) - value(board.pieceAt(m.from));
    }
    if (board.givesCheck(m)) return 500;
    return 0;
}

void orderMoves(std::vector<Move>& moves, const Board& board) {
    std::sort(moves.begin(), moves.end(), [&](const Move& a, const Move& b) {
        return moveScore(a, board) > moveScore(b, board);
    });
}`,
    },
  },
  {
    slug: "weather-app",
    title: "Weather app",
    year: "2024",
    summary: "A small weather app that shows only what I check: right now, the next few hours, and the week.",
    role: "Everything",
    team: "Solo",
    timeline: "A weekend", // PLACEHOLDER
    stack: ["React", "TypeScript", "Tailwind CSS"],
    links: {
      github: "https://github.com/floaterw/weather-app", // PLACEHOLDER
      live: "https://weather.faradwahab.com", // PLACEHOLDER
    },
    image: "/images/projects/weather-app.png", // PLACEHOLDER
    metrics: [],
    featured: false,
    sections: [
      {
        heading: "About it",
        body: [
          "Most weather apps are crowded with ads and numbers nobody reads. This one shows current conditions, an hourly forecast and a 7-day forecast, and that's it. It caches forecasts in the browser so reloading doesn't call the weather API again.",
        ],
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const smallerProjects = projects.filter((p) => !p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
