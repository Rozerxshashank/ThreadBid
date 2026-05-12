import { HowItWorks } from "@/components/home/HowItWorks";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="section" style={{ minHeight: 'calc(100vh - var(--header-height))', paddingBottom: 'var(--space-4xl)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          <span className="badge badge-verified" style={{ marginBottom: 'var(--space-md)' }}>PROCESS EXPLAINED</span>
          <h1 className="section-title" style={{ marginBottom: 'var(--space-sm)' }}>From Excess Stock to Real Revenue</h1>
          <p style={{ color: 'var(--color-warm-grey)', maxWidth: '600px', margin: '0 auto' }}>
            Threadbid eliminates opaque offline bulk-buying channels by introducing transparent, competitive English auctions tailored specifically for fashion manufacturers, exporters, and premium brands.
          </p>
        </div>

        <HowItWorks />

        <div style={{ marginTop: 'var(--space-3xl)', background: 'var(--color-white)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-2xl)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-xl)' }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-sm)' }}>Anti-Sniping Protection</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-warm-grey)', lineHeight: 1.6 }}>
              If a valid bid is placed within the final 3 minutes of an auction, the timer automatically extends by 3 minutes. This guarantees true price discovery and prevents last-second automated bots from sniping lots unfairly.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-sm)' }}>Reserve & Buy Now Mechanics</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-warm-grey)', lineHeight: 1.6 }}>
              Set a confidential floor price (Reserve) to protect your brand value. Or attach an optional Buy Now price for fast liquidation before bidding intensifies. You maintain full strategic control over your inventory.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-sm)' }}>Verified Secure Escrow</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-warm-grey)', lineHeight: 1.6 }}>
              Payments are routed via Razorpay and held safely until shipment dispatch and delivery verification. Buyers are protected against counterfeit risks, and sellers are assured of guaranteed payouts without collection hassles.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-3xl)' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-md)' }}>Ready to Liquidate Smartly?</h2>
          <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
            <Link href="/seller/register" className="btn btn-primary btn-lg">List Your Unsold Inventory</Link>
            <Link href="/auctions" className="btn btn-outline btn-lg">Explore Live Auctions</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
