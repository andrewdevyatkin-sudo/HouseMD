import type { Metadata } from "next";
import Link from "next/link";
import GuideCard from "@/components/GuideCard";
import SearchBar from "@/components/SearchBar";
import { guides, homeSystems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Browse Home Repair Guides",
  description: "Browse all home repair and maintenance guides by system — plumbing, HVAC, electrical, roofing, and more.",
};

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ system?: string; difficulty?: string }>;
}) {
  const params = await searchParams;
  const activeSystem = params.system || "All";
  const activeDifficulty = params.difficulty || "All";

  const filteredGuides = guides.filter((g) => {
    const sysMatch = activeSystem === "All" || g.system === activeSystem;
    const diffMatch = activeDifficulty === "All" || g.difficulty === activeDifficulty;
    return sysMatch && diffMatch;
  });

  const systemNames = ["All", ...homeSystems.map((s) => s.name)];
  const difficulties = ["All", "DIY Easy", "DIY Moderate", "DIY Medium", "DIY Advanced", "DIY Hard", "Know Before You Call", "Hire Pro"];

  return (
    <div style={{ backgroundColor: "#0b0f1a", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "rgba(17, 24, 39, 0.5)", borderBottom: "1px solid rgba(30, 45, 69, 0.5)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="section-label mb-3">Knowledge Base</div>
          <h1 className="text-4xl font-black mb-4" style={{ color: "#f1f5f9" }}>Browse Repair Guides</h1>
          <p className="text-base mb-8" style={{ color: "#94a3b8", maxWidth: "560px" }}>
            {guides.length} guides covering every part of your home — searchable, filterable, community-verified.
          </p>
          <SearchBar size="inline" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* System filter */}
          <div>
            <div className="text-xs font-bold mb-3 tracking-widest uppercase" style={{ color: "#4b6080" }}>
              Filter by System
            </div>
            <div className="flex flex-wrap gap-2">
              {systemNames.map((sys) => {
                const isActive = sys === activeSystem;
                return (
                  <Link
                    key={sys}
                    href={`/browse?system=${encodeURIComponent(sys)}&difficulty=${encodeURIComponent(activeDifficulty)}`}
                    scroll={false}
                    className="px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      background: isActive ? "rgba(245, 158, 11, 0.15)" : "rgba(17, 24, 39, 0.8)",
                      border: isActive ? "1px solid rgba(245, 158, 11, 0.4)" : "1px solid rgba(30, 45, 69, 0.8)",
                      color: isActive ? "#fbbf24" : "#94a3b8",
                    }}
                  >
                    {sys}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Difficulty filter */}
          <div>
            <div className="text-xs font-bold mb-3 tracking-widest uppercase" style={{ color: "#4b6080" }}>
              Difficulty
            </div>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((diff) => {
                const isActive = diff === activeDifficulty;
                const colorMap: Record<string, string> = {
                  "DIY Easy": "#34d399",
                  "DIY Medium": "#fbbf24",
                  "DIY Hard": "#f97316",
                  "Hire Pro": "#f87171",
                  "All": "#94a3b8",
                };
                const color = colorMap[diff];
                return (
                  <Link
                    key={diff}
                    href={`/browse?system=${encodeURIComponent(activeSystem)}&difficulty=${encodeURIComponent(diff)}`}
                    scroll={false}
                    className="px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      background: isActive ? `rgba(${hexToRgb(color)}, 0.12)` : "rgba(17, 24, 39, 0.8)",
                      border: isActive ? `1px solid rgba(${hexToRgb(color)}, 0.3)` : "1px solid rgba(30, 45, 69, 0.8)",
                      color: isActive ? color : "#94a3b8",
                    }}
                  >
                    {diff}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm" style={{ color: "#4b6080" }}>
            Showing <span style={{ color: "#94a3b8", fontWeight: 600 }}>{filteredGuides.length}</span> guides
            {activeSystem !== "All" && <> in <span style={{ color: "#fbbf24" }}>{activeSystem}</span></>}
          </p>
          <div className="flex items-center gap-2 text-sm" style={{ color: "#4b6080" }}>
            Sort: <span style={{ color: "#94a3b8" }}>Most Popular</span>
          </div>
        </div>

        {/* Guide grid */}
        {filteredGuides.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2" style={{ color: "#94a3b8" }}>No guides found</h3>
            <p className="text-sm mb-6" style={{ color: "#4b6080" }}>Try a different filter combination</p>
            <Link href="/browse" className="px-5 py-2.5 rounded-xl text-sm font-semibold btn-primary">
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "148, 163, 184";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
