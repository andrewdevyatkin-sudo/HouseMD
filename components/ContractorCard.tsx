"use client";

import { useState } from "react";
import Modal from "./Modal";
import { useToast } from "./Toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Contractor } from "@/lib/data";

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

function PriceRangeIndicator({ range }: { range: "$" | "$$" | "$$$" }) {
  return (
    <div className="flex gap-0.5">
      {["$", "$", "$"].map((_, i) => (
        <span key={i} className="text-sm font-bold" style={{ color: i < range.length ? "#fbbf24" : "#1e2d45" }}>$</span>
      ))}
    </div>
  );
}

function ContactModal({ contractor, open, onClose, onSent }: { contractor: Contractor; open: boolean; onClose: () => void; onSent: () => void }) {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) { showToast("Please fill in all fields.", "warning"); return; }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      onClose();
      onSent();
      setName(""); setEmail(""); setMessage("");
      showToast(`Message sent to ${contractor.name}! They typically respond ${contractor.responseTime}.`, "success");
    }, 1200);
  }

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 10,
    background: "rgba(11, 15, 26, 0.6)", border: "1px solid rgba(30, 45, 69, 0.8)",
    color: "#f1f5f9", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" as const,
  };

  return (
    <Modal open={open} onClose={onClose} title={`Contact ${contractor.name}`}>
      <p className="text-sm mb-5" style={{ color: "#94a3b8" }}>
        📍 {contractor.city}, {contractor.stateAbbr} · Responds {contractor.responseTime}
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={{ fontSize: 12, color: "#4b6080", fontWeight: 600, display: "block", marginBottom: 6 }}>Your Name</label>
          <input id={`contact-name-${contractor.id}`} value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" style={inputStyle} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#4b6080", fontWeight: 600, display: "block", marginBottom: 6 }}>Email</label>
          <input id={`contact-email-${contractor.id}`} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@email.com" style={inputStyle} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#4b6080", fontWeight: 600, display: "block", marginBottom: 6 }}>Describe your project</label>
          <textarea id={`contact-message-${contractor.id}`} value={message} onChange={e => setMessage(e.target.value)} rows={4}
            placeholder="Tell the contractor what needs to be fixed, your timeline, and any other details..."
            style={{ ...inputStyle, resize: "vertical" }} />
        </div>
        <button type="submit" disabled={sending} className="btn-primary"
          style={{ padding: "11px 0", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: sending ? "default" : "pointer", opacity: sending ? 0.7 : 1, border: "none" }}>
          {sending ? "Sending…" : "Send Message"}
        </button>
      </form>
    </Modal>
  );
}

function ReviewModal({ contractor, open, onClose, onReviewed }: { contractor: Contractor; open: boolean; onClose: () => void; onReviewed: () => void }) {
  const { showToast } = useToast();
  const [stars, setStars] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stars) { showToast("Please select a star rating.", "warning"); return; }
    if (!review.trim()) { showToast("Please write a short review.", "warning"); return; }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onClose();
      onReviewed();
      setStars(0); setReview("");
      showToast("Review submitted! Thank you for helping the community.", "success");
    }, 1000);
  }

  return (
    <Modal open={open} onClose={onClose} title={`Review ${contractor.name}`}>
      <p className="text-sm mb-5" style={{ color: "#94a3b8" }}>Share your experience to help other homeowners.</p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={{ fontSize: 12, color: "#4b6080", fontWeight: 600, display: "block", marginBottom: 8 }}>Your Rating</label>
          <div style={{ display: "flex", gap: 6 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} type="button"
                onMouseEnter={() => setHovered(s)} onMouseLeave={() => setHovered(0)}
                onClick={() => setStars(s)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill={s <= (hovered || stars) ? "#f59e0b" : "rgba(75,96,128,0.3)"} style={{ transition: "fill 0.15s ease" }}>
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              </button>
            ))}
            {stars > 0 && (
              <span style={{ fontSize: 13, color: "#94a3b8", alignSelf: "center", marginLeft: 4 }}>
                {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][stars]}
              </span>
            )}
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#4b6080", fontWeight: 600, display: "block", marginBottom: 6 }}>Your Review</label>
          <textarea value={review} onChange={e => setReview(e.target.value)} rows={4}
            placeholder="What did they fix? Were they on time and professional? Would you hire them again?"
            style={{ width: "100%", padding: "10px 14px", borderRadius: 10, background: "rgba(11,15,26,0.6)", border: "1px solid rgba(30,45,69,0.8)", color: "#f1f5f9", fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
        </div>
        <button type="submit" disabled={submitting} className="btn-primary"
          style={{ padding: "11px 0", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: submitting ? "default" : "pointer", opacity: submitting ? 0.7 : 1, border: "none" }}>
          {submitting ? "Submitting…" : "Submit Review"}
        </button>
      </form>
    </Modal>
  );
}

