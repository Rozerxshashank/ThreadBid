"use client";

import { useState, useMemo, useEffect } from "react";
import type { Auction } from "@/lib/mock-data";
import { MOCK_AUCTIONS } from "@/lib/mock-data";
import { AuctionCard } from "@/components/auction/AuctionCard";
import styles from "./page.module.css";

const CATEGORIES = ["All", "T-Shirts", "Ethnic Wear", "Jackets", "Activewear", "Shirts", "Sarees"];
const STATUSES = ["All", "Live", "Upcoming", "Ended"];
const SORT_OPTIONS = [
  { value: "ending_soonest", label: "Ending Soonest" },
  { value: "most_bids", label: "Most Bids" },
  { value: "lowest_price", label: "Lowest Price" },
];

export default function AuctionsPage() {
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("ending_soonest");
  const [cachedAuctions, setCachedAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    try {
      const cachedStr = localStorage.getItem("threadbid_live_auctions");
      if (cachedStr) {
        const parsed = JSON.parse(cachedStr);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCachedAuctions(parsed);
        }
      }
    } catch (e) {}
  }, []);

  const statusMap: Record<string, string> = {
    Live: "live",
    Upcoming: "scheduled",
    Ended: "ended",
  };

  const filtered = useMemo(() => {
    const baseIds = new Set(MOCK_AUCTIONS.map(a => a.id));
    const distinctCached = cachedAuctions.filter(a => !baseIds.has(a.id));
    let auctions = [...distinctCached, ...MOCK_AUCTIONS];

    if (category !== "All") {
      auctions = auctions.filter((a) => a.category === category);
    }
    if (status !== "All") {
      auctions = auctions.filter((a) => a.status === statusMap[status]);
    }

    switch (sort) {
      case "ending_soonest":
        auctions.sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime());
        break;
      case "most_bids":
        auctions.sort((a, b) => b.totalBids - a.totalBids);
        break;
      case "lowest_price":
        auctions.sort((a, b) => (a.currentBid ?? a.startPrice) - (b.currentBid ?? b.startPrice));
        break;
    }

    return auctions;
  }, [category, status, sort]);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h1 className={styles.title}>Auctions</h1>
          <p className={styles.subtitle}>
            Browse live and upcoming auctions for fashion dead stock
          </p>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Category</label>
              <div className={styles.chips}>
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    className={`${styles.chip} ${category === c ? styles.chipActive : ""}`}
                    onClick={() => setCategory(c)}
                    id={`filter-category-${c.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Status</label>
              <div className={styles.chips}>
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    className={`${styles.chip} ${status === s ? styles.chipActive : ""}`}
                    onClick={() => setStatus(s)}
                    id={`filter-status-${s.toLowerCase()}`}
                  >
                    {s === "Live" && <span className="live-dot live-dot-red" />}
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.sortWrap}>
            <label className={styles.filterLabel} htmlFor="sort-select">Sort by</label>
            <select
              id="sort-select"
              className={styles.sortSelect}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.results}>
          <span className={styles.resultCount}>
            {filtered.length} auction{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 28C16 28 19 32 24 32C29 32 32 28 32 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="18" cy="20" r="2" fill="currentColor"/>
                <circle cx="30" cy="20" r="2" fill="currentColor"/>
              </svg>
            </div>
            <h3 className={styles.emptyTitle}>No auctions found</h3>
            <p className={styles.emptyDesc}>
              Try adjusting your filters or check back later for new listings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
