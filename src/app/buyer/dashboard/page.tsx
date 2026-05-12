"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/mock-data";
import styles from "./page.module.css";

const TABS = ["Active Bids", "Won Auctions", "Bid History"] as const;

const mockActiveBids = [
  { id: "ab1", title: "Premium Cotton T-Shirts — 200 pcs", brand: "FabIndia", myBid: 18500, currentBid: 18500, status: "winning" as const, endTime: "2h 47m" },
  { id: "ab2", title: "Denim Jackets — 120 pcs", brand: "Levi's", myBid: 48000, currentBid: 52000, status: "outbid" as const, endTime: "1h 30m" },
  // Map baseline placeholder for dynamic live preview synchronization
  { id: "d4e5f6a7-b8c9-0123-defa-234567890123", title: "Sports Shorts — Quick Dry (300 pcs)", brand: "HRX", myBid: 11750, currentBid: 11750, status: "winning" as const, endTime: "22m" },
];

const mockWonAuctions = [
  { id: "w1", title: "Silk Sarees — 25 pcs", brand: "Nalli", amount: 92000, paymentStatus: "paid" as const, fulfillment: "dispatched" as const, orderId: "ord-123" },
  { id: "w2", title: "Casual Polo Shirts — 100 pcs", brand: "Allen Solly", amount: 28000, paymentStatus: "pending" as const, fulfillment: null, orderId: "ord-456" },
];

