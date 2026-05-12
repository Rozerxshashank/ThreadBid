"use client";

import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/mock-data";
import styles from "./page.module.css";

const TABS = ["Pending Listings", "Users", "Auctions", "Disputes", "Platform Ledger"] as const;

const mockLedgerEntries = [
  { id: "rev1", orderId: "ord-883", lotTitle: "Premium Cotton T-Shirts — 200 pcs", clearedAmt: 18500, rate: "6.5%", commissionRetained: 1202.5, date: "May 12, 2026" },
  { id: "rev2", orderId: "ord-742", lotTitle: "Silk Sarees — 25 pcs", clearedAmt: 92000, rate: "6.5%", commissionRetained: 5980, date: "May 10, 2026" },
  { id: "rev3", orderId: "ord-619", lotTitle: "Surplus Denim Stock Container", clearedAmt: 2450000, rate: "5.0%", commissionRetained: 122500, date: "May 02, 2026" },
  { id: "rev4", orderId: "sub-102", lotTitle: "Verified Corporate Seller Subscription (Zara)", clearedAmt: 25000, rate: "100%", commissionRetained: 25000, date: "Apr 28, 2026" },
];

const INITIAL_PENDING_LISTINGS = [
  { 
    id: "pl1", 
    title: "Men's Formal Shirts — 200 pcs", 
    seller: "Raymond Exports", 
    category: "Shirts", 
    submitted: "2 hours ago", 
    images: 6,
    fabricContent: "100% Premium Egyptian Giza Cotton",
    warehouseOrigin: "Plot 88B, Surat Textile SEZ, Gujarat",
    kycStatus: "Verified Nodal Float Partner",
    mrpValuation: 499000,
    requestedStartPrice: 125000,
    requestedReservePrice: 180000,
  },
  { 
    id: "pl2", 
    title: "Women's Kurtis — 300 pcs", 
    seller: "W Fashion Co.", 
    category: "Ethnic Wear", 
    submitted: "5 hours ago", 
    images: 4,
    fabricContent: "Viscose Rayon Blend & Embroidered Silk",
    warehouseOrigin: "Sector 4, Noida Apparels Cluster",
    kycStatus: "Verified Corporate Identity",
    mrpValuation: 360000,
    requestedStartPrice: 95000,
    requestedReservePrice: 140000,
  },
  { 
    id: "pl3", 
    title: "Kids T-Shirts — 500 pcs", 
    seller: "Kidswear Hub", 
    category: "T-Shirts", 
    submitted: "1 day ago", 
    images: 8,
    fabricContent: "180 GSM Combed Bio-Washed Hosiery",
    warehouseOrigin: "Tirupur Knitwear Processing Hub",
    kycStatus: "Verified Export Member",
    mrpValuation: 250000,
    requestedStartPrice: 65000,
    requestedReservePrice: 90000,
  },
];

const INITIAL_USERS = [
  { id: "u1", email: "seller@fabindia.com", role: "seller" as const, name: "FabIndia Outlet", kyc: "verified" as const, status: "active" as const, joined: "Jan 2026" },
  { id: "u2", email: "buyer@gmail.com", role: "buyer" as const, name: "Rahul M.", kyc: "pending" as const, status: "active" as const, joined: "Mar 2026" },
  { id: "u3", email: "seller@biba.com", role: "seller" as const, name: "Biba Clearance", kyc: "verified" as const, status: "active" as const, joined: "Feb 2026" },
  { id: "u4", email: "flagged@test.com", role: "buyer" as const, name: "Suspicious User", kyc: "rejected" as const, status: "suspended" as const, joined: "Apr 2026" },
];

const INITIAL_AUCTIONS = [
  { id: "aa1", title: "Premium Cotton T-Shirts — 200 pcs", seller: "FabIndia", status: "live" as const, currentBid: 18500, bids: 14 },
  { id: "aa2", title: "Designer Kurta Set — 50 pcs", seller: "Biba", status: "live" as const, currentBid: 31000, bids: 8 },
  { id: "aa3", title: "Silk Sarees — 25 pcs", seller: "Nalli", status: "settled" as const, currentBid: 92000, bids: 6 },
];

