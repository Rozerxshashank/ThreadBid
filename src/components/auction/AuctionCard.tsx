"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { Auction } from "@/lib/mock-data";
import { formatCurrency, getTimeRemaining } from "@/lib/mock-data";
import styles from "./AuctionCard.module.css";

interface AuctionCardProps {
  auction: Auction;
}

export function AuctionCard({ auction }: AuctionCardProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(auction.endTime));

  useEffect(() => {
    setIsMounted(true);
    if (auction.status !== "live") return;
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(auction.endTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [auction.endTime, auction.status]);

  const isUrgent = timeLeft.total > 0 && timeLeft.total < 600000; // < 10 min
  const displayPrice = auction.currentBid ?? auction.startPrice;
  const effectiveStatus = isMounted
    ? (auction.status === "live" && timeLeft.total <= 0 ? "ended" : auction.status)
    : auction.status;

  const formatTime = () => {
    if (timeLeft.total <= 0) return "Ended";
    if (timeLeft.days > 0) return `${timeLeft.days}d ${timeLeft.hours}h`;
    if (timeLeft.hours > 0) return `${timeLeft.hours}h ${timeLeft.minutes}m`;
    return `${timeLeft.minutes}m ${timeLeft.seconds}s`;
  };

  return (
    <Link
      href={`/auctions/${auction.id}`}
      className={`card ${styles.card}`}
      id={`auction-card-${auction.id}`}
    >
      <div className={styles.imageWrap}>
        <div
          className={styles.imagePlaceholder}
          style={{ backgroundColor: getPlaceholderColor(auction.category) }}
        >
          <span className={styles.categoryIcon}>
            {getCategoryIcon(auction.category)}
          </span>
        </div>
        {isMounted ? (
          <>
            {effectiveStatus === "live" && (
              <span className={`badge badge-live ${styles.statusBadge}`}>
                <span className="live-dot live-dot-red" />
                LIVE
              </span>
            )}
            {effectiveStatus === "scheduled" && (
              <span className={`badge badge-upcoming ${styles.statusBadge}`}>
                UPCOMING
              </span>
            )}
            {effectiveStatus === "ended" && (
              <span className={`badge badge-ended ${styles.statusBadge}`}>
                ENDED
              </span>
            )}
          </>
        ) : (
          <span className={`badge badge-live ${styles.statusBadge}`}>
            <span className="live-dot live-dot-red" />
            LIVE
          </span>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.brand}>{auction.brand}</span>
          {auction.seller.isVerified && (
            <span className={styles.verified} title="Verified Seller">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 0L8.5 2.5L11.5 1.5L11 4.5L14 5.5L12 8L14 10.5L11 10L11.5 13L8.5 11.5L7 14L5.5 11.5L2.5 13L3 10L0 10.5L2 8L0 5.5L3 4.5L2.5 1.5L5.5 2.5L7 0Z" fill="#2D5016"/>
                <path d="M5 7L6.5 8.5L9.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          )}
        </div>

        <h3 className={styles.title}>{auction.title}</h3>

        <div className={styles.details}>
          <span className={styles.lot}>{auction.lotSize} pcs</span>
          <span className={styles.dot}>·</span>
          <span className={styles.condition}>
            {auction.condition.replace(/_/g, " ")}
          </span>
        </div>

        <div className={styles.bidRow}>
          <div className={styles.priceBlock}>
            <span className={styles.priceLabel}>
              {auction.currentBid ? "Current Bid" : "Starting at"}
            </span>
            <span className={styles.price}>{formatCurrency(displayPrice)}</span>
          </div>

          <div className={styles.timerBlock} suppressHydrationWarning>
            {effectiveStatus === "live" && (
              <>
                <span className={styles.timerLabel}>Ends in</span>
                <span
                  className={`${styles.timer} countdown ${
                    isUrgent ? "countdown-urgent" : ""
                  }`}
                >
                  {isMounted ? formatTime() : "--:--"}
                </span>
              </>
            )}
            {effectiveStatus === "scheduled" && (
              <>
                <span className={styles.timerLabel}>Starts in</span>
                <span className={styles.timer}>{isMounted ? formatTime() : "--:--"}</span>
              </>
            )}
            {effectiveStatus === "ended" && (
              <>
                <span className={styles.timerLabel}>Status</span>
                <span className={styles.timer} style={{ color: "var(--color-warm-grey)", fontWeight: 600 }}>Ended</span>
              </>
            )}
          </div>
        </div>

        {auction.totalBids > 0 && (
          <div className={styles.bidCount}>
            {auction.totalBids} bid{auction.totalBids !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </Link>
  );
}

function getPlaceholderColor(category: string): string {
  const colors: Record<string, string> = {
    "T-Shirts": "#E8E0D8",
    "Ethnic Wear": "#D8E0E8",
    Jackets: "#DDE4D8",
    Activewear: "#E4D8E0",
    Shirts: "#D8E4E0",
    Sarees: "#E0D8E4",
  };
  return colors[category] || "#E8E4E0";
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    "T-Shirts": "👕",
    "Ethnic Wear": "🪷",
    Jackets: "🧥",
    Activewear: "🩳",
    Shirts: "👔",
    Sarees: "🧶",
  };
  return icons[category] || "📦";
}
