import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>ThreadBid</span>
          <p className={styles.tagline}>
            India&apos;s auction marketplace for fashion dead stock.
            Competitive bidding, verified sellers, secure payments.
          </p>
        </div>

        <div className={styles.links}>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Platform</h4>
            <Link href="/auctions">Browse Auctions</Link>
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/seller/register">Sell on Threadbid</Link>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/careers">Careers</Link>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Legal</h4>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/refund-policy">Refund Policy</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Threadbid. All rights reserved.</span>
          <span className={styles.madeIn}>Made in India</span>
        </div>
      </div>
    </footer>
  );
}