const INITIAL_DISPUTES = [
  { id: "dp1", auction: "Linen Shirts — 80 pcs", raisedBy: "buyer@example.com", reason: "Items not as described", status: "open" as const, date: "May 10, 2026" },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Pending Listings");
  const [pendingListings, setPendingListings] = useState(INITIAL_PENDING_LISTINGS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [auctions, setAuctions] = useState(INITIAL_AUCTIONS);
  const [disputes, setDisputes] = useState(INITIAL_DISPUTES);
  const [totalProfit, setTotalProfit] = useState(154682.5);
  const [nodalPool, setNodalPool] = useState(5200000);
  const [ledgerEntries, setLedgerEntries] = useState(mockLedgerEntries);
  const [reviewModalId, setReviewModalId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const cachedStr = localStorage.getItem("threadbid_pending_listings");
      if (cachedStr) {
        const parsed = JSON.parse(cachedStr);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPendingListings((prev) => {
            const existingIds = new Set(prev.map(l => l.id));
            const distinctNew = parsed.filter(l => !existingIds.has(l.id));
            return [...distinctNew, ...prev];
          });
        }
      }
    } catch (e) {}
  }, []);

  const updateStorageListingRemoval = (targetId: string) => {
    try {
      const cachedStr = localStorage.getItem("threadbid_pending_listings");
      if (cachedStr) {
        let parsed = JSON.parse(cachedStr);
        if (Array.isArray(parsed)) {
          parsed = parsed.filter(l => l.id !== targetId);
          localStorage.setItem("threadbid_pending_listings", JSON.stringify(parsed));
        }
      }
    } catch (e) {}
  };

  const handleApproveListing = (id: string) => {
    const target = pendingListings.find((l) => l.id === id);
    if (!target) return;
    setPendingListings((prev) => prev.filter((l) => l.id !== id));

    const newAuctionId = `aa-${Date.now()}`;
    const startAmt = target.requestedStartPrice || 25000;
    
    // Systematic Timing Decisions: Default 24 Hour continuous clearing window from approval instantiation
    const startTimeStr = new Date().toISOString();
    const endTimeStr = new Date(Date.now() + 24 * 3600 * 1000).toISOString();

    setAuctions((prev) => [
      { id: newAuctionId, title: target.title, seller: target.seller, status: "live", currentBid: startAmt, bids: 0 },
      ...prev,
    ]);

    // Broadcast newly approved auction to global showcasing panels instantly
    try {
      const cachedStr = localStorage.getItem("threadbid_live_auctions");
      let liveList = [];
      if (cachedStr) {
        try { liveList = JSON.parse(cachedStr); } catch (e) {}
      }
      if (!Array.isArray(liveList)) liveList = [];

      const brandStr = target.seller.replace(/\s*(Exports|Liquidators|Co\.|Clearance|Hub)\s*/gi, "").trim();

      liveList.unshift({
        id: newAuctionId,
        title: target.title,
        brand: brandStr || "ThreadBid Partner",
        category: target.category || "Apparel",
        lotSize: parseInt(target.title.match(/\d+/) as any) || 200,
        condition: "new_with_tags",
        images: ["/placeholder-tshirt.jpg"],
        startPrice: startAmt,
        currentBid: startAmt,
        reservePrice: target.requestedReservePrice || (startAmt * 1.3),
        buyNowPrice: startAmt * 2.5,
        bidIncrement: startAmt < 20000 ? 250 : 500,
        totalBids: 0,
        startTime: startTimeStr,
        endTime: endTimeStr,
        status: "live",
        seller: { name: target.seller, isVerified: true, rating: 4.9 }
      });
      localStorage.setItem("threadbid_live_auctions", JSON.stringify(liveList));
    } catch (e) {}

    updateStorageListingRemoval(id);
  };

  const handleRejectListing = (id: string) => {
    setPendingListings((prev) => prev.filter((l) => l.id !== id));
    updateStorageListingRemoval(id);
  };

  const handleToggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          return { ...u, status: u.status === "active" ? "suspended" : "active" };
        }
        return u;
      })
    );
  };

  const handleCancelAuction = (id: string) => {
    setAuctions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "settled" } : a))
    );
  };

  const handleResolveDispute = (id: string) => {
    setDisputes((prev) => prev.filter((d) => d.id !== id));
  };

  const handleSweepProfit = () => {
    if (totalProfit === 0) return;
    alert(`CONFIRMED: Rupee sum of ${formatCurrency(totalProfit)} swept physically from nodal escrow clearing buffers directly into your registered master corporate bank accounts.`);
    setNodalPool((prev) => prev - totalProfit);
    setTotalProfit(0);
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h1 className={styles.title}>Admin Panel</h1>
          <p className={styles.subtitle}>Moderate listings, manage users, and oversee auctions</p>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statCard}><span className={styles.statValue}>{pendingListings.length}</span><span className={styles.statLabel}>Pending Reviews</span></div>
          <div className={styles.statCard}><span className={styles.statValue}>{users.length}</span><span className={styles.statLabel}>Total Users</span></div>
          <div className={styles.statCard}><span className={styles.statValue}>{auctions.filter(a => a.status === 'live').length}</span><span className={styles.statLabel}>Live Auctions</span></div>
          <div className={styles.statCard} style={{background: 'var(--color-cream)', borderColor: 'var(--color-accent)'}}>
            <span className={styles.statValue} style={{color: 'var(--color-accent)'}}>{formatCurrency(totalProfit)}</span>
            <span className={styles.statLabel} style={{fontWeight: 700}}>Total Net Profit Captured</span>
          </div>
        </div>

        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button key={tab} className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`} onClick={() => setActiveTab(tab)} id={`admin-tab-${tab.toLowerCase().replace(/\s/g, "-")}`}>
              {tab}
              {tab === "Pending Listings" && pendingListings.length > 0 && <span className={styles.tabBadge}>{pendingListings.length}</span>}
              {tab === "Disputes" && disputes.length > 0 && <span className={styles.tabBadge}>{disputes.length}</span>}
            </button>
          ))}
        </div>

        <div className={styles.content}>
          {activeTab === "Pending Listings" && (
            <div>
              <div className={styles.listingCards}>
                {pendingListings.map((listing) => (
                  <div key={listing.id} className={styles.reviewCard}>
                    <div className={styles.reviewInfo}>
                      <h3 className={styles.reviewTitle}>{listing.title}</h3>
                      <div className={styles.reviewMeta}>
                        <span>by {listing.seller}</span>
                        <span>·</span>
                        <span>{listing.category}</span>
                        <span>·</span>
                        <span>{listing.images} photos</span>
                        <span>·</span>
                        <span>{listing.submitted}</span>
                      </div>
                    </div>
                    <div className={styles.reviewActions}>
                      <button className="btn btn-primary btn-sm" onClick={() => setReviewModalId(listing.id)}>Review Manifest</button>
                      <button className="btn btn-outline btn-sm" onClick={() => handleRejectListing(listing.id)}>Quick Reject</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comprehensive Manifest Auditing Pane */}
              {reviewModalId && (() => {
                const target = pendingListings.find(l => l.id === reviewModalId);
                if (!target) return null;
                return (
                  <div style={{ marginTop: '24px', padding: '24px', background: 'var(--color-cream)', border: '2px solid var(--color-accent)', borderRadius: 'var(--radius-lg)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px', marginBottom: '16px' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', display: 'block' }}>Deep Cargo Auditing Interface</span>
                        <h4 style={{ fontSize: '1.25rem', color: 'var(--color-charcoal)', marginTop: '4px' }}>{target.title}</h4>
                      </div>
                      <button className="btn btn-ghost btn-sm" onClick={() => setReviewModalId(null)}>✕ Close</button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px', fontSize: '0.875rem' }}>
                      <div style={{ background: 'var(--color-card)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-warm-grey)', display: 'block' }}>Verified Composition</span>
                        <strong style={{ color: 'var(--color-charcoal)' }}>{target.fabricContent}</strong>
                      </div>
                      <div style={{ background: 'var(--color-card)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-warm-grey)', display: 'block' }}>Physical Origin</span>
                        <strong style={{ color: 'var(--color-charcoal)' }}>{target.warehouseOrigin}</strong>
                      </div>
                      <div style={{ background: 'var(--color-card)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-warm-grey)', display: 'block' }}>Compliance Seal</span>
                        <strong style={{ color: 'var(--color-accent)' }}>✓ {target.kycStatus}</strong>
                      </div>
                      <div style={{ background: 'var(--color-card)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-warm-grey)', display: 'block' }}>Retail Counter MRP</span>
                        <strong style={{ color: 'var(--color-charcoal)' }}>{formatCurrency(target.mrpValuation)}</strong>
                      </div>
                    </div>

                    {/* Calibration Settings */}
                    <div style={{ background: 'var(--color-card)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: '20px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-charcoal)', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>Auction Clearing Calibration</span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: 'var(--color-warm-grey)', display: 'block', marginBottom: '4px' }}>Requested Base Price</label>
                          <input type="text" readOnly value={formatCurrency(target.requestedStartPrice)} className="input" style={{ width: '100%', background: 'var(--color-background)', fontSize: '0.875rem', padding: '6px 12px' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: 'var(--color-warm-grey)', display: 'block', marginBottom: '4px' }}>Reserve Clearing Floor</label>
                          <input type="text" readOnly value={formatCurrency(target.requestedReservePrice)} className="input" style={{ width: '100%', background: 'var(--color-background)', fontSize: '0.875rem', padding: '6px 12px' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: 'var(--color-warm-grey)', display: 'block', marginBottom: '4px' }}>Platform Take Rate</label>
                          <input type="text" readOnly value="6.50% Margin Split" className="input" style={{ width: '100%', background: 'var(--color-background)', color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.875rem', padding: '6px 12px' }} />
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                      <button className="btn btn-outline" onClick={() => { handleRejectListing(target.id); setReviewModalId(null); }}>
                        Purge Listing
                      </button>
                      <button className="btn btn-primary" onClick={() => { 
                        alert(`LAUNCH SUCCESS: Cargo container verified. Encrypted transaction sequence locked. Auction broadcast live across ${users.length} verified institutional viewing buffers instantly.`);
                        handleApproveListing(target.id); 
                        setReviewModalId(null); 
                      }}>
                        Verify Manifest & Launch Live Feed
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {activeTab === "Users" && (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead><tr><th>User</th><th>Role</th><th>KYC</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td><span className={styles.userName}>{u.name}</span><br/><span className={styles.userEmail}>{u.email}</span></td>
                      <td><span className={styles.roleBadge}>{u.role}</span></td>
                      <td><span className={u.kyc === "verified" ? styles.kycVerified : u.kyc === "rejected" ? styles.kycRejected : styles.kycPending}>{u.kyc}</span></td>
                      <td><span className={u.status === "active" ? styles.statusActive : styles.statusSuspended}>{u.status}</span></td>
                      <td>{u.joined}</td>
                      <td>
                        <button className="btn btn-ghost btn-sm" onClick={() => handleToggleUserStatus(u.id)}>
                          {u.status === "active" ? "Suspend" : "Reactivate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "Auctions" && (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead><tr><th>Auction</th><th>Seller</th><th>Status</th><th>Current Bid</th><th>Bids</th><th>Actions</th></tr></thead>
                <tbody>
                  {auctions.map((a) => (
                    <tr key={a.id}>
                      <td>{a.title}</td>
                      <td>{a.seller}</td>
                      <td><span className={a.status === "live" ? styles.statusLive : styles.statusSettled}>{a.status}</span></td>
                      <td className={styles.mono}>{formatCurrency(a.currentBid)}</td>
                      <td>{a.bids}</td>
                      <td>
                        {a.status === "live" && (
                          <button className="btn btn-ghost btn-sm" style={{color: "var(--color-live-red)"}} onClick={() => handleCancelAuction(a.id)}>
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "Disputes" && (
            <div className={styles.listingCards}>
              {disputes.map((d) => (
                <div key={d.id} className={styles.reviewCard}>
                  <div className={styles.reviewInfo}>
                    <h3 className={styles.reviewTitle}>{d.auction}</h3>
                    <div className={styles.reviewMeta}>
                      <span>Raised by {d.raisedBy}</span><span>·</span><span>{d.reason}</span><span>·</span><span>{d.date}</span>
                    </div>
                  </div>
                  <div className={styles.reviewActions}>
                    <button className="btn btn-primary btn-sm" onClick={() => handleResolveDispute(d.id)}>Resolve</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Platform Ledger" && (
            <div>
              {/* Financial Dashboard Subheader Banner */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div style={{ padding: '16px', background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-warm-grey)', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Nodal Escrow Ledger Pool</span>
                  <strong style={{ fontSize: '1.25rem', color: 'var(--color-charcoal)' }}>{formatCurrency(nodalPool)}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)', display: 'block', marginTop: '4px' }}>Treasury Yielding Float</span>
                </div>
                <div style={{ padding: '16px', background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-warm-grey)', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Avg. Clearing Margin</span>
                  <strong style={{ fontSize: '1.25rem', color: 'var(--color-charcoal)' }}>6.50%</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-warm-grey)', display: 'block', marginTop: '4px' }}>B2B Wholesale Container Tier</span>
                </div>
                <div style={{ padding: '16px', background: 'var(--color-cream)', border: '1px solid var(--color-accent)', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-warm-grey)', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Available Sweepable Funds</span>
                  <strong style={{ fontSize: '1.25rem', color: 'var(--color-accent)' }}>{formatCurrency(totalProfit)}</strong>
                  <button className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: '8px', fontSize: '0.75rem', padding: '4px' }} onClick={handleSweepProfit}>
                    Sweep Net Profit
                  </button>
                </div>
              </div>

              {/* Commission Line-Item Transactions */}
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Transaction Source</th>
                      <th>Gross Volume</th>
                      <th>Take-Rate Cut</th>
                      <th>Net Revenue Profit</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ledgerEntries.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <strong style={{ color: 'var(--color-charcoal)', fontSize: '0.875rem' }}>{item.lotTitle}</strong>
                          <br />
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-warm-grey)' }}>Ref: {item.orderId}</span>
                        </td>
                        <td className={styles.mono}>{formatCurrency(item.clearedAmt)}</td>
                        <td><span style={{ fontWeight: 600, color: 'var(--color-accent)', background: 'var(--color-cream)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem' }}>{item.rate}</span></td>
                        <td className={styles.mono} style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{formatCurrency(item.commissionRetained)}</td>
                        <td style={{ fontSize: '0.813rem', color: 'var(--color-warm-grey)' }}>{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
