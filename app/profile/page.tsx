"use client";

import Link from "next/link";
import {
  LogRepairButton,
  EditHomeButton,
  RepairLogDisplay,
  HomeProfileStats,
  SavedGuidesDisplay,
  SubmitCostButton,
  UserCostSubmissions,
} from "@/components/InteractiveButtons";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const maintenanceChecklist = [
  { task: "Test smoke and CO detectors", system: "Safety", season: "Spring", urgency: "high", done: false },
  { task: "Replace HVAC air filter", system: "HVAC", season: "Spring", urgency: "medium", done: true },
  { task: "Inspect roof for winter damage", system: "Roof", season: "Spring", urgency: "high", done: false },
  { task: "Clean gutters and downspouts", system: "Exterior", season: "Spring", urgency: "medium", done: false },
  { task: "Check exterior caulking around windows and doors", system: "Exterior", season: "Spring", urgency: "low", done: true },
  { task: "Service AC unit before summer", system: "HVAC", season: "Spring", urgency: "medium", done: false },
  { task: "Inspect deck for loose boards or fasteners", system: "Exterior", season: "Spring", urgency: "medium", done: false },
  { task: "Test GFCI outlets in bathrooms and kitchen", system: "Electrical", season: "Spring", urgency: "high", done: false },
];

const urgencyConfig = {
  high: { color: "#f87171", bg: "rgba(239, 68, 68, 0.08)", border: "rgba(239, 68, 68, 0.2)" },
  medium: { color: "#fbbf24", bg: "rgba(245, 158, 11, 0.08)", border: "rgba(245, 158, 11, 0.2)" },
  low: { color: "#34d399", bg: "rgba(16, 185, 129, 0.08)", border: "rgba(16, 185, 129, 0.2)" },
};

function ChecklistItem({
  item,
  checked,
  onToggle,
}: {
  item: (typeof maintenanceChecklist)[0];
  checked: boolean;
  onToggle: () => void;
}) {
  const urg = urgencyConfig[item.urgency as keyof typeof urgencyConfig];
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left cursor-pointer"
      style={{
        background: checked ? "rgba(16, 185, 129, 0.04)" : "rgba(17, 24, 39, 0.5)",
        border: `1px solid ${checked ? "rgba(16, 185, 129, 0.15)" : "rgba(30, 45, 69, 0.5)"}`,
        opacity: checked ? 0.7 : 1,
      }}
    >
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: checked ? "rgba(16, 185, 129, 0.2)" : "rgba(30, 45, 69, 0.8)",
          border: `1px solid ${checked ? "#34d399" : "rgba(30, 45, 69, 1)"}`,
        }}
      >
        {checked && <span style={{ color: "#34d399", fontSize: "11px" }}>✓</span>}
      </div>
      <span
        className="flex-1 text-sm"
        style={{ color: checked ? "#4b6080" : "#f1f5f9", textDecoration: checked ? "line-through" : "none" }}
      >
        {item.task}
      </span>
      <span className="tag text-xs shrink-0" style={{ background: urg.bg, color: urg.color, border: `1px solid ${urg.border}` }}>
        {item.urgency}
      </span>
    </button>
  );
}

