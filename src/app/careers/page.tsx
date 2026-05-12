import Link from "next/link";

const OPENINGS = [
  { role: "Senior Full-Stack Engineer (Next.js/Prisma)", team: "Engineering", type: "Full-time", location: "Bengaluru / Hybrid", exp: "4+ Years" },
  { role: "Category Lead — Fashion Clearance", team: "Merchandising & Ops", type: "Full-time", location: "Bengaluru", exp: "5+ Years" },
  { role: "Liquidation Ops Specialist", team: "Operations", type: "Full-time", location: "Tirupur / Field Hub", exp: "2+ Years" },
  { role: "B2B Sales Executive — Apparel Brands", team: "Sourcing", type: "Full-time", location: "Mumbai / Remote", exp: "3+ Years" },
];

export default function CareersPage() {
  return (
    <div style={{ minHeight: 'calc(100vh - var(--header-height))', padding: 'var(--space-2xl) 0 var(--space-4xl)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <span className="badge badge-verified" style={{ marginBottom: 'var(--space-md)' }}>JOIN THE DISRUPTION</span>
          <h1 className="section-title" style={{ marginBottom: 'var(--space-sm)' }}>Build the Standard for B2B Liquidation</h1>
          <p style={{ color: 'var(--color-warm-grey)', maxWidth: '600px', margin: '0 auto' }}>
            We are looking for builders, supply-chain experts, and technologists who thrive on organizing deep, complex legacy wholesale networks.
          </p>
        </div>

        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-lg)', color: 'var(--color-charcoal)' }}>Open Roles</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {OPENINGS.map((job) => (
              <div key={job.role} style={{ background: 'var(--color-white)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-md)' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-accent)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>{job.team}</span>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>{job.role}</h3>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.813rem', color: 'var(--color-warm-grey)', marginTop: '4px' }}>
                    <span>📍 {job.location}</span>
                    <span>·</span>
                    <span>💼 {job.exp}</span>
                    <span>·</span>
                    <span>⏱️ {job.type}</span>
                  </div>
                </div>
                <Link href={`/contact?apply=${encodeURIComponent(job.role)}`} className="btn btn-outline btn-sm" style={{ flexShrink: 0 }}>
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--color-cream)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-2xl)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-xs)' }}>Don&apos;t see a matching role?</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-warm-grey)', marginBottom: 'var(--space-lg)', maxWidth: '500px', margin: '0 auto var(--space-lg)' }}>
            We are continuously expanding our liquidation pipelines. Submit your general profile and resume directly to our recruiting engine.
          </p>
          <a href="mailto:careers@threadbid.in" className="btn btn-primary btn-sm">Email Resume Directly</a>
        </div>
      </div>
    </div>
  );
}
