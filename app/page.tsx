import type { Metadata } from "next";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import GuideCard from "@/components/GuideCard";
import { guides, homeSystems, stats } from "@/lib/data";

export const metadata: Metadata = {
  title: "HouseMD — Diagnose & Fix Any Home Problem",
  description:
    "Community-powered home repair knowledge base. Real cost estimates, step-by-step guides, contractor reviews, and community Q&A — for every home problem.",
};

const popularGuides = guides.slice(0, 6);

const recentActivity = [
  { user: "WellWaterWendy", action: "solved", item: "Sulfur smell from water heater", time: "2 min ago", type: "solve" },
  { user: "TwinCitiesMike", action: "submitted cost data for", item: "Attic insulation in Minneapolis", time: "18 min ago", type: "cost" },
  { user: "NJHomeowner_Dave", action: "asked about", item: "HVAC replacement quote $18,000", time: "34 min ago", type: "question" },
  { user: "ColoradoKate", action: "logged repair for", item: "Full bathroom remodel, $16,500", time: "1 hr ago", type: "log" },
  { user: "BostonFixer", action: "updated cost data for", item: "Roof replacement in Boston", time: "2 hr ago", type: "cost" },
];

const testimonials = [
  {
    quote: "Found out my $4,200 HVAC quote was 40% above market for my area. Used the cost database to negotiate down to $2,900.",
    name: "Marcus T.",
    location: "Atlanta, GA",
    saved: "$1,300",
  },
  {
    quote: "The pilot light guide saved me a $200 service call. 45 minutes, a $12 thermocouple, hot water again.",
    name: "Priya R.",
    location: "Seattle, WA",
    saved: "$188",
  },
  {
    quote: "I had no idea that horizontal foundation cracks were the dangerous kind. This site probably prevented a $30k repair from becoming a catastrophe.",
    name: "Daniel K.",
    location: "Columbus, OH",
    saved: "Unknown",
  },
];

