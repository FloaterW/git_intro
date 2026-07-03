interface ProjectIllustrationProps {
  slug: string;
  category: string;
}

export default function ProjectIllustration({ slug }: ProjectIllustrationProps) {
  const illustrations: Record<string, React.ReactNode> = {
    "video-platform": <VideoIllustration />,
    "banking-app": <BankingIllustration />,
    "chess-engine": <ChessIllustration />,
    "housing-dashboard": <DashboardIllustration />,
    "weather-app": <WeatherIllustration />,
  };

  return (
    <div
      style={{
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg-alt)",
        padding: "var(--space-2xl) var(--space-xl)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        minHeight: "16rem",
      }}
    >
      {illustrations[slug] || <GenericIllustration />}
    </div>
  );
}

function VideoIllustration() {
  return (
    <svg width="320" height="200" viewBox="0 0 320 200" fill="none" aria-hidden="true">
      {/* Browser frame */}
      <rect x="20" y="10" width="280" height="180" rx="8" stroke="var(--color-border-strong)" strokeWidth="1.5" />
      <line x1="20" y1="34" x2="300" y2="34" stroke="var(--color-border-strong)" strokeWidth="1.5" />
      <circle cx="36" cy="22" r="4" fill="var(--color-border-strong)" />
      <circle cx="50" cy="22" r="4" fill="var(--color-border-strong)" />
      <circle cx="64" cy="22" r="4" fill="var(--color-border-strong)" />

      {/* Video player area */}
      <rect x="36" y="46" width="170" height="96" rx="4" fill="var(--color-border)" />
      {/* Play button */}
      <polygon points="108,82 128,94 108,106" fill="var(--color-accent)" opacity="0.8" />
      {/* Progress bar */}
      <rect x="36" y="148" width="170" height="4" rx="2" fill="var(--color-border)" />
      <rect x="36" y="148" width="68" height="4" rx="2" fill="var(--color-accent)" opacity="0.6" />

      {/* Sidebar - video list */}
      <rect x="218" y="46" width="66" height="28" rx="3" fill="var(--color-border)" />
      <rect x="218" y="80" width="66" height="28" rx="3" fill="var(--color-border)" />
      <rect x="218" y="114" width="66" height="28" rx="3" fill="var(--color-border)" />
      <rect x="218" y="148" width="66" height="28" rx="3" fill="var(--color-border)" />

      {/* Text lines under video */}
      <rect x="36" y="160" width="120" height="6" rx="3" fill="var(--color-border-strong)" />
      <rect x="36" y="172" width="80" height="4" rx="2" fill="var(--color-border)" />
    </svg>
  );
}

