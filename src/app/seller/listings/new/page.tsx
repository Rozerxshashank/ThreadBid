"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const CATEGORIES = ["T-Shirts", "Ethnic Wear", "Jackets", "Activewear", "Shirts", "Sarees"];
const CONDITIONS = [
  { value: "new_with_tags", label: "New with Tags" },
  { value: "new_without_tags", label: "New without Tags" },
  { value: "like_new", label: "Like New" },
  { value: "used", label: "Used" },
];

export default function NewListingPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [reservePrice, setReservePrice] = useState("");
  const [lotSize, setLotSize] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Synchronise freshly entered parameters directly into persistent Admin Review buffers
    try {
      const cachedStr = localStorage.getItem("threadbid_pending_listings");
      let activeListings = [];
      if (cachedStr) {
        try { activeListings = JSON.parse(cachedStr); } catch (e) {}
      }
      if (!Array.isArray(activeListings)) activeListings = [];

      const startAmtNum = parseFloat(startPrice) || 120000;
      const reserveAmtNum = parseFloat(reservePrice) || (startAmtNum * 1.5);
      const pieceCount = parseInt(lotSize) || 200;

      const newListingObj = {
        id: `pl-${Date.now()}`,
        title: title || `Premium Stock Assortment — ${pieceCount} pcs`,
        seller: brand ? `${brand} Liquidators` : "Verified Institutional Partner",
        category: category || "Shirts",
        submitted: "Just now",
        images: 5,
        fabricContent: "Premium Surplus Certified Fabrics",
        warehouseOrigin: "Verified Tier-1 Clearing Hub",
        kycStatus: "Verified Corporate Identity",
        mrpValuation: startAmtNum * 3.5,
        requestedStartPrice: startAmtNum,
        requestedReservePrice: reserveAmtNum,
      };

      activeListings.unshift(newListingObj);
      localStorage.setItem("threadbid_pending_listings", JSON.stringify(activeListings));
    } catch (e) {}

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className={styles.page}>
        <div className={styles.innerSmall}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✓</div>
            <h1 className={styles.title}>Listing Submitted</h1>
            <p className={styles.subtitle}>
              Your listing has been sent for review. Our team will approve it within 24 hours.
            </p>
            <div className={styles.successActions}>
              <Link href="/seller/dashboard" className="btn btn-primary">Go to Dashboard</Link>
              <button className="btn btn-ghost" onClick={() => {
                setSuccess(false);
                setTitle("");
                setStartPrice("");
                setReservePrice("");
                setLotSize("");
              }}>Create Another</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <Link href="/seller/dashboard" className={styles.backLink}>← Back to Dashboard</Link>
          <h1 className={styles.title}>Create New Listing</h1>
          <p className={styles.subtitle}>List your fashion dead stock for auction</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Product Information</h2>
            <div className={styles.field}>
              <label className="input-label">Listing Title</label>
              <input type="text" className="input-field" placeholder="e.g. Premium Cotton Polo Shirts - 200 pcs" required value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className={styles.field}>
              <label className="input-label">Description</label>
              <textarea className={`${styles.textarea} input-field`} placeholder="Describe the quality, sizes, and colors in the lot..." required rows={4} />
            </div>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label className="input-label">Category</label>
                <select className="input-field" required value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="">Select a category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className={styles.field}>
                <label className="input-label">Brand</label>
                <input type="text" className="input-field" placeholder="e.g. FabIndia" required value={brand} onChange={e => setBrand(e.target.value)} />
              </div>
            </div>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label className="input-label">Lot Size (Pieces)</label>
                <input type="number" className="input-field" placeholder="0" required value={lotSize} onChange={e => setLotSize(e.target.value)} />
              </div>
              <div className={styles.field}>
                <label className="input-label">Condition</label>
                <select className="input-field" required>
                  <option value="">Select condition</option>
                  {CONDITIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Pricing & Auction</h2>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label className="input-label">Starting Price (₹)</label>
                <input type="number" className="input-field" placeholder="0" required value={startPrice} onChange={e => setStartPrice(e.target.value)} />
                <span className={styles.hint}>The minimum price for the first bid</span>
              </div>
              <div className={styles.field}>
                <label className="input-label">Reserve Price (₹) - Optional</label>
                <input type="number" className="input-field" placeholder="0" value={reservePrice} onChange={e => setReservePrice(e.target.value)} />
                <span className={styles.hint}>Hidden floor price; auction won't sell below this</span>
              </div>
            </div>
            <div className={styles.field}>
              <label className="input-label">Buy Now Price (₹) - Optional</label>
              <input type="number" className="input-field" placeholder="0" style={{width: '50%'}} />
              <span className={styles.hint}>Optional instant-purchase price</span>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Product Images</h2>
            <div className={styles.uploadArea}>
              <div className={styles.uploadIcon}>📷</div>
              <p>Click to upload or drag and drop</p>
              <span className={styles.uploadHint}>JPG, PNG or WEBP (Max. 10MB each)</span>
              <input type="file" className={styles.fileInput} multiple accept="image/*" />
            </div>
            <p className={styles.imageRequirement}>
              PRD Requirement: At least 4 photos (Front, Back, Tag, Lot Overview)
            </p>
          </div>

          <div className={styles.submitArea}>
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? "Submitting..." : "Submit for Review"}
            </button>
            <p className={styles.commissionNote}>
              Platform commission: 8% of final sale price. Inclusive of payment gateway fees.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
