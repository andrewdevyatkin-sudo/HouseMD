"use client";

import { useToast } from "./Toast";
import Modal from "./Modal";
import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RepairEntry {
  id: string;
  description: string;
  cost: string;
  date: string;
}

interface HomeProfile {
  sqft: string;
  year: string;
  type: string;
  address: string;
}

interface CostSubmission {
  id: string;
  project: string;
  amount: string;
  city: string;
  submittedAt: string;
}

const DEFAULT_HOME: HomeProfile = { sqft: "2,100", year: "1987", type: "Single Family", address: "" };

// ─── Log Repair Button ────────────────────────────────────────────────────────

export function LogRepairButton() {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [repair, setRepair] = useState("");
  const [cost, setCost] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [repairs, setRepairs] = useLocalStorage<RepairEntry[]>("housemd-repairs", []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!repair.trim()) { showToast("Please describe the repair.", "warning"); return; }
    setSubmitting(true);
    setTimeout(() => {
      const entry: RepairEntry = {
        id: `r-${Date.now()}`,
        description: repair.trim(),
        cost: cost.trim() || "—",
        date: new Date().toLocaleDateString(),
      };
      setRepairs((prev) => [entry, ...prev]);
      setSubmitting(false);
      setOpen(false);
      setRepair(""); setCost("");
      showToast("Repair logged to your home history!", "success");
    }, 900);
  }

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 10,
    background: "rgba(11,15,26,0.6)", border: "1px solid rgba(30,45,69,0.8)",
    color: "#f1f5f9", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" as const,
  };

  return (
    <>
      <button
        id="log-repair-btn"
        onClick={() => setOpen(true)}
        className="text-sm font-semibold px-3 py-1.5 rounded-xl btn-ghost cursor-pointer"
        style={{ border: "1px solid rgba(30,45,69,0.8)" }}
      >
        + Log Repair
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Log a Repair">
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, color: "#4b6080", fontWeight: 600, display: "block", marginBottom: 6 }}>What was repaired?</label>
            <input value={repair} onChange={e => setRepair(e.target.value)} placeholder="e.g. Fixed running toilet — replaced flapper" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#4b6080", fontWeight: 600, display: "block", marginBottom: 6 }}>Cost (optional)</label>
            <input value={cost} onChange={e => setCost(e.target.value)} placeholder="e.g. $45" style={inputStyle} />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary" style={{ padding: "11px 0", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", border: "none", opacity: submitting ? 0.7 : 1 }}>
            {submitting ? "Saving…" : "Save Repair"}
          </button>
        </form>
      </Modal>
    </>
  );
}

// ─── Repair Log Display (shown on profile page) ───────────────────────────────

