"use client";

import { useState, useEffect } from "react";
import type { Auction } from "@/lib/mock-data";
import { MOCK_AUCTIONS } from "@/lib/mock-data";
import { AuctionCard } from "@/components/auction/AuctionCard";
import styles from "./LiveAuctionsStrip.module.css";
import Link from "next/link";

export function LiveAuctionsStrip() {
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

  const baseLive = MOCK_AUCTIONS.filter((a) => a.status === "live");
  const baseIds = new Set(baseLive.map(a => a.id));
  const distinctCached = cachedAuctions.filter(a => !baseIds.has(a.id));
  const liveAuctions = [...distinctCached, ...baseLive].slice(0, 4);

  return (
    <section className={styles.section} id="live-auctions-section">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Live Auctions</h2>
            <p className={styles.subtitle}>Bid now — these auctions are ending soon</p>
          </div>
          <Link href="/auctions" className="btn btn-outline btn-sm" id="view-all-auctions-link">
            View All
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        <div className={styles.grid}>
          {liveAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      </div>
    </section>
  );
}
