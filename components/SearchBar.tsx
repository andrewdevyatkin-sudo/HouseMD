"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const suggestions = [
  "toilet runs constantly",
  "HVAC won't turn on",
  "brown stain on ceiling",
  "water heater pilot light",
  "deck boards warping",
  "circuit breaker tripping",
  "door won't close in summer",
  "garbage disposal humming",
  "attic insulation R-value",
  "foundation crack types",
];

export default function SearchBar({ size = "hero" }: { size?: "hero" | "inline" }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const filtered = query.length > 1 ? suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase())) : [];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  function handleSuggestion(s: string) {
    setQuery(s);
    router.push(`/search?q=${encodeURIComponent(s)}`);
  }

  const isHero = size === "hero";

  return (
    <div className="relative w-full" style={{ maxWidth: isHero ? "700px" : "500px" }}>
      <form onSubmit={handleSubmit}>
        <div
          className="relative flex items-center rounded-2xl transition-all duration-300"
          style={{
            background: "rgba(17, 24, 39, 0.9)",
            border: focused ? "1px solid rgba(245, 158, 11, 0.5)" : "1px solid rgba(30, 45, 69, 0.8)",
            boxShadow: focused ? "0 0 0 4px rgba(245, 158, 11, 0.08), 0 20px 60px rgba(0,0,0,0.4)" : "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          <div className="absolute left-4 pointer-events-none" style={{ color: "#4b6080" }}>
            <svg width={isHero ? "20" : "16"} height={isHero ? "20" : "16"} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <input
            id="main-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            placeholder={isHero ? "Describe your problem… e.g. 'toilet keeps running' or 'AC won't start'" : "Search guides…"}
            className="w-full bg-transparent font-medium outline-none"
            style={{
              padding: isHero ? "18px 20px 18px 52px" : "12px 12px 12px 44px",
              fontSize: isHero ? "16px" : "14px",
              color: "#f1f5f9",
            }}
          />
          <button
            type="submit"
            id="search-submit-btn"
            className="shrink-0 font-bold rounded-xl btn-primary cursor-pointer"
            style={{ padding: isHero ? "12px 24px" : "8px 16px", fontSize: isHero ? "15px" : "13px", margin: "6px" }}
          >
            {isHero ? "Diagnose" : "Search"}
          </button>
        </div>
      </form>

      {/* Suggestions */}
      {focused && filtered.length > 0 && (
        <div
          className="absolute top-full mt-2 w-full rounded-xl overflow-hidden z-50"
          style={{
            background: "rgba(17, 24, 39, 0.98)",
            border: "1px solid rgba(30, 45, 69, 0.8)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            backdropFilter: "blur(16px)",
          }}
        >
          {filtered.map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors cursor-pointer"
              style={{ color: "#94a3b8", borderBottom: "1px solid rgba(30, 45, 69, 0.4)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(30, 45, 69, 0.5)";
                (e.currentTarget as HTMLElement).style.color = "#f1f5f9";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#94a3b8";
              }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: "#4b6080", flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
