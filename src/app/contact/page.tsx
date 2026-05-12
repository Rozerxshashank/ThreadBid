"use client";

import { useState } from "react";
import styles from "../auth/auth.module.css";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - var(--header-height))', padding: 'var(--space-2xl) 0 var(--space-4xl)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <h1 className="section-title" style={{ marginBottom: 'var(--space-xs)' }}>Contact Our Team</h1>
          <p style={{ color: 'var(--color-warm-grey)' }}>Have a customized bulk inquiry or need support with an ongoing auction? Reach out directly.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-2xl)', alignItems: 'flex-start' }}>
          {/* Form Area */}
          <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-2xl)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-2xl) 0' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 'var(--space-sm)' }}>✉️</span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>Message Sent</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-warm-grey)', marginBottom: 'var(--space-xl)' }}>Our liquidation desk will contact you within 4 business hours.</p>
                <button className="btn btn-outline btn-sm" onClick={() => setSubmitted(false)}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div>
                  <label className="input-label">Full Name</label>
                  <input type="text" className="input-field" required placeholder="Your name" />
                </div>
                <div>
                  <label className="input-label">Corporate Email</label>
                  <input type="email" className="input-field" required placeholder="name@company.com" />
                </div>
                <div>
                  <label className="input-label">Inquiry Purpose</label>
                  <select className="input-field" required>
                    <option value="">Select purpose</option>
                    <option value="sell">Listing Dead Stock inventory</option>
                    <option value="buy">Wholesale buying requirements</option>
                    <option value="dispute">Ongoing auction dispute</option>
                    <option value="other">General platform query</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">Message Details</label>
                  <textarea className="input-field" rows={4} required placeholder="Include lot categories, approximate units, or specific questions..." style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }} disabled={loading}>
                  {loading ? "Transmitting..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>

          {/* Coordinates Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            <div style={{ background: 'var(--color-cream)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-md)', color: 'var(--color-accent)' }}>Corporate Offices</h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-charcoal)' }}>
                <strong>Threadbid Liquidation Hub</strong><br />
                Tower B, Level 4, Prestige Tech Park<br />
                Marathahalli Outer Ring Road<br />
                Bengaluru, Karnataka 560103<br />
                India
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', fontSize: '0.875rem' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--color-warm-grey)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Direct Support Line</strong>
                <span>+91 80 4567 8900 (Mon–Sat, 9 AM – 7 PM)</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--color-warm-grey)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Escrow Desk Email</strong>
                <span>escrow@threadbid.in</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--color-warm-grey)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Grievance Officer</strong>
                <span>grievance@threadbid.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
