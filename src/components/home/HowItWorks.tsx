import styles from "./HowItWorks.module.css";

const steps = [
  {
    number: "01",
    title: "List Your Stock",
    description:
      "Upload photos, set your starting price and reserve. Our team reviews and approves within 24 hours.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 12H28" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 12V26" stroke="currentColor" strokeWidth="2"/>
        <circle cx="20" cy="19" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 26L19 22L22 24L28 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Buyers Compete",
    description:
      "Verified buyers bid in real-time English auctions. Anti-sniping protection ensures fair price discovery.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L20 12L28 13L22 19L23.5 27L16 23L8.5 27L10 19L4 13L12 12L16 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Secure Settlement",
    description:
      "Winner pays through Razorpay. Funds held securely until delivery is confirmed. Seller gets paid out.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="8" width="26" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 14H29" stroke="currentColor" strokeWidth="2"/>
        <rect x="7" y="18" width="8" height="2" rx="1" fill="currentColor"/>
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works-section">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>How It Works</h2>
          <p className={styles.subtitle}>
            Three steps to liquidate dead stock at the best market price
          </p>
        </div>
        <div className={styles.steps}>
          {steps.map((step) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepIcon}>{step.icon}</div>
              <div className={styles.stepNumber}>{step.number}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
