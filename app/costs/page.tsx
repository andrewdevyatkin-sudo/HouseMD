import type { Metadata } from "next";
import Link from "next/link";
import { costEntries } from "@/lib/data";
import { SubmitCostButton, UserCostSubmissions } from "@/components/InteractiveButtons";

export const metadata: Metadata = {
  title: "Home Repair Cost Database",
  description:
    "Real home repair cost data submitted by homeowners. See what your neighbors actually paid for roofing, HVAC, plumbing, electrical, and more — by region.",
};

const systems = ["All", "Roof", "HVAC", "Plumbing", "Electrical", "Foundation", "Interior", "Exterior"];
const regions = ["All", "Southeast", "Northeast", "Midwest", "Southwest", "Northwest", "West"];

const contractorTypeColors: Record<string, { color: string; bg: string; border: string }> = {
  DIY: { color: "#34d399", bg: "rgba(16, 185, 129, 0.1)", border: "rgba(16, 185, 129, 0.2)" },
  "Local Contractor": { color: "#60a5fa", bg: "rgba(59, 130, 246, 0.1)", border: "rgba(59, 130, 246, 0.2)" },
  "National Chain": { color: "#f87171", bg: "rgba(239, 68, 68, 0.1)", border: "rgba(239, 68, 68, 0.2)" },
};

const projectAggregates = [
  {
    name: "Roof Replacement",
    system: "Roof",
    national: { low: 8200, high: 16500, median: 11400 },
    samples: 142,
    trend: "+8% vs 2024",
  },
  {
    name: "HVAC System (Central AC)",
    system: "HVAC",
    national: { low: 4800, high: 9200, median: 6400 },
    samples: 289,
    trend: "+5% vs 2024",
  },
  {
    name: "Water Heater (50-gal gas)",
    system: "Plumbing",
    national: { low: 850, high: 2100, median: 1350 },
    samples: 413,
    trend: "+3% vs 2024",
  },
  {
    name: "Electrical Panel (200A upgrade)",
    system: "Electrical",
    national: { low: 1800, high: 4200, median: 2600 },
    samples: 98,
    trend: "+12% vs 2024",
  },
  {
    name: "Bathroom Remodel (full gut)",
    system: "Interior",
    national: { low: 8500, high: 28000, median: 15200 },
    samples: 201,
    trend: "+6% vs 2024",
  },
  {
    name: "Deck (400 sq ft, pressure-treated)",
    system: "Exterior",
    national: { low: 7800, high: 16500, median: 11000 },
    samples: 88,
    trend: "-2% vs 2024",
  },
];

