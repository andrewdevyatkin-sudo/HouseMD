import Link from "next/link";

const links = {
  Guides: [
    { label: "Plumbing Repairs", href: "/browse?system=Plumbing" },
    { label: "HVAC Guides", href: "/browse?system=HVAC" },
    { label: "Electrical Help", href: "/browse?system=Electrical" },
    { label: "Roof & Exterior", href: "/browse?system=Roof" },
    { label: "Browse All", href: "/browse" },
  ],
  Community: [
    { label: "Ask a Question", href: "/community" },
    { label: "Recent Threads", href: "/community" },
    { label: "Find Contractors", href: "/contractors" },
    { label: "Submit Your Project", href: "/community" },
  ],
  Data: [
    { label: "Cost Database", href: "/costs" },
    { label: "Submit Cost Data", href: "/costs" },
    { label: "Regional Reports", href: "/costs" },
  ],
  Account: [
    { label: "My Home Profile", href: "/profile" },
    { label: "Saved Guides", href: "/profile" },
    { label: "Maintenance Log", href: "/profile" },
    { label: "HouseMD Pro", href: "/profile" },
  ],
};

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-link { color: #4b6080; font-size: 14px; transition: color 0.2s ease; text-decoration: none; }
        .footer-link:hover { color: #94a3b8; }
        .footer-legal-link { color: #4b6080; font-size: 12px; text-decoration: none; transition: color 0.2s ease; }
        .footer-legal-link:hover { color: #94a3b8; }
      `}</style>
      <footer style={{ background: "#070a12", borderTop: "1px solid rgba(30, 45, 69, 0.5)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Top section */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4" style={{ textDecoration: "none" }}>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-black"
                  style={{ background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", color: "#0b0f1a" }}
                >
                  H
                </div>
                <span className="font-black text-xl" style={{ color: "#f1f5f9" }}>
                  House<span style={{ color: "#f59e0b" }}>MD</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#4b6080", maxWidth: "220px" }}>
                The community-powered home repair knowledge base. Real costs, real advice, real fixes.
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-semibold"
                  style={{ background: "rgba(16, 185, 129, 0.1)", color: "#34d399", border: "1px solid rgba(16, 185, 129, 0.2)" }}
                >
                  ✦ 94,100 members
                </span>
              </div>
            </div>

            {/* Links */}
            {Object.entries(links).map(([section, items]) => (
              <div key={section}>
                <h3 className="text-xs font-bold mb-4 tracking-widest uppercase" style={{ color: "#f59e0b" }}>
                  {section}
                </h3>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="footer-link">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="divider mb-8" />

          {/* Affiliate disclosure */}
          <div
            className="rounded-xl px-4 py-3 mb-6 text-sm"
            style={{ background: "rgba(245, 158, 11, 0.04)", border: "1px solid rgba(245, 158, 11, 0.1)", color: "#4b6080" }}
          >
            <strong style={{ color: "#f59e0b" }}>Affiliate Disclosure:</strong> Some links on HouseMD are affiliate links. If you purchase through them, we may earn a commission at no extra cost to you. This does not influence our editorial content.
          </div>

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs leading-relaxed" style={{ color: "#4b6080", maxWidth: "580px" }}>
              © {2026} HouseMD, Inc. All information is for general educational purposes only — not professional advice. Always consult licensed professionals for structural, electrical, gas, and permit-required work.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link href="/privacy" className="footer-legal-link">Privacy</Link>
              <Link href="/terms" className="footer-legal-link">Terms</Link>
              <Link href="/disclaimer" className="footer-legal-link">Disclaimer</Link>
              <a href="mailto:dmca@housemd.com" className="footer-legal-link">DMCA</a>
              <a href="mailto:legal@housemd.com" className="footer-legal-link">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