export default function ProfilePage() {
  const [repairs] = useLocalStorage<{ id: string }[]>("housemd-repairs", []);
  const [savedGuides] = useLocalStorage<string[]>("housemd-saved-guides", []);
  const [myCosts] = useLocalStorage<{ id: string }[]>("housemd-cost-submissions", []);

  // Checklist: persisted done-state per task index
  const [checkedItems, setCheckedItems] = useLocalStorage<Record<number, boolean>>(
    "housemd-checklist",
    Object.fromEntries(maintenanceChecklist.map((item, i) => [i, item.done]))
  );

  const doneCount = maintenanceChecklist.filter((_, i) => checkedItems[i]).length;
  const progress = Math.round((doneCount / maintenanceChecklist.length) * 100);

  function toggleItem(i: number) {
    setCheckedItems((prev) => ({ ...prev, [i]: !prev[i] }));
  }

  return (
    <div style={{ backgroundColor: "#0b0f1a", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "rgba(17, 24, 39, 0.5)", borderBottom: "1px solid rgba(30, 45, 69, 0.5)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black"
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                color: "#0b0f1a",
                boxShadow: "0 0 20px rgba(245, 158, 11, 0.3)",
              }}
            >
              M
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-2xl font-black" style={{ color: "#f1f5f9" }}>Marcus T.</h1>
                <span className="text-xs px-2.5 py-1 rounded-full font-bold" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#fbbf24", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                  ✦ HouseMD Pro
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: "#4b6080" }}>
                <span>🏠 Member since 2024</span>
              </div>
            </div>

            {/* Live stats from localStorage */}
            <div className="flex gap-6 shrink-0">
              {[
                { label: "Repairs logged", value: repairs.length },
                { label: "Guides saved", value: savedGuides.length },
                { label: "Costs shared", value: myCosts.length },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black gradient-text">{s.value}</div>
                  <div className="text-xs" style={{ color: "#4b6080" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Spring Maintenance Checklist — fully interactive + saved */}
            <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, #1a2235 0%, #111827 100%)", border: "1px solid rgba(30, 45, 69, 0.8)" }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-lg font-black" style={{ color: "#f1f5f9" }}>🌱 Spring Checklist</h2>
                  <p className="text-sm mt-1" style={{ color: "#4b6080" }}>{doneCount} of {maintenanceChecklist.length} tasks complete · <span style={{ color: "#34d399" }}>saves automatically</span></p>
                </div>
                <span className="text-sm font-black px-3 py-1.5 rounded-xl" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#fbbf24", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                  {progress}%
                </span>
              </div>

              <div className="progress-bar mb-5">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>

              <div className="space-y-2">
                {maintenanceChecklist.map((item, i) => (
                  <ChecklistItem
                    key={i}
                    item={item}
                    checked={!!checkedItems[i]}
                    onToggle={() => toggleItem(i)}
                  />
                ))}
              </div>
            </div>

            {/* Repair Log — persisted */}
            <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, #1a2235 0%, #111827 100%)", border: "1px solid rgba(30, 45, 69, 0.8)" }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-black" style={{ color: "#f1f5f9" }}>🔧 Repair Log</h2>
                  <p className="text-xs mt-0.5" style={{ color: "#34d399" }}>Saved to your device</p>
                </div>
                <LogRepairButton />
              </div>
              <RepairLogDisplay />
            </div>

            {/* My Submitted Costs */}
            <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, #1a2235 0%, #111827 100%)", border: "1px solid rgba(30, 45, 69, 0.8)" }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-black" style={{ color: "#f1f5f9" }}>💰 My Cost Submissions</h2>
                  <p className="text-xs mt-0.5" style={{ color: "#34d399" }}>Your contributions to the community</p>
                </div>
                <SubmitCostButton />
              </div>
              <UserCostSubmissions />
              {myCosts.length === 0 && (
                <p className="text-sm text-center py-4" style={{ color: "#4b6080" }}>
                  No cost submissions yet. Click &quot;+ Submit Your Cost&quot; to help other homeowners.
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Home profile — persisted */}
            <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, #1a2235 0%, #111827 100%)", border: "1px solid rgba(30, 45, 69, 0.8)" }}>
              <h3 className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ color: "#f59e0b", letterSpacing: "0.08em" }}>
                My Home
              </h3>
              <p className="text-xs mb-3" style={{ color: "#34d399" }}>✓ Saved to your device</p>
              <HomeProfileStats />
              <EditHomeButton />
            </div>

            {/* HouseMD Pro */}
            <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1200 0%, #1a2235 100%)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
              <div className="absolute top-0 right-0 w-32 h-32" style={{ background: "radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)" }} />
              <div className="relative">
                <div className="text-xs font-bold mb-2 tracking-wider uppercase" style={{ color: "#f59e0b" }}>✦ HouseMD Pro</div>
                <h3 className="font-black text-base mb-2" style={{ color: "#f1f5f9" }}>You&apos;re already a Pro member</h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: "#94a3b8" }}>Unlimited home profiles, AI diagnostics, custom reminders, ad-free.</p>
                <div className="flex flex-col gap-2">
                  {["✓ AI Diagnostic Assistant", "✓ 5 home profiles", "✓ Priority Q&A", "✓ Ad-free"].map((f) => (
                    <div key={f} className="text-xs font-medium" style={{ color: "#fbbf24" }}>{f}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Saved guides — persisted */}
            <div className="rounded-2xl p-5" style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(30, 45, 69, 0.5)" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm uppercase tracking-wider" style={{ color: "#94a3b8" }}>Saved Guides</h3>
                <Link href="/browse" className="text-xs" style={{ color: "#4b6080" }}>Browse all</Link>
              </div>
              <SavedGuidesDisplay />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
