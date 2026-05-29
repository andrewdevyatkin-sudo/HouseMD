import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "HouseMD Terms of Service — rules governing use of the platform, user content, contractor listings, and liability limitations.",
};

const LAST_UPDATED = "May 28, 2026";
const EFFECTIVE_DATE = "May 28, 2026";
const CONTACT_EMAIL = "legal@housemd.com";

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: "#0b0f1a", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "rgba(17, 24, 39, 0.5)", borderBottom: "1px solid rgba(30, 45, 69, 0.5)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="section-label mb-3">Legal</div>
          <h1 className="text-4xl font-black mb-3" style={{ color: "#f1f5f9" }}>Terms of Service</h1>
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
                ["#acceptance", "Acceptance of Terms"],
                ["#eligibility", "Eligibility"],
                ["#accounts", "Accounts"],
                ["#platform-use", "Platform Use"],
                ["#ugc", "User Content"],
                ["#ugc-rules", "Content Rules"],
                ["#contractors", "Contractor Listings"],
                ["#pro", "HouseMD Pro"],
                ["#affiliate", "Affiliate Links"],
                ["#disclaimer-tos", "Disclaimer of Advice"],
                ["#liability", "Limitation of Liability"],
                ["#indemnification", "Indemnification"],
                ["#ip", "Intellectual Property"],
                ["#dmca", "DMCA / Copyright"],
                ["#termination", "Termination"],
                ["#disputes", "Dispute Resolution"],
                ["#governing-law", "Governing Law"],
                ["#contact-tos", "Contact"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="block py-1"
                  style={{ color: "#4b6080", textDecoration: "none", fontSize: "13px" }}
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
              .prose-content .warn-box { background: rgba(239, 68, 68, 0.06); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 12px; padding: 16px 20px; margin-bottom: 20px; }
            `}</style>

            <div className="highlight-box">
              <p style={{ marginBottom: 0 }}>
                <strong style={{ color: "#fbbf24" }}>Please read carefully.</strong> These Terms govern your use of HouseMD. By using the Platform, you agree to these Terms. If you do not agree, do not use HouseMD.
              </p>
            </div>

            <h2 id="acceptance">1. Acceptance of Terms</h2>
            <p>
              These Terms of Service ("Terms") constitute a legally binding agreement between you and HouseMD, Inc. ("HouseMD," "we," "us," "our") governing your access to and use of housemd.com and any associated services, mobile applications, or APIs (collectively, the "Platform").
            </p>
            <p>
              By creating an account, accessing the Platform, or using any features, you confirm that you have read, understood, and agree to be bound by these Terms and our <Link href="/privacy">Privacy Policy</Link>. These Terms incorporate our <Link href="/disclaimer">Disclaimer</Link> by reference.
            </p>

            <h2 id="eligibility">2. Eligibility</h2>
            <p>
              You must be at least 18 years of age to create an account or use features requiring registration. By using the Platform, you represent and warrant that you are 18 or older, have the legal capacity to enter into this agreement, and are not prohibited from using the Platform under any applicable law.
            </p>

            <h2 id="accounts">3. User Accounts</h2>
            <ul>
              <li>You are responsible for maintaining the security of your account credentials.</li>
              <li>You are responsible for all activities that occur under your account.</li>
              <li>You must notify us immediately at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> if you suspect unauthorized access to your account.</li>
              <li>You may not share your account with others or operate multiple accounts for abusive purposes.</li>
              <li>We reserve the right to refuse service, terminate accounts, or remove content at our discretion.</li>
            </ul>

            <h2 id="platform-use">4. Permitted and Prohibited Use</h2>

            <h3>4.1 Permitted Use</h3>
            <p>You may use HouseMD to:</p>
            <ul>
              <li>Search for and read home repair guides and cost information.</li>
              <li>Submit repair cost data based on your genuine personal experience.</li>
              <li>Post questions, answers, and reviews that reflect your honest opinions.</li>
              <li>Maintain a personal home profile and repair log for your own use.</li>
              <li>Contact listed contractors for legitimate home repair inquiries.</li>
            </ul>

            <h3>4.2 Prohibited Conduct</h3>
            <p>You may not:</p>
            <ul>
              <li>Post false, misleading, or fabricated repair cost data, reviews, or advice.</li>
              <li>Use the Platform to solicit business outside the contractor directory (spam/cold outreach to users).</li>
              <li>Scrape, crawl, or systematically extract data from the Platform without written permission.</li>
              <li>Attempt to bypass security, authentication, or rate limiting systems.</li>
              <li>Impersonate any person, business, or professional credential.</li>
              <li>Post content that is defamatory, harassing, discriminatory, or illegal.</li>
              <li>Use the Platform to engage in any commercial activity not expressly permitted by these Terms.</li>
              <li>Reverse engineer, decompile, or create derivative works from Platform software.</li>
              <li>Post content that infringes any intellectual property rights of others.</li>
              <li>Manipulate ratings, votes, or community systems through coordinated inauthentic behavior.</li>
            </ul>

            <h2 id="ugc">5. User-Generated Content — Ownership and License</h2>
            <p>
              "User Content" means any content you submit to the Platform, including questions, answers, reviews, cost submissions, project logs, and comments.
            </p>
            <p>
              <strong style={{ color: "#f1f5f9" }}>You retain ownership</strong> of your User Content. By submitting User Content, you grant HouseMD a non-exclusive, royalty-free, worldwide, perpetual, sublicensable license to use, display, reproduce, distribute, adapt, and create derivative works from your User Content in connection with operating, improving, and promoting the Platform.
            </p>
            <p>
              You represent and warrant that your User Content: (a) is accurate to the best of your knowledge; (b) does not infringe any third-party rights; (c) does not violate any law; and (d) complies with these Terms.
            </p>

            <h2 id="ugc-rules">6. Content Standards and Moderation</h2>
            <p>
              HouseMD moderates User Content but does not guarantee that all content is accurate, complete, or reliable. We reserve the right to remove any content that violates these Terms, at our sole discretion, without notice.
            </p>
            <p>Content submitted to the cost database must represent actual costs you personally paid. Submitting fabricated or inflated cost data is a violation of these Terms and may result in account suspension.</p>
            <p>Reviews of contractors must reflect genuine personal experiences. We may remove reviews that appear inauthentic or that were submitted by parties with conflicts of interest.</p>

            <h2 id="contractors">7. Contractor Listings and Contractor Relationships</h2>

            <div className="warn-box">
              <p style={{ marginBottom: 0 }}>
                <strong style={{ color: "#f87171" }}>Important:</strong> HouseMD is a directory and information platform. We are not a contractor, we do not employ contractors, and we do not provide home repair services. We do not guarantee the quality, safety, licensing, or legitimacy of any listed contractor.
              </p>
            </div>

            <p>
              Contractors listed on HouseMD are independent third parties. Any contract, agreement, or transaction you enter into with a contractor is solely between you and that contractor. HouseMD is not a party to, and bears no responsibility for, such agreements.
            </p>
            <p>
              Contractors who create listings on HouseMD agree to: (a) maintain valid licenses required for their trade in their service area; (b) carry appropriate insurance; (c) accurately represent their services and credentials; and (d) not engage in deceptive practices with HouseMD users.
            </p>
            <p>
              You are responsible for independently verifying any contractor's license, insurance, and qualifications before hiring them. We recommend obtaining multiple quotes and checking with your state contractor licensing board.
            </p>

            <h2 id="pro">8. HouseMD Pro — Subscription Terms</h2>
            <ul>
              <li>HouseMD Pro is billed monthly or annually as selected at purchase.</li>
              <li>Subscriptions automatically renew unless cancelled at least 24 hours before the renewal date.</li>
              <li>You may cancel at any time through your account settings. Access continues until the end of the billing period.</li>
              <li>Refunds: We offer a 7-day money-back guarantee for new Pro subscriptions. After 7 days, no refunds are issued for unused time.</li>
              <li>We reserve the right to change Pro pricing with 30 days' notice to existing subscribers.</li>
              <li>AI Diagnostic features are provided "as is" — see Section 10 (Disclaimer).</li>
            </ul>

            <h2 id="affiliate">9. Affiliate Links and Commercial Relationships</h2>
            <p>
              HouseMD participates in affiliate programs including Amazon Associates and the Home Depot affiliate program. When you click affiliate links and make a purchase, we may earn a commission. Affiliate links are identified with disclosure notices. The presence of affiliate links does not influence editorial content — we do not recommend products solely based on affiliate revenue.
            </p>
            <p>
              Sponsored guide categories are clearly labeled "Sponsored." Sponsors do not control editorial content within sponsored sections.
            </p>

            <h2 id="disclaimer-tos">10. Disclaimer of Advice — Critical Notice</h2>

            <div className="warn-box">
              <p style={{ marginBottom: 8 }}>
                <strong style={{ color: "#f87171" }}>IMPORTANT — Please read before using any guide or community advice:</strong>
              </p>
              <p style={{ marginBottom: 8 }}>
                Information on HouseMD is for <strong style={{ color: "#f1f5f9" }}>general informational purposes only</strong>. It is not professional advice. It does not constitute a recommendation to perform any specific repair, modification, or home improvement.
              </p>
              <p style={{ marginBottom: 0 }}>
                <strong style={{ color: "#f1f5f9" }}>For all work involving gas lines, electrical panels and wiring, load-bearing structures, foundations, asbestos, lead paint, or any work requiring a building permit</strong> — you must consult and hire a licensed professional. Failure to do so may void your homeowner's insurance, violate local building codes, and create serious safety hazards. See our full <Link href="/disclaimer">Disclaimer</Link>.
              </p>
            </div>

            <h2 id="liability">11. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, HOUSEMD, ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES — INCLUDING BUT NOT LIMITED TO PROPERTY DAMAGE, PERSONAL INJURY, LOSS OF DATA, OR FINANCIAL LOSS — ARISING FROM OR RELATED TO:
            </p>
            <ul>
              <li>Your use of or inability to use the Platform.</li>
              <li>Any repair performed based on information found on the Platform.</li>
              <li>The conduct or services of any contractor listed on the Platform.</li>
              <li>Inaccuracies in community-submitted cost data or advice.</li>
              <li>Any unauthorized access to your account or data.</li>
            </ul>
            <p>
              IN JURISDICTIONS THAT DO NOT ALLOW EXCLUSION OF CERTAIN WARRANTIES OR LIMITATION OF LIABILITY, OUR LIABILITY IS LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW. IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE AMOUNT YOU PAID TO HOUSEMD IN THE 12 MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.
            </p>

            <h2 id="indemnification">12. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless HouseMD and its affiliates, officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from: (a) your use of the Platform; (b) your User Content; (c) your violation of these Terms; or (d) your violation of any third-party rights.
            </p>

            <h2 id="ip">13. Intellectual Property</h2>
            <p>
              The HouseMD name, logo, website design, editorial guides, and software are the property of HouseMD, Inc. and are protected by copyright, trademark, and other intellectual property laws. You may not use our trademarks, logos, or editorial content without prior written permission.
            </p>
            <p>
              You may share links to Platform content and quote brief excerpts for non-commercial purposes with attribution to HouseMD. Systematic copying, republication, or commercial use of Platform content is prohibited.
            </p>

            <h2 id="dmca">14. DMCA / Copyright Infringement</h2>
            <p>
              HouseMD respects intellectual property rights. If you believe content on the Platform infringes your copyright, please send a DMCA takedown notice to <a href="mailto:dmca@housemd.com">dmca@housemd.com</a> including:
            </p>
            <ul>
              <li>Your contact information and a statement that you are the copyright owner or authorized to act on their behalf.</li>
              <li>Identification of the copyrighted work and the allegedly infringing content (URL).</li>
              <li>A statement of good faith belief that the use is not authorized.</li>
              <li>A statement under penalty of perjury that the information is accurate.</li>
              <li>Your physical or electronic signature.</li>
            </ul>
            <p>We will respond to valid DMCA notices within 10 business days.</p>

            <h2 id="termination">15. Termination</h2>
            <p>
              We may suspend or terminate your account at any time for violation of these Terms, suspected fraud or abuse, or at our discretion with or without cause. You may delete your account at any time through account settings.
            </p>
            <p>
              Upon termination, your right to access the Platform ceases immediately. Sections covering intellectual property, disclaimer, limitation of liability, indemnification, and dispute resolution survive termination.
            </p>

            <h2 id="disputes">16. Dispute Resolution and Arbitration</h2>
            <p>
              <strong style={{ color: "#f1f5f9" }}>Informal Resolution First:</strong> Before filing any claim, you agree to contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and attempt to resolve the dispute informally for at least 30 days.
            </p>
            <p>
              <strong style={{ color: "#f1f5f9" }}>Binding Arbitration:</strong> If informal resolution fails, disputes shall be resolved by binding arbitration under the American Arbitration Association (AAA) Consumer Arbitration Rules, except that either party may bring claims in small claims court for disputes within the jurisdictional limits.
            </p>
            <p>
              <strong style={{ color: "#f1f5f9" }}>Class Action Waiver:</strong> You waive the right to participate in class action lawsuits or class-wide arbitrations against HouseMD.
            </p>

            <h2 id="governing-law">17. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of the State of Delaware, without regard to conflict of law principles. Any arbitration or court proceedings shall take place in Delaware.
            </p>

            <h2 id="contact-tos">18. Contact</h2>
            <div
              className="rounded-xl p-5 mt-2"
              style={{ background: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(30, 45, 69, 0.5)" }}
            >
              <p style={{ marginBottom: 8 }}><strong style={{ color: "#f1f5f9" }}>HouseMD, Inc.</strong></p>
              <p style={{ marginBottom: 4 }}>Legal Team</p>
              <p style={{ marginBottom: 0 }}><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/privacy" className="btn-ghost px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ textDecoration: "none" }}>
                → Privacy Policy
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