export default function ContractorCard({ contractor }: { contractor: Contractor }) {
  const [contactOpen, setContactOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  // Persist which contractors user has contacted / reviewed
  const [contacted, setContacted] = useLocalStorage<Record<string, boolean>>("housemd-contacted", {});
  const [reviewed, setReviewed] = useLocalStorage<Record<string, boolean>>("housemd-reviewed", {});

  const hasContacted = contacted[contractor.id] ?? false;
  const hasReviewed = reviewed[contractor.id] ?? false;

  return (
    <>
      <div className="rounded-2xl p-6 card-hover" style={{ background: "linear-gradient(135deg, #1a2235 0%, #111827 100%)", border: "1px solid rgba(30, 45, 69, 0.8)" }}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black shrink-0"
              style={{ background: "rgba(59, 130, 246, 0.1)", border: "1px solid rgba(59, 130, 246, 0.2)", color: "#60a5fa" }}>
              {contractor.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-black text-base" style={{ color: "#f1f5f9" }}>{contractor.name}</h2>
                {contractor.verified && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#34d399", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                    ✓ Verified
                  </span>
                )}
                {hasContacted && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(59,130,246,0.1)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)" }}>
                    ✉ Contacted
                  </span>
                )}
                {hasReviewed && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(245,158,11,0.1)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.2)" }}>
                    ★ Reviewed
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-sm mt-0.5" style={{ color: "#4b6080" }}>
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {contractor.city}, {contractor.stateAbbr}
              </div>
            </div>
          </div>
          <PriceRangeIndicator range={contractor.priceRange} />
        </div>

        <StarRating rating={contractor.rating} count={contractor.reviewCount} />

        <div className="flex flex-wrap gap-1.5 my-3">
          {contractor.specialty.map((s) => (
            <span key={s} className="tag tag-blue">{s}</span>
          ))}
        </div>

        <p className="text-sm leading-relaxed mb-4" style={{ color: "#94a3b8" }}>{contractor.bio}</p>

        <div className="flex items-center gap-4 mb-4 pb-4" style={{ borderBottom: "1px solid #1e2d45" }}>
          <div>
            <div className="text-xs mb-0.5" style={{ color: "#4b6080" }}>Experience</div>
            <div className="text-sm font-bold" style={{ color: "#f1f5f9" }}>{contractor.yearsInBusiness} yrs</div>
          </div>
          <div>
            <div className="text-xs mb-0.5" style={{ color: "#4b6080" }}>Jobs done</div>
            <div className="text-sm font-bold" style={{ color: "#f1f5f9" }}>{contractor.completedJobs.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs mb-0.5" style={{ color: "#4b6080" }}>Response</div>
            <div className="text-sm font-bold" style={{ color: "#34d399" }}>{contractor.responseTime}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {contractor.tags.map((tag) => (
            <span key={tag} className="tag tag-gray">{tag}</span>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            id={`contact-btn-${contractor.id}`}
            onClick={() => setContactOpen(true)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold cursor-pointer${!hasContacted ? " btn-primary" : ""}`}
            style={{
              border: "none",
              background: hasContacted ? "rgba(59,130,246,0.15)" : undefined,
              color: hasContacted ? "#60a5fa" : undefined,
            }}
          >
            {hasContacted ? "✉ Message Again" : "Contact Contractor"}
          </button>
          <button
            id={`review-btn-${contractor.id}`}
            onClick={() => setReviewOpen(true)}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold btn-ghost cursor-pointer"
            style={{ border: "1px solid rgba(30,45,69,0.8)" }}
          >
            {hasReviewed ? "Edit Review" : "Leave Review"}
          </button>
        </div>
      </div>

      <ContactModal
        contractor={contractor}
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        onSent={() => setContacted((prev) => ({ ...prev, [contractor.id]: true }))}
      />
      <ReviewModal
        contractor={contractor}
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        onReviewed={() => setReviewed((prev) => ({ ...prev, [contractor.id]: true }))}
      />
    </>
  );
}
