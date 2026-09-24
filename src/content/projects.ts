// Values marked PLACEHOLDER are made up. See "Before publishing" in the README.

export type Tag = "Web" | "Data" | "Systems";

export interface Project {
  slug: string;
  title: string;
  year: string;
  summary: string;
  highlight?: string;
  tags: Tag[];
  architecture?: { label: string; detail: string; note?: string }[];
  role: string;
  team: string;
  timeline: string;
  stack: string[];
  links: { github?: string; live?: string; liveNote?: string };
  image: string;
  heroImage?: { src: string; caption: string };
  video?: { webm: string; mp4: string; poster: string };
  metrics: { value: string; label: string }[];
  featured: boolean;
  sections: { heading: string; body: string[] }[];
  code?: { caption: string; source: string };
  demo?: "race-condition";
}

export const projects: Project[] = [
  {
    slug: "civicscope",
    title: "CivicScope",
    year: "2026",
    summary:
      "A map of housing affordability across the Greater Toronto Area. It covers rent burden, income and CMHC housing data for 25 municipalities and 1,334 census tracts, and every number says where it came from.",
    highlight: "Every CMHC tract table is checked against the published total before it's loaded",
    tags: ["Data", "Web"],
    architecture: [
      { label: "StatCan + CMHC", detail: "2021 Census, starts, rents" },
      {
        label: "Python ETL",
        detail: "checks each table against CMHC's totals",
        note: "Stops on any mismatch",
      },
      { label: "PostgreSQL + PostGIS", detail: "boundaries and metrics" },
      { label: "FastAPI", detail: "metrics and simplified GeoJSON" },
      { label: "Next.js + MapLibre", detail: "map, charts, comparison" },
    ],
    role: "Everything",
    team: "Solo",
    timeline: "May 2026 to now, ongoing",
    stack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "PostGIS",
      "Next.js",
      "TypeScript",
      "MapLibre",
      "Docker",
    ],
    links: {
      github: "https://github.com/FloaterW/civicscope",
      live: "https://civicscope-gold.vercel.app/",
      liveNote:
        "The data server sleeps when nobody is using it, so the first load can take about 30 seconds.",
    },
    image: "/images/projects/civicscope.png",
    heroImage: {
      src: "/images/projects/civicscope-tracts.png",
      caption: "CivicScope: rent burden across 1,334 GTA census tracts",
    },
    metrics: [
      { value: "1,334", label: "census tracts on the map" },
      { value: "1,244", label: "tracts with real CMHC construction data" },
      { value: "360", label: "backend tests" },
    ],
    featured: true,
    sections: [
      {
        heading: "Why",
        body: [
          "The question behind it: where in the GTA is rent furthest out of reach for local incomes, and how much does that change between neighboring towns, or even neighboring census tracts? The data to answer it is public, from Statistics Canada and CMHC, but it's split across separate tables and portals that don't use the same codes.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "Python ETL scripts pull boundaries and 2021 Census values from Statistics Canada, and housing starts, completions and rents from CMHC. Everything goes into PostgreSQL with PostGIS. A FastAPI backend serves the metrics and map-ready GeoJSON, simplified in PostGIS so the tract layer stays light.",
          "The Next.js frontend draws the map with MapLibre. It caches one payload per geography level and data source, so switching between most metrics just repaints the map without another request.",
        ],
      },
      {
        heading: "Every number says where it came from",
        body: [
          "Some census values are suppressed, and some CMHC data only exists for a whole municipality. Instead of quietly filling the gaps, every value carries a flag: official, derived, estimated, unavailable or low confidence. The flag shows up next to the number in the app and stays with it in the CSV export.",
          "The CMHC loader adds up each tract table and compares it with CMHC's own published total for the region. If they don't match, the run stops and nothing gets written.",
        ],
      },
      {
        heading: "The hardest part",
        body: [
          "Real CMHC construction counts were missing for tracts around Oshawa and Hamilton. It turned out CMHC still publishes those areas on 2016 census tract boundaries, and my map uses the 2021 ones. Statistics Canada splits a tract as it grows, so tract 0003.00 becomes 0003.01 and 0003.02, and my IDs had nothing to match.",
          "The fix was to match each split tract back to its 2016 parent. If the parent had zero starts, every child really had zero too, so those stay official. If not, I divide the parent's total between the children by their number of renters and label the result as an estimate. The pieces always add back up to the parent's exact total. With that in place, 1,244 of the 1,334 tracts have real CMHC construction data.",
        ],
      },
      {
        heading: "If I kept going",
        body: [
          "Load CMHC's rental survey at the tract level instead of borrowing municipal values, and add Brampton Transit to the transit layer. Its feed was down when I built the current snapshot.",
        ],
      },
    ],
    code: {
      caption:
        "The check in the CMHC loader. A tract table only gets written if its tracts add up to CMHC's published total for the whole region.",
      source: `ct_rows = parse_ct_table(response)
if not ct_rows:
    return None  # Empty is not proof that a series has never been published.
ct_sum = sum(ct_rows.values())
published = parse_published_total(_fetch(total_code, cma_id, year))
if published is None:
    # CT rows exist but the published total could not be parsed (e.g. an
    # HTML/stub gateway response). Refuse to write data we cannot validate.
    raise ValueError(
        f"VALIDATION ABORTED {metric} CMA {cma_id} {year}: CT table has "
        f"{len(ct_rows)} rows but the published CMA total could not be parsed."
    )
if ct_sum != published:
    raise ValueError(
        f"VALIDATION FAILED {metric} CMA {cma_id} {year}: "
        f"CT sum {ct_sum} != published total {published}"
    )
return ct_rows`,
    },
  },
  {
    slug: "banking-app",
    title: "Banking app",
    year: "2025",
    summary:
      "Accounts, transfers and transaction history, built so that money can't appear or disappear, even under load.",
    highlight: "0 balance mismatches across 10,000 concurrent transfers", // PLACEHOLDER
    tags: ["Web"],
    architecture: [
      { label: "React", detail: "accounts and transfer UI" },
      { label: "Spring Boot API", detail: "auth and validation" },
      {
        label: "Transfer service",
        detail: "row locks, one transaction",
        note: "The fix lives here",
      },
      { label: "PostgreSQL", detail: "accounts and ledger" },
    ],
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
    demo: "race-condition",
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
    summary:
      "A YouTube-style site: upload a video, it gets transcoded into three resolutions, and people can watch it on your channel.",
    highlight: "2 GB uploads, processed into 3 resolutions in about 40 s", // PLACEHOLDER
    tags: ["Web"],
    architecture: [
      { label: "Browser", detail: "streams the upload" },
      { label: "S3", detail: "stores the original" },
      { label: "Node worker", detail: "FFmpeg: 1080p, 720p, 360p", note: "Slowest step" },
      { label: "PostgreSQL", detail: "tracks processing state" },
      { label: "Player", detail: "picks a resolution" },
    ],
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
    slug: "chess-engine",
    title: "Chess engine",
    year: "2024",
    summary:
      "A chess engine in C++ that you can play against in the terminal. It looks six moves ahead in under two seconds.",
    highlight: "Searches 1.2M positions per second", // PLACEHOLDER
    tags: ["Systems"],
    architecture: [
      { label: "Move generator", detail: "every legal move" },
      {
        label: "Alpha-beta search",
        detail: "captures and checks first",
        note: "Where the speed-up came from",
      },
      { label: "Evaluation", detail: "material and position" },
      { label: "Terminal UI", detail: "you vs. the engine" },
    ],
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
      poster: "/images/projects/chess-engine-poster.webp",
    },
    metrics: [
      // PLACEHOLDER
      { value: "6 ply", label: "search depth in under 2 s" },
      { value: "1.2M", label: "positions searched per second" },
      { value: "9×", label: "faster after move ordering" },
    ],
    featured: false,
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
        body: [
          "A transposition table so it stops re-searching positions it has already seen, and an opening book.",
        ],
      },
    ],
    code: {
      // PLACEHOLDER
      caption:
        "Move ordering. Captures are ranked by most valuable victim, least valuable attacker, then checks, then everything else.",
      source: `int moveScore(const Move& m, const Board& board) {
    if (m.isCapture()) {
        int victim = value(board.pieceAt(m.to));
        int attacker = value(board.pieceAt(m.from));
        return 1000 + 10 * victim - attacker;
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
    summary:
      "A small weather app that shows only what I check: right now, the next few hours, and the week.",
    tags: ["Web"],
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
export const allTags: Tag[] = ["Web", "Data", "Systems"];

// Below this many projects, the Projects page skips the tag filters.
export const MIN_FOR_FILTERS = 8;

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
