import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "HouseMD Privacy Policy — how we collect, use, and protect your personal information.",
};

const LAST_UPDATED = "May 28, 2026";
const EFFECTIVE_DATE = "May 28, 2026";
const CONTACT_EMAIL = "privacy@housemd.com";

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: "#0b0f1a", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "rgba(17, 24, 39, 0.5)", borderBottom: "1px solid rgba(30, 45, 69, 0.5)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="section-label mb-3">Legal</div>
          <h1 className="text-4xl font-black mb-3" style={{ color: "#f1f5f9" }}>Privacy Policy</h1>
          <p className="text-sm" style={{ color: "#4b6080" }}>
            Last updated: {LAST_UPDATED} · Effective: {EFFECTIVE_DATE}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* TOC */}
          <aside className="hidden lg:block">
            <div
              className="rounded-2xl p-5 sticky top-24 text-sm space-y-2"
              style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(30, 45, 69, 0.5)" }}
            >
              <div className="font-bold mb-3 text-xs uppercase tracking-widest" style={{ color: "#f59e0b" }}>Contents</div>
              {[
                ["#overview", "Overview"],
                ["#data-collected", "Data We Collect"],
                ["#how-we-use", "How We Use Data"],
                ["#sharing", "Data Sharing"],
                ["#cookies", "Cookies"],
                ["#ugc", "User Content"],
                ["#retention", "Data Retention"],
                ["#rights", "Your Rights"],
                ["#security", "Security"],
                ["#children", "Children"],
                ["#changes", "Policy Changes"],
                ["#contact", "Contact Us"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="block py-1 toc-link"
                  style={{ color: "#4b6080", textDecoration: "none" }}
                >
                  {label}
                </a>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3 prose-content">
            <style>{`
              .prose-content h2 { font-size: 20px; font-weight: 800; color: #f1f5f9; margin-top: 40px; margin-bottom: 12px; scroll-margin-top: 100px; }
              .prose-content h3 { font-size: 16px; font-weight: 700; color: #f1f5f9; margin-top: 24px; margin-bottom: 8px; }
              .prose-content p { font-size: 15px; line-height: 1.8; color: #94a3b8; margin-bottom: 16px; }
              .prose-content ul { margin-bottom: 16px; padding-left: 0; list-style: none; }
              .prose-content ul li { font-size: 15px; line-height: 1.7; color: #94a3b8; padding-left: 20px; position: relative; margin-bottom: 6px; }
              .prose-content ul li::before { content: "·"; position: absolute; left: 0; color: #f59e0b; font-weight: bold; }
              .prose-content a { color: #fbbf24; text-decoration: underline; }
              .prose-content .highlight-box { background: rgba(245, 158, 11, 0.06); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 12px; padding: 16px 20px; margin-bottom: 20px; }
              .prose-content .info-box { background: rgba(59, 130, 246, 0.06); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px; padding: 16px 20px; margin-bottom: 20px; }
              .prose-content .warn-box { background: rgba(239, 68, 68, 0.06); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 12px; padding: 16px 20px; margin-bottom: 20px; }
              .prose-content table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              .prose-content th { font-size: 12px; font-weight: 700; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.08em; padding: 10px 14px; text-align: left; border-bottom: 1px solid rgba(30,45,69,0.8); }
              .prose-content td { font-size: 14px; color: #94a3b8; padding: 10px 14px; border-bottom: 1px solid rgba(30,45,69,0.4); vertical-align: top; }
              .toc-link:hover { color: #94a3b8 !important; }
            `}</style>

            <div className="highlight-box">
              <p style={{ marginBottom: 0 }}>
                <strong style={{ color: "#fbbf24" }}>Summary:</strong> HouseMD is committed to your privacy. We collect only what we need to run the platform. We do not sell your personal data. You have the right to access, correct, or delete your information at any time.
              </p>
            </div>

            <h2 id="overview">1. Overview</h2>
            <p>
              HouseMD ("we," "us," or "our") operates housemd.com (the "Platform"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Platform. By using HouseMD, you consent to the data practices described in this policy.
            </p>
            <p>
              HouseMD is operated by HouseMD, Inc. and is subject to applicable United States federal and state privacy laws, including the California Consumer Privacy Act (CCPA/CPRA), and — to the extent applicable — the General Data Protection Regulation (GDPR).
            </p>

            <h2 id="data-collected">2. Data We Collect</h2>

            <h3>2.1 Information You Provide Directly</h3>
            <ul>
              <li><strong style={{ color: "#f1f5f9" }}>Account information:</strong> Name, email address, and password when you create an account.</li>
              <li><strong style={{ color: "#f1f5f9" }}>Home profile data:</strong> Home type, year built, square footage, location (city/state — not full address), roof type, HVAC type, and other home characteristics you choose to enter.</li>
              <li><strong style={{ color: "#f1f5f9" }}>Repair logs:</strong> Repair projects, costs, dates, and notes you voluntarily record in your maintenance log.</li>
              <li><strong style={{ color: "#f1f5f9" }}>Cost submissions:</strong> Repair cost data, contractor type, city/region, and project notes you choose to contribute to our cost database.</li>
              <li><strong style={{ color: "#f1f5f9" }}>Community content:</strong> Questions, answers, reviews, and comments you post publicly.</li>
              <li><strong style={{ color: "#f1f5f9" }}>Contractor reviews:</strong> Review text, ratings, and service details you submit about contractors.</li>
              <li><strong style={{ color: "#f1f5f9" }}>Payment information:</strong> For HouseMD Pro subscriptions, payment details are processed by Stripe. We do not store your full card number.</li>
            </ul>

            <h3>2.2 Information Collected Automatically</h3>
            <ul>
              <li><strong style={{ color: "#f1f5f9" }}>Usage data:</strong> Pages visited, search queries, guides viewed, time on site, click events.</li>
              <li><strong style={{ color: "#f1f5f9" }}>Device data:</strong> Browser type, operating system, screen resolution, referring URL.</li>
              <li><strong style={{ color: "#f1f5f9" }}>IP address:</strong> Collected for security, fraud prevention, and approximate geographic location.</li>
              <li><strong style={{ color: "#f1f5f9" }}>Cookies and local storage:</strong> See Section 5 (Cookies) for full details.</li>
            </ul>

            <h3>2.3 Information from Third Parties</h3>
            <ul>
              <li>If you sign in via Google or Apple, we receive your name and email from those providers.</li>
              <li>If you are a contractor, we may verify your license through publicly available contractor license databases.</li>
            </ul>

            <h2 id="how-we-use">3. How We Use Your Data</h2>

            <table>
              <thead>
                <tr><th>Purpose</th><th>Legal Basis</th></tr>
              </thead>
              <tbody>
                <tr><td>Providing and personalizing the Platform</td><td>Contract performance</td></tr>
                <tr><td>Personalizing maintenance checklists and guide recommendations based on your home profile</td><td>Legitimate interest / Consent</td></tr>
                <tr><td>Sending seasonal maintenance reminders (if opted in)</td><td>Consent</td></tr>
                <tr><td>Processing HouseMD Pro subscription payments</td><td>Contract performance</td></tr>
                <tr><td>Aggregating anonymized cost data for the Cost Database</td><td>Legitimate interest</td></tr>
                <tr><td>Detecting and preventing fraud, abuse, and security incidents</td><td>Legitimate interest</td></tr>
                <tr><td>Sending product updates, newsletters (if opted in)</td><td>Consent</td></tr>
                <tr><td>Improving search, recommendations, and AI features</td><td>Legitimate interest</td></tr>
                <tr><td>Complying with legal obligations</td><td>Legal obligation</td></tr>
              </tbody>
            </table>

            <p>
              We do <strong style={{ color: "#f1f5f9" }}>not</strong> use your personal data to train third-party AI models, and we do not sell your personal information to advertisers or data brokers.
            </p>

            <h2 id="sharing">4. Data Sharing and Disclosure</h2>

            <h3>4.1 Public Information</h3>
            <p>
              Content you post publicly — including community Q&A posts, cost submissions (attributed to a username), contractor reviews, and project logs you mark as public — is visible to all users and indexed by search engines. Choose a username that does not reveal your identity if you prefer anonymity.
            </p>

            <h3>4.2 Service Providers</h3>
            <p>We share data with third-party service providers who help us operate the Platform under strict data processing agreements:</p>
            <ul>
              <li><strong style={{ color: "#f1f5f9" }}>Stripe</strong> — payment processing (PCI DSS compliant)</li>
              <li><strong style={{ color: "#f1f5f9" }}>Vercel</strong> — hosting and infrastructure</li>
              <li><strong style={{ color: "#f1f5f9" }}>Supabase/PostgreSQL</strong> — database storage</li>
              <li><strong style={{ color: "#f1f5f9" }}>Resend</strong> — transactional email delivery</li>
              <li><strong style={{ color: "#f1f5f9" }}>Cloudflare</strong> — CDN, security, and DDoS protection</li>
              <li><strong style={{ color: "#f1f5f9" }}>Algolia</strong> — search indexing (guides are indexed; personal data is not sent)</li>
            </ul>

            <h3>4.3 Contractor Directory</h3>
            <p>
              When you contact a contractor through HouseMD, we may share your name and contact information with that contractor to facilitate the communication. We are not responsible for the contractor's own privacy practices.
            </p>

            <h3>4.4 Affiliate Links</h3>
            <p>
              Some product links on the Platform are affiliate links. When you click these links and make a purchase, the retailer (e.g., Amazon, Home Depot) may receive information about the transaction. We do not share your personal data with affiliates proactively.
            </p>

            <h3>4.5 Legal Requirements</h3>
            <p>
              We may disclose your data if required by law, court order, or government authority, or to protect the rights, property, or safety of HouseMD, our users, or the public.
            </p>

            <h3>4.6 Business Transfers</h3>
            <p>
              In the event of a merger, acquisition, or sale of assets, your data may be transferred. You will be notified via email or a prominent notice on the Platform before your data is subject to a different privacy policy.
            </p>

            <h2 id="cookies">5. Cookies and Tracking Technologies</h2>

            <table>
              <thead>
                <tr><th>Cookie Type</th><th>Purpose</th><th>Duration</th></tr>
              </thead>
              <tbody>
                <tr><td>Strictly Necessary</td><td>Authentication session, security tokens, CSRF protection</td><td>Session / 30 days</td></tr>
                <tr><td>Functional</td><td>Remembering your preferences (dark mode, saved filters, dismissed banners)</td><td>1 year</td></tr>
                <tr><td>Analytics</td><td>Anonymous usage statistics (page views, bounce rate) — only with consent</td><td>90 days</td></tr>
                <tr><td>Advertising</td><td>We do not use advertising tracking cookies</td><td>N/A</td></tr>
              </tbody>
            </table>

            <p>
              You can control cookies through our Cookie Preferences banner or your browser settings. Disabling strictly necessary cookies will break authentication functionality.
            </p>

            <h2 id="ugc">6. User-Generated Content</h2>
            <p>
              Content you post on HouseMD (Q&A posts, reviews, cost submissions, project logs marked as public) may be viewable by others, cached by search engines, and retained on our servers even if you delete your account (in aggregated or anonymized form). Reviews of contractors are retained for community integrity and may not be fully deleted to prevent manipulation.
            </p>
            <p>
              You retain ownership of content you create. By posting, you grant HouseMD a non-exclusive, royalty-free, worldwide license to display, distribute, and use that content in connection with operating and improving the Platform.
            </p>

            <h2 id="retention">7. Data Retention</h2>
            <ul>
              <li><strong style={{ color: "#f1f5f9" }}>Account data:</strong> Retained while your account is active. Deleted within 30 days of account deletion request, except where legally required to retain.</li>
              <li><strong style={{ color: "#f1f5f9" }}>Home profile and repair logs:</strong> Deleted upon account deletion.</li>
              <li><strong style={{ color: "#f1f5f9" }}>Aggregated cost data:</strong> Retained indefinitely in anonymized, aggregated form (no personal identifiers).</li>
              <li><strong style={{ color: "#f1f5f9" }}>Public community posts:</strong> May be retained in anonymized form for platform integrity.</li>
              <li><strong style={{ color: "#f1f5f9" }}>Payment records:</strong> Retained for 7 years per financial regulations.</li>
            </ul>

            <h2 id="rights">8. Your Privacy Rights</h2>

            <div className="info-box">
              <p style={{ marginBottom: 0 }}>
                <strong style={{ color: "#60a5fa" }}>All users</strong> can exercise these rights by emailing <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We respond within 30 days.
              </p>
            </div>

            <ul>
              <li><strong style={{ color: "#f1f5f9" }}>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong style={{ color: "#f1f5f9" }}>Correction:</strong> Request correction of inaccurate data.</li>
              <li><strong style={{ color: "#f1f5f9" }}>Deletion:</strong> Request deletion of your account and personal data ("right to be forgotten").</li>
              <li><strong style={{ color: "#f1f5f9" }}>Portability:</strong> Request your data in a machine-readable format.</li>
              <li><strong style={{ color: "#f1f5f9" }}>Opt-out:</strong> Unsubscribe from marketing emails at any time via the unsubscribe link.</li>
              <li><strong style={{ color: "#f1f5f9" }}>Restrict processing:</strong> Request that we limit how we process your data in certain circumstances.</li>
            </ul>

            <h3>California Residents (CCPA/CPRA)</h3>
            <p>
              California residents have the right to know what personal information is collected, to opt-out of the "sale" of personal information (we do not sell personal data), and to non-discrimination for exercising privacy rights. To exercise your CCPA rights, contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>

            <h3>EU/EEA/UK Residents (GDPR)</h3>
            <p>
              If you are located in the EU, EEA, or UK, you have additional rights under GDPR including the right to lodge a complaint with your local supervisory authority. Our data processing is based on legitimate interests, contract performance, and/or your consent as described in Section 3.
            </p>

            <h2 id="security">9. Data Security</h2>
            <p>
              We implement industry-standard security measures including TLS encryption in transit, AES-256 encryption at rest for sensitive fields, hashed passwords (bcrypt), rate limiting, and regular security audits. However, no internet transmission is 100% secure. In the event of a data breach that affects your rights or freedoms, we will notify you within 72 hours as required by applicable law.
            </p>

            <h2 id="children">10. Children's Privacy</h2>
            <p>
              HouseMD is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will delete it promptly.
            </p>

            <h2 id="changes">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of material changes by email (if you have an account) or by posting a prominent notice on the Platform at least 30 days before changes take effect. Continued use of the Platform after changes constitutes acceptance of the updated policy.
            </p>

            <h2 id="contact">12. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or wish to exercise your rights:</p>
            <div
              className="rounded-xl p-5 mt-2"
              style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(30, 45, 69, 0.5)" }}
            >
              <p style={{ marginBottom: 8 }}><strong style={{ color: "#f1f5f9" }}>HouseMD, Inc.</strong></p>
              <p style={{ marginBottom: 4 }}>Privacy Team</p>
              <p style={{ marginBottom: 4 }}><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
              <p style={{ marginBottom: 0 }}>Response time: within 30 days</p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/terms" className="btn-ghost px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ textDecoration: "none" }}>
                → Terms of Service
              </Link>
              <Link href="/disclaimer" className="btn-ghost px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ textDecoration: "none" }}>
                → Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
