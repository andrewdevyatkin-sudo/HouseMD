import type { Metadata } from "next";
import Link from "next/link";
import GuideCard from "@/components/GuideCard";
import SearchBar from "@/components/SearchBar";
import { guides } from "@/lib/data";

export const metadata: Metadata = {
  title: "Search Home Repair Guides",
  description: "Search thousands of home repair guides, cost estimates, and community Q&A answers.",
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";

  const results = query
    ? guides.filter((g) => {
        const q = query.toLowerCase();
        return (
          g.title.toLowerCase().includes(q) ||
          g.summary.toLowerCase().includes(q) ||
          g.tags.some((t) => t.toLowerCase().includes(q)) ||
          g.system.toLowerCase().includes(q) ||
          g.symptoms.some((s) => s.toLowerCase().includes(q))
        );
      })
    : guides;

  return (
    <div style={{ backgroundColor: "#0b0f1a", minHeight: "100vh" }}>
      {/* Search header */}
      <div style={{ background: "rgba(17, 24, 39, 0.5)", borderBottom: "1px solid rgba(30, 45, 69, 0.5)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-black mb-6" style={{ color: "#f1f5f9" }}>
            {query ? (
              <>Results for <span className="gradient-text">"{query}"</ span></>
            ) : (
              "Search Guides"
            )}
          </h1>
          <SearchBar size="inline" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Result count */}
        <p className="text-sm mb-6" style={{ color: "#4b6080" }}>
          {results.length === 0
            ? "No guides found"
            : `${results.length} guide${results.length !== 1 ? "s" : ""} found`}
          {query && <> for <span style={{ color: "#94a3b8" }}>"{query}"</span></>}
        </p>

        {results.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔧</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: "#94a3b8" }}>No guides found for "{query}"</h2>
            <p className="text-sm mb-6" style={{ color: "#4b6080" }}>
              Try different keywords, or ask the community directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/community" className="px-5 py-2.5 rounded-xl text-sm font-semibold btn-primary">
                Ask the Community
              </Link>
              <Link href="/browse" className="px-5 py-2.5 rounded-xl text-sm font-semibold btn-ghost">
                Browse All Guides
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        )}

        {/* Also ask community */}
        {query && results.length > 0 && (
          <div
            className="mt-12 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(30, 45, 69, 0.5)" }}
          >
            <div>
              <div className="font-bold mb-1" style={{ color: "#f1f5f9" }}>Didn't find exactly what you need?</div>
              <p className="text-sm" style={{ color: "#94a3b8" }}>Ask the HouseMD community — get answers from verified trade professionals.</p>
            </div>
            <Link
              href="/community"
              className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold btn-primary whitespace-nowrap"
            >
              Ask a Question →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
