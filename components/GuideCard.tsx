import Link from "next/link";
import type { Guide, Difficulty } from "@/lib/data";

const difficultyConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  "DIY Easy":             { label: "DIY Easy",             color: "#34d399", bg: "rgba(16, 185, 129, 0.1)",  border: "rgba(16, 185, 129, 0.2)" },
  "DIY Medium":           { label: "DIY Medium",           color: "#fbbf24", bg: "rgba(245, 158, 11, 0.1)",  border: "rgba(245, 158, 11, 0.2)" },
  "DIY Moderate":         { label: "DIY Moderate",         color: "#fbbf24", bg: "rgba(245, 158, 11, 0.1)",  border: "rgba(245, 158, 11, 0.2)" },
  "DIY Hard":             { label: "DIY Hard",             color: "#f97316", bg: "rgba(249, 115, 22, 0.1)",  border: "rgba(249, 115, 22, 0.2)" },
  "DIY Advanced":         { label: "DIY Advanced",         color: "#f97316", bg: "rgba(249, 115, 22, 0.1)",  border: "rgba(249, 115, 22, 0.2)" },
  "Hire Pro":             { label: "Hire Pro",             color: "#f87171", bg: "rgba(239, 68, 68, 0.1)",   border: "rgba(239, 68, 68, 0.2)" },
  "Know Before You Call": { label: "Know Before You Call", color: "#c084fc", bg: "rgba(192, 132, 252, 0.1)", border: "rgba(192, 132, 252, 0.2)" },
  "Seasonal":             { label: "Seasonal",             color: "#34d399", bg: "rgba(16, 185, 129, 0.1)",  border: "rgba(16, 185, 129, 0.2)" },
};

const systemColors: Record<string, string> = {
  Plumbing: "#60a5fa",
  HVAC: "#a78bfa",
  Electrical: "#fbbf24",
  Roof: "#f87171",
  Foundation: "#94a3b8",
  Appliances: "#34d399",
  Exterior: "#6ee7b7",
  Interior: "#93c5fd",
  Landscaping: "#86efac",
  Safety: "#fca5a5",
};

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(0) + "K";
  return n.toString();
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill={star <= Math.round(rating) ? "#f59e0b" : "rgba(75, 96, 128, 0.4)"}
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        ))}
      </div>
      <span className="text-xs" style={{ color: "#94a3b8" }}>
        {rating.toFixed(1)} <span style={{ color: "#4b6080" }}>({formatNumber(count)})</span>
      </span>
    </div>
  );
}

export default function GuideCard({ guide, compact = false }: { guide: Guide; compact?: boolean }) {
  const diff = difficultyConfig[guide.difficulty] ?? { label: guide.difficulty, color: "#94a3b8", bg: "rgba(148,163,184,0.1)", border: "rgba(148,163,184,0.2)" };
  const systemColor = systemColors[guide.system] || "#94a3b8";

  return (
    <Link href={`/guide/${guide.slug}`} className="block">
      <article
        className="card-hover rounded-2xl p-5 h-full"
        style={{
          background: "linear-gradient(135deg, #1a2235 0%, #111827 100%)",
          border: "1px solid rgba(30, 45, 69, 0.8)",
        }}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="tag"
              style={{ background: `rgba(${hexToRgb(systemColor)}, 0.12)`, color: systemColor, border: `1px solid rgba(${hexToRgb(systemColor)}, 0.2)` }}
            >
              {guide.system}
            </span>
            <span
              className="tag"
              style={{ background: diff.bg, color: diff.color, border: `1px solid ${diff.border}` }}
            >
              {diff.label}
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0" style={{ color: "#4b6080" }}>
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
            </svg>
            <span className="text-xs">{formatNumber(guide.views)}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base leading-snug mb-2" style={{ color: "#f1f5f9" }}>
          {guide.title}
        </h3>

        {/* Summary */}
        {!compact && (
          <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: "#94a3b8" }}>
            {guide.summary}
          </p>
        )}

        {/* Cost + time */}
        <div className="flex items-center gap-4 mb-4">
          <div>
            <div className="text-xs mb-0.5" style={{ color: "#4b6080" }}>Est. Cost</div>
            <div className="text-sm font-bold" style={{ color: "#f1f5f9" }}>
              ${guide.costLow}–${guide.costHigh}
            </div>
          </div>
          <div style={{ width: "1px", height: "28px", background: "#1e2d45" }} />
          <div>
            <div className="text-xs mb-0.5" style={{ color: "#4b6080" }}>Time</div>
            <div className="text-sm font-bold" style={{ color: "#f1f5f9" }}>{guide.timeEstimate}</div>
          </div>
          <div style={{ width: "1px", height: "28px", background: "#1e2d45" }} />
          <div>
            <div className="text-xs mb-0.5" style={{ color: "#4b6080" }}>Steps</div>
            <div className="text-sm font-bold" style={{ color: "#f1f5f9" }}>{guide.steps.length}</div>
          </div>
        </div>

        {/* Rating + saves */}
        <div className="flex items-center justify-between">
          <StarRating rating={guide.rating} count={guide.reviewCount} />
          <div className="flex items-center gap-1" style={{ color: "#4b6080" }}>
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <span className="text-xs">{formatNumber(guide.saves)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "148, 163, 184";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