const systemColorMap: Record<string, { bg: string; border: string; text: string }> = {
  blue: { bg: "rgba(59, 130, 246, 0.08)", border: "rgba(59, 130, 246, 0.15)", text: "#60a5fa" },
  purple: { bg: "rgba(139, 92, 246, 0.08)", border: "rgba(139, 92, 246, 0.15)", text: "#a78bfa" },
  amber: { bg: "rgba(245, 158, 11, 0.08)", border: "rgba(245, 158, 11, 0.15)", text: "#fbbf24" },
  red: { bg: "rgba(239, 68, 68, 0.08)", border: "rgba(239, 68, 68, 0.15)", text: "#f87171" },
  green: { bg: "rgba(16, 185, 129, 0.08)", border: "rgba(16, 185, 129, 0.15)", text: "#34d399" },
  gray: { bg: "rgba(75, 96, 128, 0.08)", border: "rgba(75, 96, 128, 0.15)", text: "#94a3b8" },
};

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "#0b0f1a" }}>
      {/* ─── HERO ──────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background glow effects */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(245, 158, 11, 0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#f59e0b" }} />
            <span className="text-sm font-medium" style={{ color: "#fbbf24" }}>94,100+ homeowners getting answers right now</span>
          </div>

          {/* Headline */}
          <h1 className="font-black text-5xl sm:text-6xl lg:text-7xl tracking-tight mb-6" style={{ lineHeight: "1.05" }}>
            <span style={{ color: "#f1f5f9" }}>Diagnose any</span>
            <br />
            <span className="gradient-text">home problem.</span>
          </h1>

          <p className="text-lg sm:text-xl mb-10 mx-auto" style={{ color: "#94a3b8", maxWidth: "620px", lineHeight: "1.7" }}>
            Real cost data. Step-by-step guides. Community expertise. Know what's wrong, what it costs, and exactly how to fix it — before you call a contractor.
          </p>

          {/* Search */}
          <div className="flex justify-center mb-6">
            <SearchBar size="hero" />
          </div>

          {/* Popular searches */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="text-sm" style={{ color: "#4b6080" }}>Popular:</span>
            {["toilet running", "HVAC startup", "ceiling stain", "foundation crack", "water heater"].map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="text-sm px-3 py-1 rounded-full transition-all duration-200"
                style={{
                  background: "rgba(30, 45, 69, 0.5)",
                  border: "1px solid rgba(30, 45, 69, 0.8)",
                  color: "#94a3b8",
                }}
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─────────────────────────────────── */}
      <section style={{ borderTop: "1px solid rgba(30, 45, 69, 0.5)", borderBottom: "1px solid rgba(30, 45, 69, 0.5)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {[
              { label: "Repair Guides", value: stats.guides },
              { label: "Repairs Logged", value: stats.repairs },
              { label: "Cost Data Points", value: stats.costDataPoints },
              { label: "Community Members", value: stats.communities },
              { label: "Vetted Contractors", value: stats.contractors },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black mb-0.5 gradient-text">{s.value}</div>
                <div className="text-xs" style={{ color: "#4b6080" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOME SYSTEMS ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="section-label mb-2">Browse by System</div>
            <h2 className="text-3xl font-black" style={{ color: "#f1f5f9" }}>Every part of your home, covered</h2>
          </div>
          <Link href="/browse" className="hidden sm:flex btn-ghost px-4 py-2 rounded-xl text-sm font-semibold">
            Browse all →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {homeSystems.map((sys) => {
            const colors = systemColorMap[sys.color] || systemColorMap.gray;
            return (
              <Link
                key={sys.name}
                href={`/browse?system=${sys.name}`}
                className="card-hover rounded-2xl p-4 text-center block"
                style={{
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div className="text-3xl mb-2">{sys.icon}</div>
                <div className="font-bold text-sm mb-1" style={{ color: "#f1f5f9" }}>{sys.name}</div>
                <div className="text-xs mb-2" style={{ color: "#4b6080" }}>{sys.guideCount} guides</div>
                <div className="text-xs leading-tight" style={{ color: colors.text }}>{sys.description}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── FEATURED GUIDES ───────────────────────────── */}
      <section style={{ background: "rgba(17, 24, 39, 0.5)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="section-label mb-2">Top Guides</div>
              <h2 className="text-3xl font-black" style={{ color: "#f1f5f9" }}>Most searched repairs</h2>
            </div>
            <Link href="/browse" className="hidden sm:flex btn-ghost px-4 py-2 rounded-xl text-sm font-semibold">
              All guides →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <div className="section-label mb-2">How HouseMD Works</div>
          <h2 className="text-3xl font-black" style={{ color: "#f1f5f9" }}>From symptom to fix in minutes</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Describe the symptom",
              desc: "Search exactly what you're seeing — 'toilet runs at night' or 'brown spot on ceiling after rain'.",
              icon: "🔍",
              color: "#f59e0b",
            },
            {
              step: "02",
              title: "Get a diagnosis",
              desc: "Our structured guides identify the most likely causes, ranked by probability and ease of fix.",
              icon: "🩺",
              color: "#3b82f6",
            },
            {
              step: "03",
              title: "See real costs",
              desc: "Compare what neighbors actually paid — broken down by region, contractor type, and year.",
              icon: "💰",
              color: "#10b981",
            },
            {
              step: "04",
              title: "Fix it or hire smart",
              desc: "Follow the DIY guide or find a vetted local contractor who won't overcharge you.",
              icon: "🔨",
              color: "#8b5cf6",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl p-6 relative"
              style={{
                background: "linear-gradient(135deg, #1a2235 0%, #111827 100%)",
                border: "1px solid rgba(30, 45, 69, 0.8)",
              }}
            >
              <div
                className="text-3xl mb-4 w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: `rgba(${hexColor(item.color)}, 0.08)`, border: `1px solid rgba(${hexColor(item.color)}, 0.15)` }}
              >
                {item.icon}
              </div>
              <div className="text-xs font-bold mb-2" style={{ color: item.color, letterSpacing: "0.1em" }}>STEP {item.step}</div>
              <h3 className="font-bold text-base mb-2" style={{ color: "#f1f5f9" }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── LIVE ACTIVITY FEED ────────────────────────── */}
      <section style={{ background: "rgba(17, 24, 39, 0.5)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label mb-2">Community Activity</div>
              <h2 className="text-3xl font-black mb-4" style={{ color: "#f1f5f9" }}>Happening right now</h2>
              <p className="text-base mb-8" style={{ color: "#94a3b8" }}>
                Real homeowners sharing real repairs, costs, and solutions — every minute of every day.
              </p>
              <Link href="/community" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold btn-primary text-sm">
                Join the Community
              </Link>
            </div>

            <div className="space-y-3">
              {recentActivity.map((item, i) => {
                const typeConfig = {
                  solve: { icon: "✅", color: "#34d399", bg: "rgba(16, 185, 129, 0.08)" },
                  cost: { icon: "💰", color: "#fbbf24", bg: "rgba(245, 158, 11, 0.08)" },
                  question: { icon: "❓", color: "#60a5fa", bg: "rgba(59, 130, 246, 0.08)" },
                  log: { icon: "📋", color: "#a78bfa", bg: "rgba(139, 92, 246, 0.08)" },
                }[item.type] ?? { icon: "🔧", color: "#94a3b8", bg: "rgba(75, 96, 128, 0.08)" };

                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl p-3"
                    style={{ background: typeConfig.bg, border: `1px solid rgba(30, 45, 69, 0.5)` }}
                  >
                    <span className="text-base shrink-0 mt-0.5">{typeConfig.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm" style={{ color: "#94a3b8" }}>
                        <span className="font-semibold" style={{ color: "#f1f5f9" }}>{item.user}</span>
                        {" "}{item.action}{" "}
                        <span style={{ color: typeConfig.color }}>{item.item}</span>
                      </p>
                    </div>
                    <span className="text-xs shrink-0" style={{ color: "#4b6080" }}>{item.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── COST DATABASE TEASER ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div
          className="rounded-3xl p-8 sm:p-12 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a2235 0%, #0f1623 100%)",
            border: "1px solid rgba(30, 45, 69, 0.8)",
          }}
        >
          {/* Decorative glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(245, 158, 11, 0.06) 0%, transparent 70%)" }}
          />

          <div className="grid lg:grid-cols-2 gap-10 items-center relative">
            <div>
              <div className="section-label mb-3">Cost Database</div>
              <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: "#f1f5f9" }}>
                Know what repairs <span className="gradient-text">actually cost</span>
              </h2>
              <p className="text-base mb-6" style={{ color: "#94a3b8", lineHeight: "1.8" }}>
                Real cost submissions from real homeowners. Not estimates from contractors with an incentive to inflate. Filter by region, year, and project type to see what your neighbors paid.
              </p>
              <Link href="/costs" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold btn-primary text-sm">
                Explore Cost Data →
              </Link>
            </div>

            {/* Cost sample cards */}
            <div className="space-y-3">
              {[
                { project: "Roof replacement (2,000 sq ft)", region: "Southeast", low: 8900, high: 12500, samples: 47 },
                { project: "HVAC replacement (3-ton)", region: "National avg", low: 5200, high: 8400, samples: 128 },
                { project: "Water heater (50-gal gas)", region: "National avg", low: 900, high: 1900, samples: 213 },
              ].map((item) => (
                <div
                  key={item.project}
                  className="rounded-xl p-4 flex items-center justify-between gap-4"
                  style={{ background: "rgba(11, 15, 26, 0.6)", border: "1px solid rgba(30, 45, 69, 0.5)" }}
                >
                  <div>
                    <div className="text-sm font-semibold mb-0.5" style={{ color: "#f1f5f9" }}>{item.project}</div>
                    <div className="text-xs" style={{ color: "#4b6080" }}>{item.region} · {item.samples} submissions</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-base font-black" style={{ color: "#fbbf24" }}>
                      ${item.low.toLocaleString()}–${item.high.toLocaleString()}
                    </div>
                    <div className="text-xs" style={{ color: "#4b6080" }}>community range</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────────── */}
      <section style={{ background: "rgba(17, 24, 39, 0.5)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <div className="section-label mb-2">Real People, Real Savings</div>
            <h2 className="text-3xl font-black" style={{ color: "#f1f5f9" }}>What homeowners are saying</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl p-6"
                style={{
                  background: "linear-gradient(135deg, #1a2235 0%, #111827 100%)",
                  border: "1px solid rgba(30, 45, 69, 0.8)",
                }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => <span key={s} style={{ color: "#f59e0b" }}>★</span>)}
                </div>
                <p className="text-sm leading-relaxed mb-5 italic" style={{ color: "#94a3b8" }}>"{t.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold" style={{ color: "#f1f5f9" }}>{t.name}</div>
                    <div className="text-xs" style={{ color: "#4b6080" }}>{t.location}</div>
                  </div>
                  {t.saved !== "Unknown" && (
                    <div
                      className="text-sm font-black px-3 py-1 rounded-lg"
                      style={{ background: "rgba(16, 185, 129, 0.1)", color: "#34d399", border: "1px solid rgba(16, 185, 129, 0.2)" }}
                    >
                      Saved {t.saved}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div
          className="rounded-3xl py-16 px-8 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a1200 0%, #1a2235 50%, #0b0f1a 100%)",
            border: "1px solid rgba(245, 158, 11, 0.15)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center top, rgba(245, 158, 11, 0.08) 0%, transparent 60%)" }}
          />
          <div className="relative">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span style={{ color: "#f1f5f9" }}>Your home is trying</span>
              <br />
              <span className="gradient-text">to tell you something.</span>
            </h2>
            <p className="text-base mb-8" style={{ color: "#94a3b8", maxWidth: "480px", margin: "0 auto 32px" }}>
              Stop guessing. Start with a free search — every repair guide, cost estimate, and community answer is free.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/search" className="px-8 py-4 rounded-xl font-black text-base btn-primary">
                Search Any Problem — Free
              </Link>
              <Link href="/browse" className="px-8 py-4 rounded-xl font-bold text-base btn-ghost">
                Browse All Guides
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function hexColor(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "148, 163, 184";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
