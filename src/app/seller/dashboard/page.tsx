"use client";

import { useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/mock-data";
import styles from "./page.module.css";

const TABS = ["Active Auctions", "Drafts", "Past Auctions", "Payouts"] as const;

const mockActiveAuctions = [
  { id: "a1", title: "Premium Cotton T-Shirts — 200 pcs", currentBid: 18500, totalBids: 14, endTime: "2h 47m", status: "live" as const },
  { id: "b2", title: "Designer Kurta Set — 50 pcs", currentBid: 31000, totalBids: 8, endTime: "2m", status: "live" as const },
];

const mockDrafts = [
  { id: "d1", title: "Casual Polo Shirts — 150 pcs", category: "Shirts", updatedAt: "2 hours ago" },
  { id: "d2", title: "Winter Sweaters — 80 pcs", category: "Sweaters", updatedAt: "1 day ago" },
];

const mockPastAuctions = [
  { id: "p1", title: "Silk Sarees — 25 pcs", finalBid: 92000, totalBids: 6, outcome: "Sold" as const },
  { id: "p2", title: "Denim Jeans — 100 pcs", finalBid: 0, totalBids: 0, outcome: "No Bids" as const },
];

const mockPayouts = [
  { id: "pay1", auction: "Silk Sarees — 25 pcs", amount: 84640, commission: 7360, status: "Processed" as const, date: "May 8, 2026" },
  { id: "pay2", auction: "Linen Shirts — 80 pcs", amount: 36800, commission: 3200, status: "Pending" as const, date: "May 12, 2026" },
];

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Active Auctions");

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Seller Dashboard</h1>
            <p className={styles.subtitle}>Manage your listings, auctions, and payouts</p>
          </div>
          <Link href="/seller/listings/new" className="btn btn-accent" id="create-listing-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            New Listing
          </Link>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>2</span>
            <span className={styles.statLabel}>Active Auctions</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{formatCurrency(49500)}</span>
            <span className={styles.statLabel}>Total Active Bids</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{formatCurrency(121440)}</span>
            <span className={styles.statLabel}>Total Earnings</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>
              <span className="badge badge-verified">Verified</span>
            </span>
            <span className={styles.statLabel}>KYC Status</span>
          </div>
        </div>

        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(tab)}
              id={`seller-tab-${tab.toLowerCase().replace(/\s/g, "-")}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.content}>
          {activeTab === "Active Auctions" && (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr><th>Auction</th><th>Current Bid</th><th>Bids</th><th>Time Left</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {mockActiveAuctions.map((a) => (
                    <tr key={a.id}>
                      <td><Link href={`/auctions/${a.id}`} className={styles.tableLink}>{a.title}</Link></td>
                      <td className={styles.mono}>{formatCurrency(a.currentBid)}</td>
                      <td>{a.totalBids}</td>
                      <td className={a.endTime.includes("m") && !a.endTime.includes("h") ? styles.urgent : ""}>{a.endTime}</td>
                      <td><span className={`badge badge-live`}><span className="live-dot live-dot-red" />LIVE</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "Drafts" && (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr><th>Listing</th><th>Category</th><th>Last Updated</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {mockDrafts.map((d) => (
                    <tr key={d.id}>
                      <td className={styles.tableLink}>{d.title}</td>
                      <td>{d.category}</td>
                      <td>{d.updatedAt}</td>
                      <td><button className="btn btn-ghost btn-sm">Edit</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "Past Auctions" && (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr><th>Auction</th><th>Final Bid</th><th>Bids</th><th>Outcome</th></tr>
                </thead>
                <tbody>
                  {mockPastAuctions.map((p) => (
                    <tr key={p.id}>
                      <td>{p.title}</td>
                      <td className={styles.mono}>{p.finalBid > 0 ? formatCurrency(p.finalBid) : "—"}</td>
                      <td>{p.totalBids}</td>
                      <td><span className={p.outcome === "Sold" ? styles.outcomeSuccess : styles.outcomeNeutral}>{p.outcome}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "Payouts" && (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr><th>Auction</th><th>Payout</th><th>Commission</th><th>Status</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {mockPayouts.map((p) => (
                    <tr key={p.id}>
                      <td>{p.auction}</td>
                      <td className={styles.mono}>{formatCurrency(p.amount)}</td>
                      <td className={styles.mono}>{formatCurrency(p.commission)}</td>
                      <td><span className={p.status === "Processed" ? styles.outcomeSuccess : styles.outcomePending}>{p.status}</span></td>
                      <td>{p.date}</td>
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