function BankingIllustration() {
  return (
    <svg width="320" height="200" viewBox="0 0 320 200" fill="none" aria-hidden="true">
      {/* Card shape */}
      <rect x="60" y="20" width="200" height="120" rx="12" stroke="var(--color-border-strong)" strokeWidth="1.5" fill="var(--color-bg-card)" />
      <rect x="80" y="48" width="40" height="28" rx="4" fill="var(--color-accent)" opacity="0.2" stroke="var(--color-accent)" strokeWidth="1" opacity="0.4" />
      <rect x="80" y="92" width="100" height="6" rx="3" fill="var(--color-border-strong)" />
      <rect x="80" y="106" width="60" height="4" rx="2" fill="var(--color-border)" />

      {/* Transaction rows */}
      <g transform="translate(60, 152)">
        <rect x="0" y="0" width="200" height="1" fill="var(--color-border)" />
        <rect x="8" y="8" width="8" height="8" rx="2" fill="var(--color-accent)" opacity="0.3" />
        <rect x="24" y="9" width="60" height="5" rx="2.5" fill="var(--color-border-strong)" />
        <rect x="152" y="9" width="40" height="5" rx="2.5" fill="var(--color-border-strong)" />
      </g>
      <g transform="translate(60, 172)">
        <rect x="0" y="0" width="200" height="1" fill="var(--color-border)" />
        <rect x="8" y="8" width="8" height="8" rx="2" fill="var(--color-accent)" opacity="0.3" />
        <rect x="24" y="9" width="80" height="5" rx="2.5" fill="var(--color-border-strong)" />
        <rect x="152" y="9" width="40" height="5" rx="2.5" fill="var(--color-border)" />
      </g>

      {/* Shield icon */}
      <path
        d="M270 50 L270 70 Q270 90 255 100 Q240 90 240 70 L240 50 L255 42 Z"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        fill="var(--color-accent)"
        opacity="0.1"
      />
      <polyline
        points="248,68 253,74 264,60"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function ChessIllustration() {
  return (
    <svg width="320" height="200" viewBox="0 0 320 200" fill="none" aria-hidden="true">
      {/* Partial chessboard */}
      <g transform="translate(80, 20)">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((row) =>
          [0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={col * 20}
              y={row * 20}
              width="20"
              height="20"
              fill={
                (row + col) % 2 === 0
                  ? "var(--color-bg-card)"
                  : "var(--color-border)"
              }
            />
          ))
        )}
        <rect x="0" y="0" width="160" height="160" rx="2" stroke="var(--color-border-strong)" strokeWidth="1.5" fill="none" />
      </g>

      {/* Knight piece silhouette */}
      <g transform="translate(148, 68)">
        <path
          d="M0 44 L0 36 Q0 20 8 12 Q12 8 12 0 L20 4 L16 12 Q24 8 28 16 Q32 24 32 36 L32 44 Z"
          fill="var(--color-accent)"
          opacity="0.7"
        />
      </g>

      {/* Search depth indicator */}
      <g transform="translate(260, 40)">
        <text x="0" y="0" fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-text-tertiary)">depth</text>
        <rect x="0" y="8" width="32" height="4" rx="2" fill="var(--color-border)" />
        <rect x="0" y="8" width="24" height="4" rx="2" fill="var(--color-accent)" opacity="0.5" />
        <rect x="0" y="18" width="32" height="4" rx="2" fill="var(--color-border)" />
        <rect x="0" y="18" width="18" height="4" rx="2" fill="var(--color-accent)" opacity="0.4" />
        <rect x="0" y="28" width="32" height="4" rx="2" fill="var(--color-border)" />
        <rect x="0" y="28" width="12" height="4" rx="2" fill="var(--color-accent)" opacity="0.3" />
      </g>

      {/* Evaluation bar */}
      <g transform="translate(260, 100)">
        <text x="0" y="0" fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-text-tertiary)">eval</text>
        <rect x="0" y="8" width="8" height="60" rx="4" fill="var(--color-border)" />
        <rect x="0" y="28" width="8" height="40" rx="4" fill="var(--color-accent)" opacity="0.4" />
      </g>
    </svg>
  );
}

function DashboardIllustration() {
  return (
    <svg width="320" height="200" viewBox="0 0 320 200" fill="none" aria-hidden="true">
      {/* Map area */}
      <rect x="20" y="10" width="180" height="130" rx="6" stroke="var(--color-border-strong)" strokeWidth="1.5" fill="var(--color-bg-card)" />
      {/* Abstract map shapes */}
      <path d="M40 60 Q60 30 90 50 Q110 65 100 90 Q90 110 60 100 Q35 90 40 60Z" fill="var(--color-accent)" opacity="0.12" stroke="var(--color-accent)" strokeWidth="1" opacity="0.3" />
      <path d="M100 40 Q130 20 150 45 Q160 60 145 80 Q130 95 110 80 Q90 65 100 40Z" fill="var(--color-accent)" opacity="0.08" stroke="var(--color-accent)" strokeWidth="1" opacity="0.2" />
      {/* Map pins */}
      <circle cx="72" cy="68" r="4" fill="var(--color-accent)" opacity="0.7" />
      <circle cx="120" cy="55" r="4" fill="var(--color-accent)" opacity="0.5" />
      <circle cx="95" cy="88" r="3" fill="var(--color-accent)" opacity="0.4" />

      {/* Bar chart */}
      <g transform="translate(220, 10)">
        <rect x="0" y="0" width="80" height="130" rx="6" stroke="var(--color-border-strong)" strokeWidth="1.5" fill="var(--color-bg-card)" />
        <rect x="14" y="80" width="10" height="36" rx="2" fill="var(--color-accent)" opacity="0.3" />
        <rect x="30" y="50" width="10" height="66" rx="2" fill="var(--color-accent)" opacity="0.5" />
        <rect x="46" y="64" width="10" height="52" rx="2" fill="var(--color-accent)" opacity="0.4" />
        <rect x="62" y="36" width="10" height="80" rx="2" fill="var(--color-accent)" opacity="0.6" />
        <line x1="10" y1="120" x2="74" y2="120" stroke="var(--color-border-strong)" strokeWidth="1" />
      </g>

      {/* Line chart */}
      <g transform="translate(20, 150)">
        <rect x="0" y="0" width="280" height="44" rx="6" stroke="var(--color-border-strong)" strokeWidth="1.5" fill="var(--color-bg-card)" />
        <polyline
          points="16,30 50,22 90,28 130,14 170,18 210,10 250,16 270,12"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <line x1="16" y1="36" x2="270" y2="36" stroke="var(--color-border)" strokeWidth="1" />
      </g>
    </svg>
  );
}