export default async function CostsPage({
  searchParams,
}: {
  searchParams: Promise<{ system?: string; region?: string }>;
}) {
  const params = await searchParams;
  const activeSystem = params.system || "All";
  const activeRegion = params.region || "All";

  const filtered = costEntries.filter((c) => {
    const sysMatch = activeSystem === "All" || c.system === activeSystem;
    const regMatch = activeRegion === "All" || c.region === activeRegion;
    return sysMatch && regMatch;
  });

  return (
    <div style={{ backgroundColor: "#0b0f1a", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="relative overflow-hidden"
        style={{ background: "rgba(17, 24, 39, 0.5)", borderBottom: "1px solid rgba(30, 45, 69, 0.5)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16, 185, 129, 0.06) 0%, transparent 60%)" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="section-label mb-3" style={{ color: "#34d399" }}>💰 Cost Database</div>
          <h1 className="text-4xl font-black mb-4" style={{ color: "#f1f5f9" }}>
            What did it actually cost?
          </h1>
          <p className="text-base mb-6" style={{ color: "#94a3b8", maxWidth: "580px", lineHeight: "1.8" }}>
            Real repair costs submitted by real homeowners. Not contractor estimates — actual invoices. Filter by region and project type to see what your neighbors paid.
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 rounded-xl text-sm" style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", color: "#34d399" }}>
              ✓ {costEntries.length} verified submissions
            </div>
            <div className="px-4 py-2 rounded-xl text-sm" style={{ background: "rgba(59, 130, 246, 0.08)", border: "1px solid rgba(59, 130, 246, 0.2)", color: "#60a5fa" }}>
              Updated May 2026
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* National Averages */}
        <div className="mb-12">
          <h2 className="text-xl font-black mb-6" style={{ color: "#f1f5f9" }}>📊 National Cost Ranges (2026)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectAggregates.map((proj) => (
              <div
                key={proj.name}
                className="rounded-2xl p-5"
                style={{ background: "linear-gradient(135deg, #1a2235 0%, #111827 100%)", border: "1px solid rgba(30, 45, 69, 0.8)" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-bold text-sm mb-1" style={{ color: "#f1f5f9" }}>{proj.name}</div>
                    <div className="text-xs" style={{ color: "#4b6080" }}>{proj.samples} submissions</div>
                  </div>
                  <span
                    className="text-xs px-2 py-1 rounded-lg font-semibold"
                    style={{
                      background: proj.trend.startsWith("-") ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)",
                      color: proj.trend.startsWith("-") ? "#f87171" : "#34d399",
                    }}
                  >
                    {proj.trend}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="text-2xl font-black mb-0.5" style={{ color: "#fbbf24" }}>
                    ${proj.national.low.toLocaleString()}–${proj.national.high.toLocaleString()}
                  </div>
                  <div className="text-xs" style={{ color: "#4b6080" }}>
                    Median: <span style={{ color: "#94a3b8", fontWeight: 600 }}>${proj.national.median.toLocaleString()}</span>
                  </div>
                </div>

                {/* Range bar */}
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: "60%" }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1" style={{ color: "#4b6080" }}>
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <h2 className="text-xl font-black" style={{ color: "#f1f5f9" }}>🗂️ Community Submissions</h2>

          {/* User's own persisted submissions appear here */}
          <UserCostSubmissions />

          <div>
            <div className="text-xs font-bold mb-3 tracking-widest uppercase" style={{ color: "#4b6080" }}>System</div>
            <div className="flex flex-wrap gap-2">
              {systems.map((sys) => {
                const isActive = sys === activeSystem;
                return (
                  <Link
                    key={sys}
                    href={`/costs?system=${encodeURIComponent(sys)}&region=${encodeURIComponent(activeRegion)}`}
                    scroll={false}
                    className="px-3 py-1.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: isActive ? "rgba(16, 185, 129, 0.12)" : "rgba(17, 24, 39, 0.8)",
                      border: isActive ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(30, 45, 69, 0.8)",
                      color: isActive ? "#34d399" : "#94a3b8",
                    }}
                  >
                    {sys}
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold mb-3 tracking-widest uppercase" style={{ color: "#4b6080" }}>Region</div>
            <div className="flex flex-wrap gap-2">
              {regions.map((reg) => {
                const isActive = reg === activeRegion;
                return (
                  <Link
                    key={reg}
                    href={`/costs?system=${encodeURIComponent(activeSystem)}&region=${encodeURIComponent(reg)}`}
                    scroll={false}
                    className="px-3 py-1.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: isActive ? "rgba(245, 158, 11, 0.12)" : "rgba(17, 24, 39, 0.8)",
                      border: isActive ? "1px solid rgba(245, 158, 11, 0.3)" : "1px solid rgba(30, 45, 69, 0.8)",
                      color: isActive ? "#fbbf24" : "#94a3b8",
                    }}
                  >
                    {reg}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submissions table */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm" style={{ color: "#4b6080" }}>
              {filtered.length} submission{filtered.length !== 1 ? "s" : ""}
            </p>
            <SubmitCostButton />
          </div>

          <div className="space-y-3">
            {filtered.map((entry) => {
              const ctConfig = contractorTypeColors[entry.contractorType];
              return (
                <div
                  key={entry.id}
                  className="rounded-2xl p-5"
                  style={{ background: "linear-gradient(135deg, #1a2235 0%, #111827 100%)", border: "1px solid rgba(30, 45, 69, 0.8)" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="font-bold mb-1" style={{ color: "#f1f5f9" }}>{entry.project}</div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs" style={{ color: "#4b6080" }}>📍 {entry.city}</span>
                        <span className="text-xs" style={{ color: "#4b6080" }}>· {entry.year}</span>
                        <span
                          className="tag"
                          style={{ background: ctConfig.bg, color: ctConfig.color, border: `1px solid ${ctConfig.border}` }}
                        >
                          {entry.contractorType}
                        </span>
                      </div>
                      {entry.notes && (
                        <p className="text-sm italic leading-relaxed" style={{ color: "#94a3b8" }}>
                          "{entry.notes}"
                        </p>
                      )}
                      <div className="text-xs mt-2" style={{ color: "#4b6080" }}>
                        Submitted by <span style={{ color: "#94a3b8" }}>{entry.submittedBy}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-2xl font-black" style={{ color: "#fbbf24" }}>
                        ${entry.costPaid.toLocaleString()}
                      </div>
                      <div className="text-xs" style={{ color: "#4b6080" }}>total paid</div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <div className="text-4xl mb-3">📊</div>
                <p className="font-bold mb-1" style={{ color: "#94a3b8" }}>No submissions for this filter</p>
                <p className="text-sm" style={{ color: "#4b6080" }}>Be the first to submit data for this region + system</p>
              </div>
            )}
          </div>
        </div>

        {/* Submit CTA */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, #1a2235 0%, #111827 100%)", border: "1px solid rgba(16, 185, 129, 0.2)" }}
        >
          <div className="text-4xl mb-3">💬</div>
          <h2 className="text-2xl font-black mb-3" style={{ color: "#f1f5f9" }}>
            Recently completed a repair?
          </h2>
          <p className="text-sm mb-6" style={{ color: "#94a3b8", maxWidth: "420px", margin: "0 auto 24px" }}>
            Share what you paid and help your neighbors make informed decisions. It takes 2 minutes and makes a real difference.
          </p>
          <SubmitCostButton />
        </div>
      </div>
    </div>
  );
}
