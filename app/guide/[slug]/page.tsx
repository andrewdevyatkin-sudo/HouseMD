import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "@/lib/data";
import { SaveGuideButton } from "@/components/InteractiveButtons";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.summary,
  };
}

const difficultyConfig: Record<string, { color: string; bg: string; border: string; icon: string }> = {
  "DIY Easy":             { color: "#34d399", bg: "rgba(16, 185, 129, 0.1)",  border: "rgba(16, 185, 129, 0.2)",  icon: "🟢" },
  "DIY Medium":           { color: "#fbbf24", bg: "rgba(245, 158, 11, 0.1)",  border: "rgba(245, 158, 11, 0.2)",  icon: "🟡" },
  "DIY Moderate":         { color: "#fbbf24", bg: "rgba(245, 158, 11, 0.1)",  border: "rgba(245, 158, 11, 0.2)",  icon: "🟡" },
  "DIY Hard":             { color: "#f97316", bg: "rgba(249, 115, 22, 0.1)",  border: "rgba(249, 115, 22, 0.2)",  icon: "🟠" },
  "DIY Advanced":         { color: "#f97316", bg: "rgba(249, 115, 22, 0.1)",  border: "rgba(249, 115, 22, 0.2)",  icon: "🟠" },
  "Hire Pro":             { color: "#f87171", bg: "rgba(239, 68, 68, 0.1)",   border: "rgba(239, 68, 68, 0.2)",   icon: "🔴" },
  "Know Before You Call": { color: "#c084fc", bg: "rgba(192, 132, 252, 0.1)", border: "rgba(192, 132, 252, 0.2)", icon: "📞" },
  "Seasonal":             { color: "#34d399", bg: "rgba(16, 185, 129, 0.1)",  border: "rgba(16, 185, 129, 0.2)",  icon: "📅" },
};

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const diff = difficultyConfig[guide.difficulty] ?? { color: "#94a3b8", bg: "rgba(148,163,184,0.1)", border: "rgba(148,163,184,0.2)", icon: "📋" };
  const relatedGuides = guides.filter((g) => g.system === guide.system && g.id !== guide.id).slice(0, 3);

  return (
    <div style={{ backgroundColor: "#0b0f1a", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="flex items-center gap-2 text-sm" style={{ color: "#4b6080" }}>
          <Link href="/" style={{ color: "#4b6080", textDecoration: "none" }}>Home</Link>
          <span>›</span>
          <Link href="/browse" style={{ color: "#4b6080", textDecoration: "none" }}>Browse</Link>
          <span>›</span>
          <Link href={`/browse?system=${guide.system}`} style={{ color: "#4b6080", textDecoration: "none" }}>{guide.system}</Link>
          <span>›</span>
          <span style={{ color: "#94a3b8" }}>{guide.title}</span>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <article className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className="tag"
                  style={{ background: "rgba(59, 130, 246, 0.1)", color: "#60a5fa", border: "1px solid rgba(59, 130, 246, 0.2)" }}
                >
                  {guide.system}
                </span>
                <span className="tag" style={{ background: diff.bg, color: diff.color, border: `1px solid ${diff.border}` }}>
                  {diff.icon} {guide.difficulty}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: "#f1f5f9", lineHeight: "1.15" }}>
                {guide.title}
              </h1>

              <p className="text-base leading-relaxed mb-6" style={{ color: "#94a3b8" }}>{guide.summary}</p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 pb-6" style={{ borderBottom: "1px solid rgba(30, 45, 69, 0.5)" }}>
                <div className="flex items-center gap-1.5 text-sm" style={{ color: "#94a3b8" }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  {guide.views.toLocaleString()} views
                </div>
                <div className="flex items-center gap-1.5 text-sm" style={{ color: "#94a3b8" }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
                  {guide.saves.toLocaleString()} saves
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span style={{ color: "#f59e0b" }}>★</span>
                  <span style={{ color: "#f1f5f9", fontWeight: 600 }}>{guide.rating}</span>
                  <span style={{ color: "#4b6080" }}>({guide.reviewCount.toLocaleString()} reviews)</span>
                </div>
                <div className="text-sm" style={{ color: "#4b6080" }}>
                  By <span style={{ color: "#94a3b8" }}>{guide.author}</span>
                </div>
              </div>
            </div>

            {/* Symptoms */}
            <div className="mb-8">
              <h2 className="text-xl font-black mb-4" style={{ color: "#f1f5f9" }}>
                🔍 Common Symptoms
              </h2>
              <div
                className="rounded-2xl p-5"
                style={{ background: "rgba(59, 130, 246, 0.05)", border: "1px solid rgba(59, 130, 246, 0.15)" }}
              >
                <ul className="space-y-2">
                  {guide.symptoms.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#94a3b8" }}>
                      <span className="mt-1" style={{ color: "#3b82f6", flexShrink: 0 }}>✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Steps */}
            <div className="mb-8">
              <h2 className="text-xl font-black mb-6" style={{ color: "#f1f5f9" }}>
                🔨 Step-by-Step Fix
              </h2>
              <div className="space-y-4">
                {guide.steps.map((step, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-5"
                    style={{
                      background: "linear-gradient(135deg, #1a2235 0%, #111827 100%)",
                      border: "1px solid rgba(30, 45, 69, 0.8)",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shrink-0"
                        style={{
                          background: "rgba(245, 158, 11, 0.1)",
                          border: "1px solid rgba(245, 158, 11, 0.2)",
                          color: "#fbbf24",
                        }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-bold mb-1.5" style={{ color: "#f1f5f9" }}>{step.title}</h3>
                        <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools + Materials */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl p-5" style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(30, 45, 69, 0.5)" }}>
                <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: "#f1f5f9" }}>
                  <span>🛠️</span> Tools Needed
                </h3>
                <ul className="space-y-1.5">
                  {guide.tools.map((t, i) => (
                    <li key={i} className="text-sm flex items-start gap-2" style={{ color: "#94a3b8" }}>
                      <span style={{ color: "#4b6080", flexShrink: 0 }}>·</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl p-5" style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(30, 45, 69, 0.5)" }}>
                <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: "#f1f5f9" }}>
                  <span>🧰</span> Materials
                </h3>
                <ul className="space-y-1.5">
                  {guide.materials.map((m, i) => (
                    <li key={i} className="text-sm flex items-start gap-2" style={{ color: "#94a3b8" }}>
                      <span style={{ color: "#4b6080", flexShrink: 0 }}>·</span>{m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {guide.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="tag tag-gray"
                    style={{ textDecoration: "none" }}
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div
              className="rounded-xl p-4 text-sm leading-relaxed"
              style={{ background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.15)", color: "#f87171" }}
            >
              ⚠️ <strong>Disclaimer:</strong> This guide is for informational purposes. Always follow local building codes. For electrical, gas, structural, and load-bearing work, consult a licensed professional.
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-4">
            {/* Quick stats */}
            <div className="rounded-2xl p-5 sticky top-24" style={{ background: "linear-gradient(135deg, #1a2235 0%, #111827 100%)", border: "1px solid rgba(30, 45, 69, 0.8)" }}>
              <h3 className="font-bold text-sm mb-5 uppercase tracking-wider" style={{ color: "#f59e0b", letterSpacing: "0.08em" }}>
                Quick Reference
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="text-xs mb-1" style={{ color: "#4b6080" }}>Estimated Cost</div>
                  <div className="text-2xl font-black gradient-text">${guide.costLow}–${guide.costHigh}</div>
                </div>

                <div style={{ height: "1px", background: "#1e2d45" }} />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs mb-1" style={{ color: "#4b6080" }}>Time</div>
                    <div className="text-sm font-bold" style={{ color: "#f1f5f9" }}>{guide.timeEstimate}</div>
                  </div>
                  <div>
                    <div className="text-xs mb-1" style={{ color: "#4b6080" }}>Steps</div>
                    <div className="text-sm font-bold" style={{ color: "#f1f5f9" }}>{guide.steps.length}</div>
                  </div>
                  <div>
                    <div className="text-xs mb-1" style={{ color: "#4b6080" }}>Difficulty</div>
                    <div className="text-sm font-bold" style={{ color: diff.color }}>{guide.difficulty}</div>
                  </div>
                  <div>
                    <div className="text-xs mb-1" style={{ color: "#4b6080" }}>Rating</div>
                    <div className="text-sm font-bold" style={{ color: "#fbbf24" }}>★ {guide.rating}</div>
                  </div>
                </div>

                <div style={{ height: "1px", background: "#1e2d45" }} />

                <SaveGuideButton guideTitle={guide.title} />
                <Link href="/costs" className="block w-full text-center py-2.5 px-4 rounded-xl text-sm font-bold btn-primary" style={{ textDecoration: "none" }}>
                  See Real Cost Data
                </Link>
                <Link href="/contractors" className="block w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold btn-ghost" style={{ textDecoration: "none" }}>
                  Find a Contractor
                </Link>
                <Link href="/community" className="block w-full text-center py-2.5 px-4 rounded-xl text-sm font-medium" style={{ color: "#94a3b8", textDecoration: "none" }}>
                  Ask the Community →
                </Link>
              </div>
            </div>

            {/* Related guides */}
            {relatedGuides.length > 0 && (
              <div className="rounded-2xl p-5" style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(30, 45, 69, 0.5)" }}>
                <h3 className="font-bold text-sm mb-4" style={{ color: "#94a3b8" }}>More {guide.system} Guides</h3>
                <div className="space-y-3">
                  {relatedGuides.map((g) => (
                    <Link key={g.id} href={`/guide/${g.slug}`} className="block group" style={{ textDecoration: "none" }}>
                      <div className="text-sm font-medium transition-colors" style={{ color: "#f1f5f9" }}>
                        {g.title}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "#4b6080" }}>
                        ${g.costLow}–${g.costHigh} · {g.difficulty}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