export function RepairLogDisplay() {
  const [repairs] = useLocalStorage<RepairEntry[]>("housemd-repairs", []);

  if (repairs.length === 0) {
    return (
      <div className="text-center py-6">
        <div className="text-3xl mb-2">🔧</div>
        <p className="text-sm" style={{ color: "#4b6080" }}>No repairs logged yet. Click &quot;+ Log Repair&quot; to start tracking your home&apos;s history.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {repairs.map((r) => (
        <div key={r.id} className="flex items-start justify-between gap-4 p-3 rounded-xl" style={{ background: "rgba(11,15,26,0.4)", border: "1px solid rgba(30,45,69,0.5)" }}>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-snug" style={{ color: "#f1f5f9" }}>{r.description}</p>
            <p className="text-xs mt-0.5" style={{ color: "#4b6080" }}>{r.date}</p>
          </div>
          {r.cost !== "—" && (
            <div className="text-sm font-bold shrink-0" style={{ color: "#fbbf24" }}>{r.cost}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Edit Home Button ─────────────────────────────────────────────────────────

export function EditHomeButton() {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [homeProfile, setHomeProfile] = useLocalStorage<HomeProfile>("housemd-home-profile", DEFAULT_HOME);
  const [draft, setDraft] = useState(homeProfile);
  const [saving, setSaving] = useState(false);

  function handleOpen() {
    setDraft(homeProfile); // load current saved values into form
    setOpen(true);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setHomeProfile(draft);
      setSaving(false);
      setOpen(false);
      showToast("Home profile updated successfully!", "success");
    }, 800);
  }

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 10,
    background: "rgba(11,15,26,0.6)", border: "1px solid rgba(30,45,69,0.8)",
    color: "#f1f5f9", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" as const,
  };

  return (
    <>
      <button
        id="edit-home-btn"
        onClick={handleOpen}
        className="w-full mt-4 py-2 rounded-xl text-sm font-semibold btn-ghost cursor-pointer"
        style={{ border: "1px solid rgba(30,45,69,0.8)" }}
      >
        Edit Home Profile
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Edit Your Home">
        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, color: "#4b6080", fontWeight: 600, display: "block", marginBottom: 6 }}>Street Address (optional)</label>
            <input value={draft.address} onChange={e => setDraft(d => ({ ...d, address: e.target.value }))} placeholder="e.g. 123 Main St, Atlanta, GA" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#4b6080", fontWeight: 600, display: "block", marginBottom: 6 }}>Square Footage</label>
            <input value={draft.sqft} onChange={e => setDraft(d => ({ ...d, sqft: e.target.value }))} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#4b6080", fontWeight: 600, display: "block", marginBottom: 6 }}>Year Built</label>
            <input value={draft.year} onChange={e => setDraft(d => ({ ...d, year: e.target.value }))} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#4b6080", fontWeight: 600, display: "block", marginBottom: 6 }}>Home Type</label>
            <select value={draft.type} onChange={e => setDraft(d => ({ ...d, type: e.target.value }))} style={{ ...inputStyle, cursor: "pointer" }}>
              <option>Single Family</option>
              <option>Townhouse</option>
              <option>Condo</option>
              <option>Mobile Home</option>
              <option>Multi-Family</option>
            </select>
          </div>
          <button type="submit" disabled={saving} className="btn-primary" style={{ padding: "11px 0", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", border: "none", opacity: saving ? 0.7 : 1 }}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </form>
      </Modal>
    </>
  );
}

// ─── Home Profile Stats Display ───────────────────────────────────────────────

export function HomeProfileStats() {
  const [profile] = useLocalStorage<HomeProfile>("housemd-home-profile", DEFAULT_HOME);
  return (
    <>
      {profile.address && (
        <div className="mb-3 text-sm" style={{ color: "#94a3b8" }}>
          📍 {profile.address}
        </div>
      )}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl p-3 text-center" style={{ background: "rgba(11,15,26,0.4)", border: "1px solid rgba(30,45,69,0.5)" }}>
          <div className="text-xs mb-1" style={{ color: "#4b6080" }}>Sq Ft</div>
          <div className="text-sm font-bold" style={{ color: "#f1f5f9" }}>{profile.sqft}</div>
        </div>
        <div className="rounded-xl p-3 text-center" style={{ background: "rgba(11,15,26,0.4)", border: "1px solid rgba(30,45,69,0.5)" }}>
          <div className="text-xs mb-1" style={{ color: "#4b6080" }}>Built</div>
          <div className="text-sm font-bold" style={{ color: "#f1f5f9" }}>{profile.year}</div>
        </div>
        <div className="rounded-xl p-3 text-center" style={{ background: "rgba(11,15,26,0.4)", border: "1px solid rgba(30,45,69,0.5)" }}>
          <div className="text-xs mb-1" style={{ color: "#4b6080" }}>Type</div>
          <div className="text-xs font-bold leading-tight" style={{ color: "#f1f5f9" }}>{profile.type}</div>
        </div>
      </div>
    </>
  );
}

// ─── Save Guide Button ────────────────────────────────────────────────────────

export function SaveGuideButton({ guideTitle }: { guideTitle: string }) {
  const { showToast } = useToast();
  const [savedGuides, setSavedGuides] = useLocalStorage<string[]>("housemd-saved-guides", []);
  const saved = savedGuides.includes(guideTitle);

  function toggle() {
    if (saved) {
      setSavedGuides((prev) => prev.filter((g) => g !== guideTitle));
      showToast("Guide removed from your saved list.", "info");
    } else {
      setSavedGuides((prev) => [...prev, guideTitle]);
      showToast(`"${guideTitle}" saved to My Home!`, "success");
    }
  }

  return (
    <button
      id="save-guide-btn"
      onClick={toggle}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all"
      style={{
        border: saved ? "1px solid rgba(245,158,11,0.3)" : "1px solid rgba(30,45,69,0.8)",
        background: saved ? "rgba(245,158,11,0.1)" : "rgba(17,24,39,0.8)",
        color: saved ? "#fbbf24" : "#94a3b8",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <svg width="14" height="14" fill={saved ? "#fbbf24" : "none"} stroke={saved ? "#fbbf24" : "currentColor"} strokeWidth="2" viewBox="0 0 24 24">
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      {saved ? "Saved ✓" : "Save Guide"}
    </button>
  );
}

// ─── Saved Guides Display (on profile) ────────────────────────────────────────

export function SavedGuidesDisplay() {
  const [savedGuides] = useLocalStorage<string[]>("housemd-saved-guides", []);

  if (savedGuides.length === 0) {
    return (
      <p className="text-sm text-center py-4" style={{ color: "#4b6080" }}>
        No saved guides yet. Click &quot;Save Guide&quot; on any guide page.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {savedGuides.map((title) => (
        <div key={title} className="flex items-center gap-2 p-2 rounded-xl" style={{ background: "rgba(11,15,26,0.4)", border: "1px solid rgba(30,45,69,0.4)" }}>
          <svg width="12" height="12" fill="#fbbf24" viewBox="0 0 24 24"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
          <span className="text-sm" style={{ color: "#f1f5f9" }}>{title}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Submit Cost Button ───────────────────────────────────────────────────────

export function SubmitCostButton() {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState("");
  const [amount, setAmount] = useState("");
  const [city, setCity] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mySubmissions, setMySubmissions] = useLocalStorage<CostSubmission[]>("housemd-cost-submissions", []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!project || !amount || !city) { showToast("Please fill in all required fields.", "warning"); return; }
    setSubmitting(true);
    setTimeout(() => {
      const sub: CostSubmission = {
        id: `cs-${Date.now()}`,
        project: project.trim(),
        amount: amount.trim(),
        city: city.trim(),
        submittedAt: new Date().toISOString(),
      };
      setMySubmissions((prev) => [sub, ...prev]);
      setSubmitting(false);
      setOpen(false);
      setProject(""); setAmount(""); setCity("");
      showToast("Cost data submitted! It appears in the database below.", "success");
    }, 1000);
  }

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 10,
    background: "rgba(11,15,26,0.6)", border: "1px solid rgba(30,45,69,0.8)",
    color: "#f1f5f9", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" as const,
  };

  return (
    <>
      <button
        id="submit-cost-btn"
        onClick={() => setOpen(true)}
        className="px-5 py-2.5 rounded-xl text-sm font-bold btn-primary cursor-pointer"
        style={{ border: "none" }}
      >
        + Submit Your Cost
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Share Your Repair Cost">
        <p className="text-sm mb-4" style={{ color: "#94a3b8" }}>
          Help other homeowners know what to expect. Your submission appears in the database immediately.
        </p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, color: "#4b6080", fontWeight: 600, display: "block", marginBottom: 6 }}>What was repaired / replaced? *</label>
            <input value={project} onChange={e => setProject(e.target.value)} placeholder="e.g. Water heater replacement (50-gal gas)" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#4b6080", fontWeight: 600, display: "block", marginBottom: 6 }}>Total cost paid *</label>
            <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. $1,250" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#4b6080", fontWeight: 600, display: "block", marginBottom: 6 }}>City, State *</label>
            <input value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Austin, TX" style={inputStyle} />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary" style={{ padding: "11px 0", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", border: "none", opacity: submitting ? 0.7 : 1 }}>
            {submitting ? "Submitting…" : "Submit Cost Data"}
          </button>
        </form>
      </Modal>
    </>
  );
}

// ─── User Submitted Costs Display (shown on costs page) ──────────────────────

export function UserCostSubmissions() {
  const [mySubmissions] = useLocalStorage<CostSubmission[]>("housemd-cost-submissions", []);

  if (mySubmissions.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-base font-black" style={{ color: "#f1f5f9" }}>✅ Your Submissions</h3>
        <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", border: "1px solid rgba(16,185,129,0.2)" }}>
          Saved locally
        </span>
      </div>
      <div className="space-y-3">
        {mySubmissions.map((s) => (
          <div key={s.id} className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.05) 0%, #111827 100%)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-bold mb-1" style={{ color: "#f1f5f9" }}>{s.project}</div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs" style={{ color: "#4b6080" }}>📍 {s.city}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", fontSize: 11 }}>
                    Your submission · {new Date(s.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="text-2xl font-black shrink-0" style={{ color: "#fbbf24" }}>{s.amount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
