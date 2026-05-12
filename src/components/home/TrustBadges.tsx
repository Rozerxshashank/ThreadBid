import styles from "./TrustBadges.module.css";

const badges = [
  {
    title: "Verified Sellers",
    description: "KYC-verified businesses with GST and PAN on file",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 2L4 7V13C4 19.63 8.28 25.79 14 27C19.72 25.79 24 19.63 24 13V7L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M10 14L13 17L19 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Secure Payments",
    description: "Razorpay-powered escrow with UPI, cards, and netbanking",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="5" width="22" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 11H25" stroke="currentColor" strokeWidth="2"/>
        <path d="M7 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Dispute Protection",
    description: "Structured resolution within 5 business days with full refund option",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="14" cy="19" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: "Anti-Counterfeit",
    description: "Admin-reviewed listings with brand verification and buyer reporting",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M9 14L13 18L19 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="3" y="3" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
];

export function TrustBadges() {
  return (
    <section className={styles.section} id="trust-section">
      <div className={styles.inner}>
        <h2 className={styles.title}>Built on Trust</h2>
        <div className={styles.grid}>
          {badges.map((badge) => (
            <div key={badge.title} className={styles.badge}>
              <div className={styles.icon}>{badge.icon}</div>
              <h3 className={styles.badgeTitle}>{badge.title}</h3>
              <p className={styles.badgeDesc}>{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