function WeatherIllustration() {
  return (
    <svg width="320" height="200" viewBox="0 0 320 200" fill="none" aria-hidden="true">
      {/* Phone frame */}
      <rect x="110" y="8" width="100" height="184" rx="16" stroke="var(--color-border-strong)" strokeWidth="1.5" fill="var(--color-bg-card)" />
      <rect x="140" y="14" width="40" height="4" rx="2" fill="var(--color-border)" />

      {/* Sun */}
      <circle cx="160" cy="64" r="16" fill="var(--color-accent)" opacity="0.2" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.5" />
      {/* Sun rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 160 + Math.cos(rad) * 22;
        const y1 = 64 + Math.sin(rad) * 22;
        const x2 = 160 + Math.cos(rad) * 28;
        const y2 = 64 + Math.sin(rad) * 28;
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        );
      })}

      {/* Temperature */}
      <text x="160" y="108" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="20" fontWeight="600" fill="var(--color-text-secondary)">72°</text>
      <text x="160" y="122" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-text-tertiary)">Corvallis, OR</text>

      {/* Forecast row */}
      {["M", "T", "W", "T", "F"].map((day, i) => (
        <g key={i} transform={`translate(${124 + i * 16}, 136)`}>
          <text x="4" y="0" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--color-text-tertiary)">{day}</text>
          <circle cx="4" cy="10" r="3" fill="var(--color-accent)" opacity={0.2 + i * 0.1} />
          <text x="4" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--color-text-tertiary)">{68 + i * 2}°</text>
        </g>
      ))}

      {/* Side decorations - clouds */}
      <g transform="translate(40, 50)" opacity="0.3">
        <ellipse cx="20" cy="20" rx="20" ry="12" fill="var(--color-border-strong)" />
        <ellipse cx="32" cy="14" rx="14" ry="10" fill="var(--color-border-strong)" />
        <ellipse cx="10" cy="16" rx="12" ry="8" fill="var(--color-border-strong)" />
      </g>
      <g transform="translate(230, 80)" opacity="0.2">
        <ellipse cx="16" cy="16" rx="16" ry="10" fill="var(--color-border-strong)" />
        <ellipse cx="26" cy="10" rx="12" ry="8" fill="var(--color-border-strong)" />
      </g>

      {/* Rain drops from right cloud */}
      <line x1="240" y1="100" x2="238" y2="110" stroke="var(--color-accent)" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <line x1="248" y1="98" x2="246" y2="108" stroke="var(--color-accent)" strokeWidth="1" strokeLinecap="round" opacity="0.2" />
      <line x1="256" y1="100" x2="254" y2="108" stroke="var(--color-accent)" strokeWidth="1" strokeLinecap="round" opacity="0.25" />
    </svg>
  );
}

function GenericIllustration() {
  return (
    <svg width="320" height="200" viewBox="0 0 320 200" fill="none" aria-hidden="true">
      <rect x="40" y="20" width="240" height="160" rx="8" stroke="var(--color-border-strong)" strokeWidth="1.5" fill="var(--color-bg-card)" />
      <rect x="60" y="50" width="80" height="6" rx="3" fill="var(--color-border-strong)" />
      <rect x="60" y="66" width="200" height="4" rx="2" fill="var(--color-border)" />
      <rect x="60" y="78" width="180" height="4" rx="2" fill="var(--color-border)" />
      <rect x="60" y="90" width="160" height="4" rx="2" fill="var(--color-border)" />
      <rect x="60" y="114" width="60" height="24" rx="4" fill="var(--color-accent)" opacity="0.15" stroke="var(--color-accent)" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}
