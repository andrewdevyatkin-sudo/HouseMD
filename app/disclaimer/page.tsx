import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer — Home Repair Information Disclaimer",
  description:
    "HouseMD Disclaimer — important notice about the nature of home repair information on this platform and when you must hire a licensed professional.",
};

const LAST_UPDATED = "May 28, 2026";

const ALWAYS_HIRE_PRO = [
  {
    category: "⚡ Electrical Work",
    items: [
      "Panel upgrades, replacements, or rewiring",
      "New circuit installation",
      "Any work inside the electrical panel",
      "Knob-and-tube or aluminum wiring modification",
      "Work requiring an electrical permit",
    ],
    risk: "Electrocution, fire, code violations, voided insurance",
  },
  {
    category: "🔥 Gas Lines",
    items: [
      "Gas line installation, modification, or extension",
      "Gas appliance connection (other than plug-in)",
      "Any smell of gas — evacuate and call 911 first",
      "Gas meter work",
    ],
    risk: "Explosion, fire, carbon monoxide poisoning",
  },
  {
    category: "🏗️ Structural Work",
    items: [
      "Removing or modifying load-bearing walls or beams",
      "Foundation repair (beyond cosmetic crack patching)",
      "Significant roof structural work",
      "Floor joist repairs or sistering over large spans",
    ],
    risk: "Structural collapse, serious injury, property damage",
  },
  {
    category: "🧪 Hazardous Materials",
    items: [
      "Asbestos disturbance (pre-1980 homes — assume it's present)",
      "Lead paint removal or sanding in pre-1978 homes",
      "Mold remediation covering more than 10 square feet",
      "Underground fuel storage tanks",
    ],
    risk: "Cancer, lung disease, EPA/OSHA violations, liability",
  },
  {
    category: "🚿 Plumbing (Advanced)",
    items: [
      "Main sewer line work",
      "Water main connection or shutoff",
      "Gas-line-connected water heaters in some jurisdictions",
      "Work requiring a plumbing permit",
    ],
    risk: "Flooding, sewage backup, code violations",
  },
  {
    category: "📋 Permit-Required Work",
    items: [
      "Any project your local building department requires a permit for",
      "Unpermitted work can prevent home sale and void insurance",
      "Permits protect you — don't skip them to save money",
    ],
    risk: "Failed inspections, mandatory teardown, title issues",
  },
];

