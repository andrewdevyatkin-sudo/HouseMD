"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type ConsentState = "pending" | "accepted" | "declined";

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>("pending");
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("housemd-cookie-consent");
    if (stored === "accepted" || stored === "declined") {
      setConsent(stored as ConsentState);
    }
  }, []);

  function acceptAll() {
    localStorage.setItem("housemd-cookie-consent", "accepted");
    setConsent("accepted");
  }

  function declineOptional() {
    localStorage.setItem("housemd-cookie-consent", "declined");
    setConsent("declined");
  }

  function saveCustom() {
    const state = analyticsEnabled ? "accepted" : "declined";
    localStorage.setItem("housemd-cookie-consent", state);
    localStorage.setItem("housemd-analytics-consent", String(analyticsEnabled));
    setConsent(state);
  }

  if (consent !== "pending") return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="max-w-3xl mx-auto rounded-2xl p-5 sm:p-6"
        style={{
          background: "rgba(17, 24, 39, 0.97)",
          border: "1px solid rgba(30, 45, 69, 0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 -4px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(245, 158, 11, 0.08)",
          pointerEvents: "all",
        }}
      >
        {!showDetails ? (
          /* Simple banner */
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <span className="text-xl shrink-0">🍪</span>
              <div>
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                  We use strictly necessary cookies to run HouseMD, and optional analytics cookies to improve the Platform.
                  We never use advertising cookies or sell your data.{" "}
                  <Link href="/privacy#cookies" style={{ color: "#fbbf24", textDecoration: "underline" }}>
                    Learn more
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              <button
                id="cookie-manage-btn"
                onClick={() => setShowDetails(true)}
                className="text-sm px-3 py-2 rounded-xl cursor-pointer btn-ghost"
              >
                Manage
              </button>
              <button
                id="cookie-decline-btn"
                onClick={declineOptional}
                className="text-sm px-3 py-2 rounded-xl cursor-pointer"
                style={{
                  background: "rgba(30, 45, 69, 0.5)",
                  border: "1px solid rgba(30, 45, 69, 0.8)",
                  color: "#94a3b8",
                }}
              >
                Necessary only
              </button>
              <button
                id="cookie-accept-btn"
                onClick={acceptAll}
                className="text-sm px-4 py-2 rounded-xl font-bold cursor-pointer btn-primary"
              >
                Accept all
              </button>
            </div>
          </div>
        ) : (
          /* Detailed preferences */
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-base" style={{ color: "#f1f5f9" }}>Cookie Preferences</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="cursor-pointer"
                style={{ background: "none", border: "none", color: "#4b6080" }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3 mb-5">
              {/* Strictly necessary */}
              <div
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: "rgba(30, 45, 69, 0.3)", border: "1px solid rgba(30, 45, 69, 0.5)" }}
              >
                <div className="flex-1 pr-4">
                  <div className="font-semibold text-sm mb-0.5" style={{ color: "#f1f5f9" }}>Strictly Necessary</div>
                  <div className="text-xs" style={{ color: "#4b6080" }}>Authentication, security, session cookies. Required for the Platform to function. Cannot be disabled.</div>
                </div>
                <div
                  className="shrink-0 text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: "rgba(16, 185, 129, 0.1)", color: "#34d399", border: "1px solid rgba(16, 185, 129, 0.2)" }}
                >
                  Always On
                </div>
              </div>

              {/* Analytics */}
              <div
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: "rgba(30, 45, 69, 0.3)", border: "1px solid rgba(30, 45, 69, 0.5)" }}
              >
                <div className="flex-1 pr-4">
                  <div className="font-semibold text-sm mb-0.5" style={{ color: "#f1f5f9" }}>Analytics Cookies</div>
                  <div className="text-xs" style={{ color: "#4b6080" }}>Anonymous usage statistics (page views, popular guides). Helps us improve the Platform. No personal data sent to third parties.</div>
                </div>
                {/* Toggle */}
                <button
                  id="cookie-analytics-toggle"
                  onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                  className="shrink-0 cursor-pointer relative"
                  style={{ background: "none", border: "none", padding: 0 }}
                  aria-label={analyticsEnabled ? "Disable analytics cookies" : "Enable analytics cookies"}
                >
                  <div
                    className="w-11 h-6 rounded-full transition-all duration-300"
                    style={{
                      background: analyticsEnabled
                        ? "linear-gradient(135deg, #f59e0b, #d97706)"
                        : "rgba(30, 45, 69, 0.8)",
                    }}
                  >
                    <div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300"
                      style={{ left: analyticsEnabled ? "24px" : "4px" }}
                    />
                  </div>
                </button>
              </div>

              {/* Advertising */}
              <div
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: "rgba(30, 45, 69, 0.15)", border: "1px solid rgba(30, 45, 69, 0.3)", opacity: 0.7 }}
              >
                <div className="flex-1 pr-4">
                  <div className="font-semibold text-sm mb-0.5" style={{ color: "#94a3b8" }}>Advertising Cookies</div>
                  <div className="text-xs" style={{ color: "#4b6080" }}>HouseMD does not use advertising tracking cookies and never will.</div>
                </div>
                <div
                  className="shrink-0 text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: "rgba(75, 96, 128, 0.2)", color: "#4b6080", border: "1px solid rgba(75, 96, 128, 0.2)" }}
                >
                  Never Used
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-end">
              <button
                id="cookie-save-btn"
                onClick={saveCustom}
                className="text-sm px-5 py-2.5 rounded-xl font-bold cursor-pointer btn-primary"
              >
                Save Preferences
              </button>
            </div>

            <p className="text-xs mt-3 text-center" style={{ color: "#4b6080" }}>
              You can change these preferences at any time in{" "}
              <Link href="/privacy" style={{ color: "#fbbf24" }}>Privacy Settings</Link>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
