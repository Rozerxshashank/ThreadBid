import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: 'calc(100vh - var(--header-height))', padding: 'var(--space-2xl) 0 var(--space-4xl)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ borderBottom: '1px solid var(--color-border-light)', paddingBottom: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
          <h1 className="section-title" style={{ marginBottom: '4px' }}>Privacy Policy & DPDP Declarations</h1>
          <span style={{ fontSize: '0.813rem', color: 'var(--color-warm-grey)' }}>Compliance Frame: Digital Personal Data Protection Act, 2023</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--color-charcoal)' }}>
          <section>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '8px', color: 'var(--color-accent)' }}>1. Data Collection Architecture</h2>
            <p>
              Threadbid processes business and personnel identities exclusively to facilitate wholesale liquidation workflows. Collected categories include corporate incorporation records, GSTIN and PAN details, nodal operations contact coordinates, IP telemetry during transactional bid signatures, and encrypted payout bank token keys.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '8px', color: 'var(--color-accent)' }}>2. Purpose Limitation</h2>
            <p>
              Collected parameters are leveraged strictly for:
            </p>
            <ul style={{ paddingLeft: '20px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li>Executing counter-party KYC validation protocols.</li>
              <li>Guaranteeing algorithmic sequence security during real-time English bidding.</li>
              <li>Processing end-to-end settlement statements via authorized gateway entities (Razorpay).</li>
              <li>Maintaining mandatory multi-year tax audit histories and dispute audit logs.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '8px', color: 'var(--color-accent)' }}>3. Cryptographic & Security Safeguards</h2>
            <p>
              In alignment with state frameworks, static credentials (account login keys) are hashed programmatically leveraging memory-hard cryptographic key functions (`argon2id`). Nodal ledger bank parameters are maintained with symmetric AES encryption at the database abstraction layers. All edge communication routes are bound unconditionally via TLS protocols.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '8px', color: 'var(--color-accent)' }}>4. Third-Party Access Boundaries</h2>
            <p>
              We do not distribute, rent, or monetize entity behavior metrics to external ad-tech clusters. Minimal payload parameters are shared strictly with certified state gateway sub-processors and physical cargo tracking brokers to fulfill primary supply-chain routing.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '8px', color: 'var(--color-accent)' }}>5. Rights of Data Principals</h2>
            <p>
              Registered entities retain absolute operational transparency regarding stored telemetry parameters. Requests for metadata extraction, explicit rectification of bank token updates, or DPDP compliance audit logs can be dispatched formally to our Data Protection Officer at <strong>privacy@threadbid.in</strong>.
            </p>
          </section>
        </div>

        <div style={{ marginTop: 'var(--space-2xl)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--color-border-light)' }}>
          <Link href="/contact" className="btn btn-ghost btn-sm">Direct Data Erasure Inquiries</Link>
        </div>
      </div>
    </div>
  );
}
