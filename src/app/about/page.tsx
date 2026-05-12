import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ minHeight: 'calc(100vh - var(--header-height))', padding: 'var(--space-2xl) 0 var(--space-4xl)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <span className="badge badge-verified" style={{ marginBottom: 'var(--space-md)' }}>OUR MISSION</span>
          <h1 className="section-title" style={{ marginBottom: 'var(--space-sm)' }}>Transforming Fashion Dead Stock into Liquid Assets</h1>
          <p style={{ color: 'var(--color-warm-grey)', fontSize: '1.125rem', lineHeight: 1.6 }}>
            Threadbid is India&apos;s premier B2B English auction marketplace dedicated to building a highly efficient, transparent, and secure liquidation pipeline for fashion surplus, fabric excess, and export rejects.
          </p>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-lg)', marginBottom: 'var(--space-3xl)', background: 'var(--color-white)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-xl)', textAlign: 'center' }}>
          <div>
            <span style={{ display: 'block', fontSize: '2rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>₹45Cr+</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-warm-grey)', textTransform: 'uppercase' }}>Inventory Value Listed</span>
          </div>
          <div style={{ borderLeft: '1px solid var(--color-border-light)', borderRight: '1px solid var(--color-border-light)' }}>
            <span style={{ display: 'block', fontSize: '2rem', fontWeight: 700, color: 'var(--color-accent)' }}>100%</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-warm-grey)', textTransform: 'uppercase' }}>Verified B2B Buyers</span>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '2rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>7 Days</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-warm-grey)', textTransform: 'uppercase' }}>Average Turnaround</span>
          </div>
        </div>

        {/* Story Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', fontSize: '1rem', lineHeight: 1.7, color: 'var(--color-charcoal)' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: 'var(--space-sm)' }}>The Dead Stock Dilemma</h2>
            <p style={{ color: 'var(--color-warm-grey)' }}>
              For decades, surplus fashion inventory and dead stock liquidation have operated through highly fragmented, offline broker networks. This process is often rife with delayed settlements, brand dilution, and severe information asymmetry, leaving manufacturers with pennies on the dollar while excess inventory burdens storage capacity.
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: 'var(--space-sm)' }}>Our Approach</h2>
            <p style={{ color: 'var(--color-warm-grey)' }}>
              By centralizing liquidation via competitive, time-bound English auctions, Threadbid enforces true market-clearing price discovery. Sellers set transparent reserve floors, while pan-India verified wholesale buyers compete dynamically in real time. Backed by automated anti-sniping extensions and secure escrow settlements, we bring trust to institutional liquidation.
            </p>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: 'var(--space-xl)', marginTop: 'var(--space-md)' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-md)' }}>Core Platform Values</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
              <div style={{ background: 'var(--color-cream)', padding: 'var(--space-lg)', borderRadius: 'var(--radius-lg)' }}>
                <strong style={{ display: 'block', marginBottom: '4px' }}>Brand Protection</strong>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-warm-grey)' }}>Strict buyer KYC protocols prevent stock from ending up in unauthorized domestic discount channels.</span>
              </div>
              <div style={{ background: 'var(--color-cream)', padding: 'var(--space-lg)', borderRadius: 'var(--radius-lg)' }}>
                <strong style={{ display: 'block', marginBottom: '4px' }}>Guaranteed Liquidity</strong>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-warm-grey)' }}>End-to-end routing with dedicated settlement guarantees safeguards sellers from default risk.</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-3xl)' }}>
          <Link href="/how-it-works" className="btn btn-outline">Learn exactly how bidding works →</Link>
        </div>
      </div>
    </div>
  );
}
