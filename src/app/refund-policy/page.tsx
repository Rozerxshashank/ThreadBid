import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <div style={{ minHeight: 'calc(100vh - var(--header-height))', padding: 'var(--space-2xl) 0 var(--space-4xl)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ borderBottom: '1px solid var(--color-border-light)', paddingBottom: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
          <h1 className="section-title" style={{ marginBottom: '4px' }}>B2B Refund & Dispute Policy</h1>
          <span style={{ fontSize: '0.813rem', color: 'var(--color-warm-grey)' }}>Governing Frame: Wholesale Surplus Transactions Escrow Protection</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--color-charcoal)' }}>
          <section>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '8px', color: 'var(--color-accent)' }}>1. Strict Liquidation Finality</h2>
            <p>
              Given the dynamic pricing architecture of dead stock auctions, standard retail &quot;change of mind&quot; returns are strictly prohibited. Once an auction outcome settles programmatically, the winning buyer&apos;s escrow commitment is final. Returns or refunds are triggered solely under verified material default parameters.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '8px', color: 'var(--color-accent)' }}>2. Valid Grounds for Full Refund Activation</h2>
            <p>
              Escrow funds are refunded back to the buyer&apos;s source account within 5 business days without penalties under the following verified events:
            </p>
            <ul style={{ paddingLeft: '20px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li><strong>Severe Grade Mismatch:</strong> Lot condition deviates fundamentally from listed grading (e.g., lot sold as &quot;Like New&quot; exhibits deep permanent moisture stains across over 10% of units).</li>
              <li><strong>Brand Counterfeits:</strong> Delivered garments lack authentic licensing authorization or match flagged non-compliant labels.</li>
              <li><strong>Non-Fulfillment Default:</strong> The seller fails to transfer inventory to our verified dispatch courier within the maximum contractual window (7 consecutive days post-escrow deposit).</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '8px', color: 'var(--color-accent)' }}>3. Inspection Window & Dispute Initiation</h2>
            <p>
              Buyers receive a mandatory <strong>48-hour inspection window</strong> starting from the certified physical timestamp of warehouse delivery. To trigger escrow lock, the buyer must raise a formal dispute claim via their order ledger, uploading timestamped image/video proofs detailing the variance.
            </p>
            <p style={{ marginTop: '8px', color: 'var(--color-warning)', fontWeight: 600 }}>
              Failure to lodge a formal challenge within 48 hours results in automatic settlement release. Funds are disbursed to the seller irreversibly, closing out the ledger transaction.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '8px', color: 'var(--color-accent)' }}>4. Partial Compensation Protocol</h2>
            <p>
              In events where variance affects only a minor subset of an unsealed lot (e.g., 15 pieces missing out of a 500-piece bulk pack), our internal quality audit desk calculates programmatic prorated deductions. The modified refund delta is remitted to the buyer while the validated inventory segment proceeds to final seller disbursement.
            </p>
          </section>
        </div>

        <div style={{ marginTop: 'var(--space-2xl)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--color-border-light)' }}>
          <Link href="/contact" className="btn btn-primary btn-sm">Raise an Order Dispute</Link>
        </div>
      </div>
    </div>
  );
}