const mockBidHistory = [
  { id: "bh1", auction: "Premium Cotton T-Shirts", amount: 18500, result: "winning" as const, time: "5 min ago" },
  { id: "bh2", auction: "Premium Cotton T-Shirts", amount: 15000, result: "outbid" as const, time: "40 min ago" },
  { id: "bh3", auction: "Denim Jackets — 120 pcs", amount: 48000, result: "outbid" as const, time: "1 hour ago" },
  { id: "bh4", auction: "Silk Sarees — 25 pcs", amount: 92000, result: "won" as const, time: "2 days ago" },
  { id: "bh5", auction: "Casual Polo Shirts — 100 pcs", amount: 28000, result: "won" as const, time: "3 days ago" },
];

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Active Bids");
  const [activeBids, setActiveBids] = useState(mockActiveBids);
  const [wonAuctions, setWonAuctions] = useState(mockWonAuctions);
  const [totalSpent, setTotalSpent] = useState(120000);

  // Synchronise state dynamically with live persistence caches
  useEffect(() => {
    try {
      const cachedStr = localStorage.getItem("threadbid_active_bids");
      if (cachedStr) {
        const parsed = JSON.parse(cachedStr);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setActiveBids(parsed);
        }
      } else {
        // Automatically save initial hybrid view arrays into caches directly
        localStorage.setItem("threadbid_active_bids", JSON.stringify(mockActiveBids));
      }
    } catch (e) {}
  }, []);

  const saveToStorage = (updater: typeof mockActiveBids | ((prev: typeof mockActiveBids) => typeof mockActiveBids)) => {
    setActiveBids((prev) => {
      const nextState = typeof updater === "function" ? updater(prev) : updater;
      try {
        localStorage.setItem("threadbid_active_bids", JSON.stringify(nextState));
      } catch (e) {}
      return nextState;
    });
  };

  const winningCount = activeBids.filter(b => b.status === "winning").length;
  const outbidCount = activeBids.filter(b => b.status === "outbid").length;

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Bids</h1>
          <p className={styles.subtitle}>Track your active bids, won auctions, and bid history</p>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{activeBids.length}</span>
            <span className={styles.statLabel}>Active Bids</span>
          </div>
          <div className={`${styles.statCard} ${styles.statWinning}`}>
            <span className={styles.statValue}>{winningCount}</span>
            <span className={styles.statLabel}>Currently Winning</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{wonAuctions.length}</span>
            <span className={styles.statLabel}>Auctions Won</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{formatCurrency(totalSpent)}</span>
            <span className={styles.statLabel}>Total Spent</span>
          </div>
        </div>

        {/* Outbid notification banner */}
        {outbidCount > 0 && (
          <div className={styles.notification} id="outbid-notification">
            <div className={styles.notifIcon}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10 6V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="10" cy="13" r="1" fill="currentColor"/>
              </svg>
            </div>
            <div className={styles.notifContent}>
              <span className={styles.notifText}>
                Action Required: You have been outbid on active container targets.
              </span>
              <button 
                className={styles.notifAction} 
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit' }}
                onClick={() => {
                  saveToStorage(prev => prev.map(b => ({ ...b, myBid: b.currentBid + 2500, currentBid: b.currentBid + 2500, status: "winning" })));
                  alert("CONFIRMED: Bulk top-tier incremental packages broadcast instantly across all flagged container queues!");
                }}
              >
                Rebid All Downstream Queues →
              </button>
            </div>
          </div>
        )}

        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(tab)}
              id={`buyer-tab-${tab.toLowerCase().replace(/\s/g, "-")}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.content}>
          {activeTab === "Active Bids" && (
            <div className={styles.cardGrid}>
              {activeBids.map((bid) => (
                <div key={bid.id} className={`${styles.bidCard} ${bid.status === "outbid" ? styles.bidCardOutbid : styles.bidCardWinning}`}>
                  <div className={styles.bidCardHeader}>
                    <span className={styles.bidBrand}>{bid.brand}</span>
                    <span className={bid.status === "winning" ? styles.statusWinning : styles.statusOutbid}>
                      {bid.status === "winning" ? "✓ Winning" : "✗ Outbid"}
                    </span>
                  </div>
                  <h3 className={styles.bidCardTitle}>{bid.title}</h3>
                  <div className={styles.bidCardRow}>
                    <div>
                      <span className={styles.bidCardLabel}>Your Bid</span>
                      <span className={styles.bidCardValue}>{formatCurrency(bid.myBid)}</span>
                    </div>
                    <div>
                      <span className={styles.bidCardLabel}>Current Bid</span>
                      <span className={styles.bidCardValue}>{formatCurrency(bid.currentBid)}</span>
                    </div>
                    <div>
                      <span className={styles.bidCardLabel}>Ends In</span>
                      <span className={styles.bidCardValue}>{bid.endTime}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: "12px" }}>
                    <Link href={`/auctions/${bid.id}`} className="btn btn-outline btn-sm" style={{ flex: 1, textAlign: 'center' }}>
                      Inspect Auction Pane
                    </Link>
                    {bid.status === "outbid" && (
                      <button 
                        className="btn btn-primary btn-sm" 
                        onClick={() => {
                          saveToStorage(prev => prev.map(b => b.id === bid.id ? { ...b, myBid: b.currentBid + 3500, currentBid: b.currentBid + 3500, status: "winning" } : b));
                          alert("CONFIRMED: Incremental package reserve deployed instantly. Escrow clearance parameters realigned successfully.");
                        }}
                      >
                        Instant Rebid
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Won Auctions" && (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr><th>Auction</th><th>Amount</th><th>Payment</th><th>Fulfillment</th><th></th></tr>
                </thead>
                <tbody>
                  {wonAuctions.map((w) => (
                    <tr key={w.id}>
                      <td><span className={styles.tableTitle}>{w.title}</span><br/><span className={styles.tableSub}>{w.brand}</span></td>
                      <td className={styles.mono}>{formatCurrency(w.amount)}</td>
                      <td><span className={w.paymentStatus === "paid" ? styles.statusPaid : styles.statusPending}>{w.paymentStatus}</span></td>
                      <td>{w.fulfillment ? <span className={styles.statusDispatched}>{w.fulfillment}</span> : "—"}</td>
                      <td>{w.paymentStatus === "pending" ? <Link href={`/checkout/${w.orderId}`} className="btn btn-accent btn-sm">Pay Now</Link> : <Link href={`/orders/${w.orderId}`} className="btn btn-ghost btn-sm">View Order</Link>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "Bid History" && (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr><th>Auction</th><th>Bid Amount</th><th>Result</th><th>Time</th></tr>
                </thead>
                <tbody>
                  {mockBidHistory.map((b) => (
                    <tr key={b.id}>
                      <td>{b.auction}</td>
                      <td className={styles.mono}>{formatCurrency(b.amount)}</td>
                      <td><span className={b.result === "won" ? styles.statusPaid : b.result === "winning" ? styles.statusWinning : styles.statusOutbid}>{b.result}</span></td>
                      <td className={styles.tableSub}>{b.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