export default function DisclaimerPage() {
  return (
    <div style={{ backgroundColor: "#0b0f1a", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "rgba(239, 68, 68, 0.04)", borderBottom: "1px solid rgba(239, 68, 68, 0.15)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="section-label mb-3" style={{ color: "#f87171" }}>⚠️ Safety & Legal</div>
          <h1 className="text-4xl font-black mb-3" style={{ color: "#f1f5f9" }}>Disclaimer</h1>
          <p className="text-base mb-2" style={{ color: "#94a3b8" }}>
            Important information about the nature of home repair advice on HouseMD.
          </p>
          <p className="text-sm" style={{ color: "#4b6080" }}>Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Critical notice */}
        <div
          className="rounded-2xl p-6 mb-10"
          style={{ background: "rgba(239, 68, 68, 0.06)", border: "2px solid rgba(239, 68, 68, 0.25)" }}
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl shrink-0">⚠️</div>
            <div>
              <h2 className="text-xl font-black mb-3" style={{ color: "#f87171" }}>
                Not Professional Advice
              </h2>
              <p className="text-base leading-relaxed mb-3" style={{ color: "#94a3b8" }}>
                All content on HouseMD — including repair guides, cost data, community Q&A answers, contractor listings, and AI-generated responses — is provided for <strong style={{ color: "#f1f5f9" }}>general informational and educational purposes only</strong>. It does not constitute professional engineering, structural, electrical, plumbing, HVAC, or any other licensed trade advice.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#94a3b8" }}>
                <strong style={{ color: "#f1f5f9" }}>HouseMD is not responsible for</strong> any injury, property damage, financial loss, code violation, or other harm arising from any repair, modification, or home improvement decision made using information from this Platform. You assume all risk.
              </p>
            </div>
          </div>
        </div>

        {/* When to always hire a pro */}
        <div className="mb-10">
          <h2 className="text-2xl font-black mb-3" style={{ color: "#f1f5f9" }}>
            🔴 When You Must Hire a Licensed Professional
          </h2>
          <p className="text-base mb-6" style={{ color: "#94a3b8" }}>
            The following categories of work <strong style={{ color: "#f1f5f9" }}>must always be performed by a licensed professional</strong>, regardless of what you read on this Platform or anywhere else. This is non-negotiable for your safety and legal compliance.
          </p>

          <div className="space-y-4">
            {ALWAYS_HIRE_PRO.map((cat) => (
              <div
                key={cat.category}
                className="rounded-2xl p-5"
                style={{
                  background: "linear-gradient(135deg, #1a2235 0%, #111827 100%)",
                  border: "1px solid rgba(30, 45, 69, 0.8)",
                }}
              >
                <h3 className="font-black text-base mb-3" style={{ color: "#f1f5f9" }}>{cat.category}</h3>
                <ul className="space-y-1.5 mb-3">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#94a3b8" }}>
                      <span style={{ color: "#f87171", flexShrink: 0, marginTop: "2px" }}>✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div
                  className="text-xs px-3 py-1.5 rounded-lg inline-block font-semibold"
                  style={{ background: "rgba(239, 68, 68, 0.1)", color: "#f87171", border: "1px solid rgba(239, 68, 68, 0.2)" }}
                >
                  Risk: {cat.risk}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What HouseMD is vs is not */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.2)" }}
          >
            <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: "#34d399" }}>
              <span>✓</span> HouseMD IS
            </h3>
            <ul className="space-y-2.5">
              {[
                "A starting point to understand what might be wrong",
                "A tool to research typical costs before getting quotes",
                "A community to share experiences and ask questions",
                "A directory to find and review local contractors",
                "Educational context about home systems",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#94a3b8" }}>
                  <span style={{ color: "#34d399", flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.2)" }}
          >
            <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: "#f87171" }}>
              <span>✗</span> HouseMD IS NOT
            </h3>
            <ul className="space-y-2.5">
              {[
                "A licensed contractor, engineer, or trade professional",
                "A substitute for an in-person inspection",
                "A guarantee that any described fix will work for your situation",
                "Liable for the accuracy of community-submitted content",
                "Responsible for contractor services or quality",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#94a3b8" }}>
                  <span style={{ color: "#f87171", flexShrink: 0 }}>✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Community content disclaimer */}
        <div
          className="rounded-2xl p-6 mb-8"
          style={{ background: "rgba(245, 158, 11, 0.05)", border: "1px solid rgba(245, 158, 11, 0.2)" }}
        >
          <h2 className="text-lg font-black mb-3" style={{ color: "#fbbf24" }}>
            💬 Community Content Disclaimer
          </h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "#94a3b8" }}>
            The Community Q&A section contains advice from homeowners and self-identified trade professionals. <strong style={{ color: "#f1f5f9" }}>HouseMD does not independently verify the credentials, qualifications, or accuracy of any community response</strong>, including those labeled with "Verified Tradesperson" or similar badges. Such badges indicate only that the user provided some form of credential documentation — not that the advice is correct or applicable to your specific situation.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
            Always get a second opinion from a licensed professional before undertaking any significant repair based on community advice.
          </p>
        </div>

        {/* Cost data disclaimer */}
        <div
          className="rounded-2xl p-6 mb-8"
          style={{ background: "rgba(59, 130, 246, 0.05)", border: "1px solid rgba(59, 130, 246, 0.2)" }}
        >
          <h2 className="text-lg font-black mb-3" style={{ color: "#60a5fa" }}>
            💰 Cost Data Disclaimer
          </h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "#94a3b8" }}>
            Cost data on HouseMD is <strong style={{ color: "#f1f5f9" }}>user-submitted and unverified</strong>. Actual repair costs depend on your specific home, local labor rates, material costs, permit requirements, scope of work, and contractor. The data presented represents historical submissions and may not reflect current market conditions.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
            Always obtain at least three in-person quotes from licensed contractors before committing to any significant repair project. HouseMD cost data is for general reference only.
          </p>
        </div>

        {/* AI disclaimer */}
        <div
          className="rounded-2xl p-6 mb-8"
          style={{ background: "rgba(139, 92, 246, 0.05)", border: "1px solid rgba(139, 92, 246, 0.2)" }}
        >
          <h2 className="text-lg font-black mb-3" style={{ color: "#a78bfa" }}>
            🤖 AI Diagnostic Assistant Disclaimer
          </h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "#94a3b8" }}>
            The HouseMD AI Diagnostic Assistant (available to Pro members) is an AI language model. Its responses are generated based on training data and may contain errors, omissions, or outdated information. <strong style={{ color: "#f1f5f9" }}>AI responses are not a substitute for a professional inspection or licensed contractor assessment.</strong>
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
            The AI Assistant cannot see your home, assess structural conditions, verify code compliance, or account for local variations. Treat AI responses as a starting point for your own research, not as authoritative guidance.
          </p>
        </div>

        {/* Emergency section */}
        <div
          className="rounded-2xl p-6 mb-10"
          style={{ background: "rgba(239, 68, 68, 0.08)", border: "2px solid rgba(239, 68, 68, 0.3)" }}
        >
          <h2 className="text-xl font-black mb-3 flex items-center gap-2" style={{ color: "#f87171" }}>
            🚨 Emergency Situations — Do Not Use HouseMD
          </h2>
          <p className="text-base font-semibold mb-4" style={{ color: "#f1f5f9" }}>
            If you smell gas, see sparks or smoke, notice flooding, or face any immediate safety threat:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Gas leak", action: "Leave immediately. Call 911 and your gas company." },
              { label: "Electrical fire / sparks", action: "Cut power at the panel if safe. Call 911." },
              { label: "Major water leak / burst pipe", action: "Shut off the main water valve. Call a plumber." },
              { label: "Structural collapse risk", action: "Evacuate. Call 911. Do not re-enter." },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-4"
                style={{ background: "rgba(11, 15, 26, 0.6)", border: "1px solid rgba(239, 68, 68, 0.2)" }}
              >
                <div className="font-bold text-sm mb-1" style={{ color: "#f87171" }}>{item.label}</div>
                <div className="text-sm" style={{ color: "#94a3b8" }}>{item.action}</div>
              </div>
            ))}
          </div>
          <p className="text-sm mt-4 font-bold" style={{ color: "#f87171" }}>
            In any emergency, call 911. Do not search HouseMD first.
          </p>
        </div>

        {/* Full disclaimer text */}
        <div
          className="rounded-2xl p-6 mb-8"
          style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(30, 45, 69, 0.5)" }}
        >
          <h2 className="text-base font-bold mb-4" style={{ color: "#94a3b8" }}>Full Legal Disclaimer</h2>
          <p className="text-sm leading-relaxed" style={{ color: "#4b6080" }}>
            THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. HOUSEMD EXPRESSLY DISCLAIMS ALL WARRANTIES INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, COMPLETENESS, AND NON-INFRINGEMENT. THE USE OF ANY INFORMATION OBTAINED THROUGH THE PLATFORM IS ENTIRELY AT YOUR OWN RISK. HOUSEMD SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES RESULTING FROM THE USE OF, OR INABILITY TO USE, THE PLATFORM OR ANY INFORMATION CONTAINED THEREON.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/terms" className="btn-ghost px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ textDecoration: "none" }}>
            → Terms of Service
          </Link>
          <Link href="/privacy" className="btn-ghost px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ textDecoration: "none" }}>
            → Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
