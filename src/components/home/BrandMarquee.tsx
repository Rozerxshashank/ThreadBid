import styles from "./BrandMarquee.module.css";

const BRANDS = [
  { name: "H&M", style: styles.brandSans, extra: "" },
  { name: "ZARA", style: styles.brandSerif, extra: "" },
  { name: "LEVI'S", style: styles.brandSans, extra: "®" },
  { name: "FABINDIA", style: styles.brandSans, extra: "" },
  { name: "RAYMOND", style: styles.brandSerif, extra: "" },
  { name: "ALLEN SOLLY", style: styles.brandSans, extra: "" },
  { name: "BIBA", style: styles.brandSans, extra: "" },
  { name: "PUMA", style: styles.brandSans, extra: "" },
  { name: "MANYAVAR", style: styles.brandSerif, extra: "" },
];

export function BrandMarquee() {
  return (
    <section className={styles.wrapper} aria-label="Trusted Surplus Inventory Partners">
      <div className={styles.label}>Surplus Inventory Trusted By Global & Domestic Chains</div>
      
      <div className={styles.track}>
        {/* First set of brands */}
        <div className={styles.brandGroup} aria-hidden="true">
          {BRANDS.map((brand, idx) => (
            <span key={`brand-1-${idx}`} className={`${styles.brandItem} ${brand.style}`}>
              {brand.name}
              {brand.extra && <span style={{ fontSize: '0.6em', verticalAlign: 'super' }}>{brand.extra}</span>}
            </span>
          ))}
        </div>
        
        {/* Second identical set for seamless infinite loop moving Left to Right */}
        <div className={styles.brandGroup}>
          {BRANDS.map((brand, idx) => (
            <span key={`brand-2-${idx}`} className={`${styles.brandItem} ${brand.style}`}>
              {brand.name}
              {brand.extra && <span style={{ fontSize: '0.6em', verticalAlign: 'super' }}>{brand.extra}</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
