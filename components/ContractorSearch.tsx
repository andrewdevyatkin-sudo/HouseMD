"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
];

const POPULAR_STATES = ["Texas","Florida","California","Georgia","North Carolina","Washington","Illinois","Colorado","Arizona","Ohio","Pennsylvania","New York"];

export default function ContractorSearch({
  initialState,
  initialSpecialty,
}: {
  initialState: string;
  initialSpecialty: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialState);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    setQuery(initialState);
  }, [initialState]);

  function handleInput(val: string) {
    setQuery(val);
    if (val.length > 0) {
      setSuggestions(
        US_STATES.filter((s) => s.toLowerCase().startsWith(val.toLowerCase())).slice(0, 6)
      );
    } else {
      setSuggestions([]);
    }
  }

  function selectState(state: string) {
    setQuery(state);
    setSuggestions([]);
    setFocused(false);
    navigate(state, initialSpecialty);
  }

  function clearState() {
    setQuery("");
    setSuggestions([]);
    navigate("", initialSpecialty);
  }

  function navigate(state: string, specialty: string) {
    const params = new URLSearchParams();
    if (state) params.set("state", state);
    if (specialty && specialty !== "All") params.set("specialty", specialty);
    startTransition(() => {
      router.push(`/contractors?${params.toString()}`);
    });
  }

  return (
    <div className="mb-8">
      {/* State search */}
      <div className="mb-5">
        <label className="block text-xs font-bold mb-2 tracking-widest uppercase" style={{ color: "#4b6080" }}>
          🗺️ Search by State
        </label>
        <div className="relative">
          <div
            className="flex items-center gap-3 rounded-2xl px-4"
            style={{
              background: "rgba(17, 24, 39, 0.9)",
              border: `1px solid ${focused ? "rgba(245, 158, 11, 0.4)" : "rgba(30, 45, 69, 0.8)"}`,
              boxShadow: focused ? "0 0 0 3px rgba(245, 158, 11, 0.08)" : "none",
              transition: "all 0.2s ease",
            }}
          >
            {/* Search icon */}
            <svg width="18" height="18" fill="none" stroke="#4b6080" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>

            <input
              id="contractor-state-search"
              type="text"
              value={query}
              onChange={(e) => handleInput(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && suggestions.length > 0) selectState(suggestions[0]);
                if (e.key === "Escape") { setSuggestions([]); setFocused(false); }
              }}
              placeholder="Type a state name… e.g. Texas, Florida, California"
              className="flex-1 bg-transparent outline-none py-4 text-base"
              style={{ color: "#f1f5f9", fontFamily: "inherit" }}
              autoComplete="off"
            />

            {/* Clear */}
            {query && (
              <button
                onClick={clearState}
                className="cursor-pointer shrink-0 p-1 rounded-lg"
                style={{ background: "none", border: "none", color: "#4b6080" }}
                aria-label="Clear state filter"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}

            {/* Search button */}
            <button
              id="contractor-search-btn"
              onClick={() => navigate(query, initialSpecialty)}
              className="shrink-0 px-4 py-2 rounded-xl text-sm font-bold cursor-pointer btn-primary"
            >
              Search
            </button>
          </div>

          {/* Autocomplete dropdown */}
          {focused && suggestions.length > 0 && (
            <div
              className="absolute top-full left-0 right-0 mt-1 rounded-2xl overflow-hidden z-30"
              style={{ background: "rgba(17, 24, 39, 0.98)", border: "1px solid rgba(30, 45, 69, 0.9)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
            >
              {suggestions.map((s) => (
                <button
                  key={s}
                  onMouseDown={() => selectState(s)}
                  className="w-full text-left px-5 py-3 text-sm cursor-pointer transition-all"
                  style={{ background: "none", border: "none", color: "#94a3b8", display: "flex", alignItems: "center", gap: "10px" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.06)"; (e.currentTarget as HTMLElement).style.color = "#f1f5f9"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "none"; (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}
                >
                  <svg width="14" height="14" fill="none" stroke="#f59e0b" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Popular state pills */}
      <div>
        <div className="text-xs font-bold mb-3 tracking-widest uppercase" style={{ color: "#4b6080" }}>
          Popular States
        </div>
        <div className="flex flex-wrap gap-2">
          {POPULAR_STATES.map((s) => {
            const isActive = query === s;
            return (
              <button
                key={s}
                id={`state-pill-${s.replace(/\s+/g, "-").toLowerCase()}`}
                onClick={() => selectState(s)}
                className="px-3 py-1.5 rounded-xl text-sm font-medium cursor-pointer transition-all"
                style={{
                  background: isActive ? "rgba(245, 158, 11, 0.12)" : "rgba(17, 24, 39, 0.8)",
                  border: isActive ? "1px solid rgba(245, 158, 11, 0.35)" : "1px solid rgba(30, 45, 69, 0.8)",
                  color: isActive ? "#fbbf24" : "#94a3b8",
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
