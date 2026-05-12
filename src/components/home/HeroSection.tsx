import Link from "next/link";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <section className={styles.hero} id="hero-section">
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            India&apos;s Fashion Liquidation Marketplace
          </div>
          <h1 className={styles.headline}>
            Dead stock deserves
            <br />
            <span className={styles.accent}>price discovery.</span>
          </h1>
          <p className={styles.subheadline}>
            Competitive English auctions for unsold fashion inventory.
            Verified sellers, transparent bidding, secure payments.
            Turn excess stock into revenue.
          </p>
          <div className={styles.ctas}>
            <Link href="/auctions" className="btn btn-primary btn-lg" id="hero-browse-cta">
              Browse Auctions
            </Link>
            <Link href="/seller/register" className="btn btn-outline btn-lg" id="hero-sell-cta">
              List Your Stock
            </Link>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>₹35K Cr+</span>
              <span className={styles.statLabel}>Unsold inventory annually</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statValue}>8+</span>
              <span className={styles.statLabel}>Avg. bids per auction</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statValue}>60%+</span>
              <span className={styles.statLabel}>Auction conversion rate</span>
            </div>
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.auctionPreview}>
            <div className={styles.previewHeader}>
              <span className={styles.previewLive}>
                <span className="live-dot live-dot-red" />
                LIVE NOW
              </span>
              <span className={styles.previewTimer}>02:47:13</span>
            </div>
            <div className={styles.previewBody}>
              <div className={styles.previewImage}>👕</div>
              <div className={styles.previewInfo}>
                <span className={styles.previewBrand}>FABINDIA</span>
                <span className={styles.previewTitle}>Premium Cotton T-Shirts</span>
                <span className={styles.previewLot}>200 pcs · New with tags</span>
              </div>
            </div>
            <div className={styles.previewBid}>
              <div className={styles.previewBidLabel}>Current Bid</div>
              <div className={styles.previewBidAmount}>₹18,500</div>
              <div className={styles.previewBidCount}>14 bids</div>
            </div>
            <div className={styles.previewActivity}>
              <div className={styles.activityItem}>
                <span className={styles.activityUser}>user_7f3a</span>
                <span className={styles.activityAmount}>₹18,500</span>
                <span className={styles.activityTime}>2m ago</span>
              </div>
              <div className={styles.activityItem}>
                <span className={styles.activityUser}>user_2b9c</span>
                <span className={styles.activityAmount}>₹18,000</span>
                <span className={styles.activityTime}>8m ago</span>
              </div>
              <div className={styles.activityItem}>
                <span className={styles.activityUser}>user_4d1e</span>
                <span className={styles.activityAmount}>₹17,500</span>
                <span className={styles.activityTime}>15m ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
