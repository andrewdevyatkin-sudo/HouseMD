import type { Metadata } from "next";
import Link from "next/link";
import { contractors } from "@/lib/data";
import ContractorSearch from "@/components/ContractorSearch";
import ContractorCard from "@/components/ContractorCard";

export const metadata: Metadata = {
  title: "Find Local Home Repair Contractors by State",
  description:
    "Browse verified, community-reviewed home repair contractors by state. Search your state to find plumbers, electricians, roofers, HVAC techs, and more — no pay-to-play listings.",
};

const specialties = ["All", "Plumbing", "HVAC", "Electrical", "Roof", "Foundation", "Interior", "Exterior", "Appliances", "Safety"];

function PriceRangeIndicator({ range }: { range: "$" | "$$" | "$$$" }) {
  return (
    <div className="flex gap-0.5">
      {["$", "$", "$"].map((_, i) => (
        <span key={i} className="text-sm font-bold" style={{ color: i < range.length ? "#fbbf24" : "#1e2d45" }}>$</span>
      ))}
    </div>
  );
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill={star <= Math.round(rating) ? "#f59e0b" : "rgba(75, 96, 128, 0.4)"}>
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        ))}
      </div>
      <span className="text-sm font-bold" style={{ color: "#f1f5f9" }}>{rating.toFixed(1)}</span>
      <span className="text-xs" style={{ color: "#4b6080" }}>({count} reviews)</span>
    </div>
  );
}

