import type { Metadata } from "next";
import Link from "next/link";
import { qaThreads } from "@/lib/data";
import { AskQuestionBox, VoteButton } from "@/components/CommunityInteractions";

export const metadata: Metadata = {
  title: "Community Q&A — Home Repair Help",
  description:
    "Ask any home repair question and get answers from verified trade professionals and experienced homeowners.",
};

const systems = ["All", "Plumbing", "HVAC", "Electrical", "Roof", "Foundation", "Appliances", "Interior", "Safety"];

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date("2026-05-28");
  const days = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ system?: string; filter?: string }>;
}) {
  const params = await searchParams;
  const activeSystem = params.system || "All";
  const activeFilter = params.filter || "recent";

  const filtered = qaThreads.filter((t) => {
    const sysMatch = activeSystem === "All" || t.system === activeSystem;
    return sysMatch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (activeFilter === "top") return b.votes - a.votes;
    if (activeFilter === "unanswered") return a.answers - b.answers;
    return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
  });

  return (
    <div style={{ backgroundColor: "#0b0f1a", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "rgba(17, 24, 39, 0.5)", borderBottom: "1px solid rgba(30, 45, 69, 0.5)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="section-label mb-3" style={{ color: "#a78bfa" }}>💬 Community</div>
              <h1 className="text-4xl font-black mb-3" style={{ color: "#f1f5f9" }}>Ask Anything About Your Home</h1>
              <p className="text-base" style={{ color: "#94a3b8", maxWidth: "520px" }}>
                Real answers from verified trade professionals and experienced homeowners. No ads, no upselling.
              </p>
            </div>
            <Link
              href="#ask"
              className="shrink-0 px-6 py-3 rounded-xl font-bold text-sm btn-primary"
              id="ask-question-btn"
              style={{ textDecoration: "none" }}
            >
              + Ask a Question
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main threads */}
          <div className="lg:col-span-3">
            {/* Filters bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex gap-2">
                {[
                  { label: "Recent", value: "recent" },
                  { label: "Top Voted", value: "top" },
                  { label: "Unanswered", value: "unanswered" },
                ].map((f) => {
                  const isActive = f.value === activeFilter;
                  return (
                    <Link
                      key={f.value}
                      href={`/community?system=${activeSystem}&filter=${f.value}`}
                      scroll={false}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                      style={{
                        background: isActive ? "rgba(139, 92, 246, 0.12)" : "rgba(17, 24, 39, 0.8)",
                        border: isActive ? "1px solid rgba(139, 92, 246, 0.3)" : "1px solid rgba(30, 45, 69, 0.8)",
                        color: isActive ? "#a78bfa" : "#94a3b8",
                        textDecoration: "none",
                      }}
                    >
                      {f.label}
                    </Link>
                  );
                })}
              </div>
              <p className="text-sm" style={{ color: "#4b6080" }}>{sorted.length} threads</p>
            </div>

            {/* Thread list */}
            <div className="space-y-4">
              {sorted.map((thread) => (
                <div
                  key={thread.id}
                  className="rounded-2xl p-5 card-hover"
                  style={{ background: "linear-gradient(135deg, #1a2235 0%, #111827 100%)", border: "1px solid rgba(30, 45, 69, 0.8)" }}
                >
                  <div className="flex gap-4">
                    {/* Vote count — interactive client component */}
                    <VoteButton threadId={thread.id} initialVotes={thread.votes} />

                    <div style={{ width: "1px", background: "#1e2d45", flexShrink: 0 }} />

                    {/* Thread content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="tag tag-purple">{thread.system}</span>
                        {thread.solved && (
                          <span className="tag tag-green">✓ Solved</span>
                        )}
                      </div>

                      <h2 className="font-bold text-base mb-2 leading-snug" style={{ color: "#f1f5f9" }}>
                        {thread.title}
                      </h2>

                      <p className="text-sm leading-relaxed mb-3 line-clamp-2" style={{ color: "#94a3b8" }}>
                        {thread.body}
                      </p>

                      {/* Top answer preview */}
                      {thread.topAnswer && (
                        <div
                          className="rounded-xl p-3 mb-3"
                          style={{ background: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.15)" }}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-xs font-bold" style={{ color: "#34d399" }}>✓ Top Answer</span>
                            <span className="text-xs font-semibold" style={{ color: "#94a3b8" }}>
                              {thread.topAnswer.author}
                            </span>
                            <span
                              className="text-xs px-1.5 py-0.5 rounded"
                              style={{ background: "rgba(245, 158, 11, 0.1)", color: "#fbbf24", fontSize: "10px" }}
                            >
                              {thread.topAnswer.authorBadge}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "#94a3b8" }}>
                            {thread.topAnswer.content}
                          </p>
                        </div>
                      )}

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: "#4b6080" }}>
                        <span>{thread.views.toLocaleString()} views</span>
                        <span>·</span>
                        <span>
                          <span style={{ color: thread.answers === 0 ? "#f87171" : "#94a3b8" }}>{thread.answers}</span> answer{thread.answers !== 1 ? "s" : ""}
                        </span>
                        <span>·</span>
                        <span>Asked by <span style={{ color: "#94a3b8" }}>{thread.author}</span></span>
                        <span>·</span>
                        <span>{timeAgo(thread.postedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* System filter */}
            <div className="rounded-2xl p-5" style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(30, 45, 69, 0.5)" }}>
              <h3 className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ color: "#94a3b8" }}>
                Filter by System
              </h3>
              <div className="space-y-1">
                {systems.map((sys) => {
                  const isActive = sys === activeSystem;
                  const threadCount = sys === "All" ? qaThreads.length : qaThreads.filter((t) => t.system === sys).length;
                  return (
                    <Link
                      key={sys}
                      href={`/community?system=${sys}&filter=${activeFilter}`}
                      scroll={false}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all"
                      style={{
                        background: isActive ? "rgba(139, 92, 246, 0.1)" : "transparent",
                        color: isActive ? "#a78bfa" : "#94a3b8",
                        textDecoration: "none",
                      }}
                    >
                      {sys}
                      <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(30, 45, 69, 0.8)", color: "#4b6080" }}>
                        {threadCount}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Community stats */}
            <div className="rounded-2xl p-5" style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(30, 45, 69, 0.5)" }}>
              <h3 className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ color: "#94a3b8" }}>
                Community Stats
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Questions answered", value: "48,204", color: "#34d399" },
                  { label: "Answer rate", value: "94%", color: "#fbbf24" },
                  { label: "Avg response time", value: "47 min", color: "#60a5fa" },
                  { label: "Verified pros", value: "1,240", color: "#a78bfa" },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span className="text-xs" style={{ color: "#4b6080" }}>{stat.label}</span>
                    <span className="text-sm font-bold" style={{ color: stat.color }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ask a question — interactive client component */}
            <AskQuestionBox />
          </div>
        </div>
      </div>
    </div>
  );
}
