import Link from "next/link";

export default function TermsPage() {
  return (
    <div style={{ minHeight: 'calc(100vh - var(--header-height))', padding: 'var(--space-2xl) 0 var(--space-4xl)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ borderBottom: '1px solid var(--color-border-light)', paddingBottom: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
          <h1 className="section-title" style={{ marginBottom: '4px' }}>Terms of Service</h1>
          <span style={{ fontSize: '0.813rem', color: 'var(--color-warm-grey)' }}>Last Updated: May 12, 2026 · Version 1.2</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--color-charcoal)' }}>
          <section>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '8px', color: 'var(--color-accent)' }}>1. Scope & B2B Eligibility</h2>
            <p>
              Threadbid is strictly a Business-to-Business (B2B) digital liquidation platform. Access is granted solely to registered corporate entities, manufacturers, authorized distributors, and verified wholesalers. Individual retail consumer accounts are prohibited. All corporate entities must successfully clear our verification protocols (incorporation validation, active GSTIN verification, PAN validation) prior to participating in active wholesale bidding.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '8px', color: 'var(--color-accent)' }}>2. Auction Mechanics & English Bidding Rules</h2>
            <p>
              Listings follow pure English auction logic. All bids placed are immutable and legally binding commitments to purchase the entire lot specified.
            </p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li><strong>Increment Tiers:</strong> Subsequent bids must strictly adhere to the programmatic minimum bid increment calculated relative to the active winning price.</li>
              <li><strong>Anti-Sniping Extensions:</strong> Any valid bid submitted during the final 3 minutes of an active cycle automatically prolongs the auction closure window by an additional 3 minutes.</li>
              <li><strong>Reserve Thresholds:</strong> If an auction finishes below the optional confidential reserve baseline fixed by the original seller, settlement remains subject to post-auction explicit seller approval.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '8px', color: 'var(--color-accent)' }}>3. Payment Routing & Platform Commissions</h2>
            <p>
              Upon successful auction closure, winning buyers are issued consolidated invoices capturing the total closing bid. The buyer must submit total funds directly into the platform&apos;s verified nodal escrow account within the designated contractual payment window (typically 48 hours).
            </p>
            <p style={{ marginTop: '8px' }}>
              Threadbid deducts an <strong>8% gross platform fee</strong> directly from the closing bid amount prior to disbursing the remaining funds to the seller&apos;s registered bank coordinates upon successful fulfillment verification.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '8px', color: 'var(--color-accent)' }}>4. Counterfeit & Anti-Fraud Declarations</h2>
            <p>
              Sellers warrant unconditionally that all listed lots are fully authentic, legal dead stock merchandise free of unauthorized third-party trademark claims. Uploading counterfeit stock, misleading grade definitions, or stock containing toxic azo dyes results in immediate permanent account termination, forfeiture of pending escrows, and civil reporting under applicable Indian penal code provisions.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '8px', color: 'var(--color-accent)' }}>5. Governing Jurisdiction</h2>
            <p>
              These operating parameters are construed under and governed by the laws of India. Any jurisdictional disputes arising from unfulfilled settlements or platform arbitration fall exclusively under the courts located in Bengaluru, Karnataka.
            </p>
          </section>
        </div>

        <div style={{ marginTop: 'var(--space-2xl)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--color-border-light)' }}>
          <Link href="/contact" className="btn btn-ghost btn-sm">Have compliance questions? Contact Grievance Desk</Link>
        </div>
      </div>
    </div>
  );
}