// Next.js 15: searchParams is a Promise and must be awaited
export default async function ContractorsPage({
  searchParams,
}: {
  searchParams: Promise<{ specialty?: string; state?: string }>;
}) {
  const params = await searchParams;
  const activeSpecialty = params.specialty || "All";
  const activeState = params.state || "";

  const filtered = contractors.filter((c) => {
    const specMatch = activeSpecialty === "All" || c.specialty.includes(activeSpecialty as never);
    const stateMatch =
      !activeState ||
      c.state.toLowerCase().includes(activeState.toLowerCase()) ||
      c.stateAbbr.toLowerCase() === activeState.toLowerCase();
    return specMatch && stateMatch;
  });

  const hasStateFilter = activeState.length > 0;

  return (
    <div style={{ backgroundColor: "#0b0f1a", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "rgba(17, 24, 39, 0.5)", borderBottom: "1px solid rgba(30, 45, 69, 0.5)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="section-label mb-3" style={{ color: "#60a5fa" }}>🔍 Contractor Directory</div>
          <h1 className="text-4xl font-black mb-4" style={{ color: "#f1f5f9" }}>
            {hasStateFilter
              ? `Contractors in ${activeState}`
              : "Find Trusted Local Contractors"}
          </h1>
          <p className="text-base mb-6" style={{ color: "#94a3b8", maxWidth: "560px" }}>
            Community-reviewed professionals in every U.S. state. No pay-to-play listings. Every contractor was reviewed by real homeowners who hired them.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="text-sm px-3 py-1.5 rounded-xl" style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", color: "#34d399" }}>✓ Background checked</span>
            <span className="text-sm px-3 py-1.5 rounded-xl" style={{ background: "rgba(59, 130, 246, 0.08)", border: "1px solid rgba(59, 130, 246, 0.2)", color: "#60a5fa" }}>✓ License verified</span>
            <span className="text-sm px-3 py-1.5 rounded-xl" style={{ background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)", color: "#fbbf24" }}>✓ All 50 states covered</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* State search — client component */}
        <ContractorSearch initialState={activeState} initialSpecialty={activeSpecialty} />

        {/* Specialty filter */}
        <div className="mb-8">
          <div className="text-xs font-bold mb-3 tracking-widest uppercase" style={{ color: "#4b6080" }}>Filter by Specialty</div>
          <div className="flex flex-wrap gap-2">
            {specialties.map((spec) => {
              const isActive = spec === activeSpecialty;
              const p = new URLSearchParams();
              if (activeState) p.set("state", activeState);
              if (spec !== "All") p.set("specialty", spec);
              return (
                <Link
                  key={spec}
                  href={`/contractors?${p.toString()}`}
                  scroll={false}
                  className="px-3 py-1.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: isActive ? "rgba(59, 130, 246, 0.12)" : "rgba(17, 24, 39, 0.8)",
                    border: isActive ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid rgba(30, 45, 69, 0.8)",
                    color: isActive ? "#60a5fa" : "#94a3b8",
                    textDecoration: "none",
                  }}
                >
                  {spec}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Results count + active filter pills */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <p className="text-sm" style={{ color: "#4b6080" }}>
            <span style={{ color: "#f1f5f9", fontWeight: 700 }}>{filtered.length}</span>
            {" "}contractor{filtered.length !== 1 ? "s" : ""} found
            {hasStateFilter && <span> in <strong style={{ color: "#94a3b8" }}>{activeState}</strong></span>}
            {activeSpecialty !== "All" && <span> · <strong style={{ color: "#94a3b8" }}>{activeSpecialty}</strong></span>}
          </p>
          {hasStateFilter && (
            <Link
              href={`/contractors${activeSpecialty !== "All" ? `?specialty=${activeSpecialty}` : ""}`}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg"
              style={{ background: "rgba(245, 158, 11, 0.1)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.2)", textDecoration: "none" }}
            >
              {activeState} ✕
            </Link>
          )}
          {activeSpecialty !== "All" && (
            <Link
              href={`/contractors${hasStateFilter ? `?state=${activeState}` : ""}`}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg"
              style={{ background: "rgba(59, 130, 246, 0.1)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)", textDecoration: "none" }}
            >
              {activeSpecialty} ✕
            </Link>
          )}
        </div>

        {/* No results state */}
        {filtered.length === 0 && (
          <div
            className="rounded-2xl p-12 text-center"
            style={{ background: "linear-gradient(135deg, #1a2235 0%, #111827 100%)", border: "1px solid rgba(30, 45, 69, 0.8)" }}
          >
            <div className="text-5xl mb-4">🗺️</div>
            <h2 className="text-xl font-black mb-2" style={{ color: "#f1f5f9" }}>
              No {activeSpecialty !== "All" ? activeSpecialty + " " : ""}contractors yet in {activeState}
            </h2>
            <p className="text-sm mb-6" style={{ color: "#94a3b8", maxWidth: "400px", margin: "0 auto 24px" }}>
              Try removing the specialty filter, or click below to see all states. Are you a contractor in {activeState}? List for free.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/contractors" className="px-5 py-2.5 rounded-xl text-sm font-bold btn-primary" style={{ textDecoration: "none" }}>
                Show All Contractors
              </Link>
              <Link href="#" className="px-5 py-2.5 rounded-xl text-sm font-semibold btn-ghost" style={{ textDecoration: "none" }}>
                List Your Business
              </Link>
            </div>
          </div>
        )}

        {/* Contractor cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map((contractor) => (
            <ContractorCard key={contractor.id} contractor={contractor} />
          ))}
        </div>

        {/* Add contractor CTA */}
        {filtered.length > 0 && (
          <div className="mt-12 rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #1a2235 0%, #111827 100%)", border: "1px solid rgba(59, 130, 246, 0.2)" }}>
            <div className="text-4xl mb-3">🔧</div>
            <h2 className="text-2xl font-black mb-3" style={{ color: "#f1f5f9" }}>Are you a contractor?</h2>
            <p className="text-sm mb-6" style={{ color: "#94a3b8", maxWidth: "420px", margin: "0 auto 24px" }}>
              List your business for free. Get reviews, show your work, build trust with homeowners in your area. We never charge per lead.
            </p>
            <Link href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold btn-primary text-sm" style={{ textDecoration: "none" }}>
              List Your Business — Free
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
