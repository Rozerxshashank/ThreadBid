"use client";

import { useState, useEffect, useMemo, use } from "react";
import { MOCK_AUCTIONS, MOCK_BIDS, formatCurrency, getTimeRemaining, getBidIncrement } from "@/lib/mock-data";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { placeSecuredBidAction } from "@/app/actions/trade";

export default function AuctionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const auction = MOCK_AUCTIONS.find((a) => a.id === id) ?? MOCK_AUCTIONS[0];
  const auctionBids = MOCK_BIDS.filter((b) => b.auctionId === auction.id);

  const [isMounted, setIsMounted] = useState(false);
  const [walletBalance, setWalletBalance] = useState(500000); // Pre-funded with ₹5 Lakhs
  const [isPurchased, setIsPurchased] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(auction.endTime));
  const [bidAmount, setBidAmount] = useState("");
  const [bids, setBids] = useState(auctionBids);
  const [currentBid, setCurrentBid] = useState(auction.currentBid ?? auction.startPrice);
  const [bidCount, setBidCount] = useState(auction.totalBids);
  const [showToast, setShowToast] = useState("");
  const [activeTab, setActiveTab] = useState<"description" | "condition" | "lot" | "shipping">("description");
  const [userRole, setUserRole] = useState<string | null>(null);

  const increment = useMemo(() => getBidIncrement(currentBid), [currentBid]);
  const minBid = currentBid + increment;
  const isLive = auction.status === "live" && timeLeft.total > 0;
  const isUrgent = timeLeft.total > 0 && timeLeft.total < 300000;
  const reserveMet = auction.reservePrice ? currentBid >= auction.reservePrice : true;

  // Track user's highest previously locked escrow amount for this lot
  const myPreviousMaxBid = useMemo(() => {
    const myBids = bids.filter((b) => b.bidderAlias.startsWith("you"));
    if (myBids.length === 0) return 0;
    return Math.max(...myBids.map((b) => b.amount));
  }, [bids]);

  useEffect(() => {
    setIsMounted(true);
    const cookies = document.cookie.split("; ");
    const roleCookie = cookies.find((c) => c.startsWith("threadbid_role="));
    if (roleCookie) {
      setUserRole(roleCookie.split("=")[1]);
    } else {
      setUserRole(null);
    }

    if (!isLive) return;
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(auction.endTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [auction.endTime, isLive]);

  useEffect(() => {
    setBidAmount(minBid.toString());
  }, [minBid]);

  const [isPending, setIsPending] = useState(false);

  // Synchronise dashboard active bids storage buffer instantly upon newly verified local bid placements
  const updateDashboardCache = (bidAmountNum: number, finalStatus: string = "winning") => {
    try {
      const cachedStr = localStorage.getItem("threadbid_active_bids");
      let activeBidsArr = [];
      if (cachedStr) {
        try { activeBidsArr = JSON.parse(cachedStr); } catch (e) {}
      }
      if (!Array.isArray(activeBidsArr)) activeBidsArr = [];

      const existingIdx = activeBidsArr.findIndex((b: any) => b.id === auction.id || b.title === auction.title);
      if (existingIdx >= 0) {
        activeBidsArr[existingIdx] = {
          ...activeBidsArr[existingIdx],
          myBid: bidAmountNum,
          currentBid: bidAmountNum,
          status: finalStatus
        };
      } else {
        activeBidsArr.unshift({
          id: auction.id,
          title: auction.title,
          brand: auction.brand,
          myBid: bidAmountNum,
          currentBid: bidAmountNum,
          status: finalStatus,
          endTime: "22m"
        });
      }
      localStorage.setItem("threadbid_active_bids", JSON.stringify(activeBidsArr));
    } catch (e) {}
  };

  const handlePlaceBid = async () => {
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount < minBid) {
      setShowToast(`Minimum bid is ${formatCurrency(minBid)}`);
      setTimeout(() => setShowToast(""), 3000);
      return;
    }

    const deductionDelta = amount > myPreviousMaxBid ? amount - myPreviousMaxBid : 0;

    if (deductionDelta > walletBalance) {
      setShowToast("Insufficient balance in Secure Wallet for the incremental raise.");
      setTimeout(() => setShowToast(""), 3000);
      return;
    }

    setIsPending(true);
    try {
      // Loophole #1 & #2 closed: Real database persistent server action mutation invocation
      const serverRes = await placeSecuredBidAction(auction.id, amount);

      if (serverRes?.error) {
        setShowToast(`Server Concurrency Fault: ${serverRes.error}`);
        return;
      }

      // Optimistically update client views instantly upon verified persistence
      const newBid = {
        id: serverRes?.bidId || `bid-${Date.now()}`,
        auctionId: auction.id,
        bidderAlias: "you",
        amount,
        placedAt: new Date().toISOString(),
      };

      setBids((prev) => [newBid, ...prev]);
      setCurrentBid(amount);
      setBidCount((c) => c + 1);
      setWalletBalance((b) => b - deductionDelta);
      updateDashboardCache(amount, "winning");
      setShowToast(
        deductionDelta > 0
          ? `Bid locked securely on DB! Incremental ${formatCurrency(deductionDelta)} reserved.`
          : "Secure persistent bid logged successfully!"
      );
    } catch (err: any) {
      setShowToast("Network transmission fault communicating with persistent databases.");
    } finally {
      setIsPending(false);
      setTimeout(() => setShowToast(""), 3000);
    }
  };

  const router = useRouter();

  const handleBuyNow = async () => {
    if (!auction.buyNowPrice) return;
    const amount = auction.buyNowPrice;

    const deductionDelta = amount > myPreviousMaxBid ? amount - myPreviousMaxBid : 0;

    if (deductionDelta > walletBalance) {
      setShowToast("Insufficient balance in Secure Wallet for the incremental raise.");
      setTimeout(() => setShowToast(""), 3000);
      return;
    }

    setIsPending(true);
    try {
      const serverRes = await placeSecuredBidAction(auction.id, amount);

      if (serverRes?.error) {
        setShowToast(`Server Concurrency Fault: ${serverRes.error}`);
        return;
      }

      const newBid = {
        id: serverRes?.bidId || `bid-buynow-${Date.now()}`,
        auctionId: auction.id,
        bidderAlias: "you (Buy Now)",
        amount,
        placedAt: new Date().toISOString(),
      };

      setBids((prev) => [newBid, ...prev]);
      setCurrentBid(amount);
      setBidCount((c) => c + 1);
      setWalletBalance((b) => b - deductionDelta);
      setIsPurchased(true);
      updateDashboardCache(amount, "won");
      setShowToast("Escrow cleared natively via high-speed DB transactions!");
    } catch (err: any) {
      setShowToast("Network failure clearing absolute transactions.");
    } finally {
      setIsPending(false);
      setTimeout(() => setShowToast(""), 3000);
    }
  };

  const formatTime = () => {
    if (timeLeft.total <= 0) return "Auction Ended";
    const parts = [];
    if (timeLeft.days && timeLeft.days > 0) parts.push(`${timeLeft.days}d`);
    if (timeLeft.hours > 0) parts.push(`${timeLeft.hours}h`);
    parts.push(`${timeLeft.minutes}m`);
    if (timeLeft.hours === 0) parts.push(`${timeLeft.seconds}s`);
    return parts.join(" ");
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div className={styles.breadcrumb} style={{ marginBottom: 0 }}>
            <Link href="/auctions">Auctions</Link>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{auction.brand}</span>
          </div>

          {userRole === "buyer" ? (
            <Link href="/buyer/dashboard" className="btn btn-outline btn-sm" style={{ padding: '4px 10px', fontSize: '0.75rem', fontWeight: 700 }}>
              ← Return to Escrow Ledger Dashboard
            </Link>
          ) : (
            <Link href="/auctions" className="btn btn-outline btn-sm" style={{ padding: '4px 10px', fontSize: '0.75rem', fontWeight: 700 }}>
              ← Browse All Showcase Lots
            </Link>
          )}
        </div>

        <div className={styles.layout}>
          {/* Left Panel */}
          <div className={styles.left}>
            <div className={styles.imageGallery}>
              <div className={styles.mainImage} style={{ backgroundColor: getCategoryColor(auction.category) }}>
                <span className={styles.imageEmoji}>{getCategoryEmoji(auction.category)}</span>
                {isLive && (
                  <span className={`badge badge-live ${styles.liveBadge}`}>
                    <span className="live-dot live-dot-red" /> LIVE
                  </span>
                )}
              </div>
            </div>

            <div className={styles.details}>
              <div className={styles.tabs}>
                {(["description", "condition", "lot", "shipping"] as const).map((tab) => (
                  <button
                    key={tab}
                    className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
                    onClick={() => setActiveTab(tab)}
                    id={`tab-${tab}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <div className={styles.tabContent}>
                {activeTab === "description" && (
                  <p>Premium quality fashion items from {auction.brand}. This lot includes {auction.lotSize} pieces in excellent condition, suitable for retail, resale, or export markets. All items are from recent collections and in demand across India.</p>
                )}
                {activeTab === "condition" && (
                  <p>Condition: <strong>{auction.condition.replace(/_/g, " ")}</strong>. All items have been inspected and graded. Original packaging and tags are {auction.condition === "new_with_tags" ? "included" : "not included"}.</p>
                )}
                {activeTab === "lot" && (
                  <div>
                    <p><strong>Lot size:</strong> {auction.lotSize} pieces</p>
                    <p><strong>Category:</strong> {auction.category}</p>
                    <p><strong>Brand:</strong> {auction.brand}</p>
                    <p><strong>Price per piece:</strong> {formatCurrency(Math.round(currentBid / auction.lotSize))}</p>
                  </div>
                )}
                {activeTab === "shipping" && (
                  <p>Shipping is arranged by the seller post-payment. Tracking number will be provided within 48 hours of payment confirmation. Delivery typically within 5-7 business days across India.</p>
                )}
              </div>
            </div>

            <div className={styles.sellerInfo}>
              <div className={styles.sellerHeader}>
                <div className={styles.sellerAvatar}>
                  {auction.seller.name.charAt(0)}
                </div>
                <div>
                  <div className={styles.sellerName}>
                    {auction.seller.name}
                    {auction.seller.isVerified && (
                      <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className={styles.verifiedIcon}>
                        <path d="M7 0L8.5 2.5L11.5 1.5L11 4.5L14 5.5L12 8L14 10.5L11 10L11.5 13L8.5 11.5L7 14L5.5 11.5L2.5 13L3 10L0 10.5L2 8L0 5.5L3 4.5L2.5 1.5L5.5 2.5L7 0Z" fill="#2D5016"/>
                        <path d="M5 7L6.5 8.5L9.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div className={styles.sellerRating}>★ {auction.seller.rating}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel — Bidding */}
          <div className={styles.right}>
            <div className={styles.bidPanel}>
              <div className={styles.bidHeader}>
                <h1 className={styles.auctionTitle}>{auction.title}</h1>
                <span className={styles.brandLabel}>{auction.brand}</span>
              </div>

              <div className={styles.timerRow}>
                <span className={styles.timerLabel}>{isLive ? "Ends in" : "Auction ended"}</span>
                <span className={`${styles.timerValue} countdown ${isUrgent ? "countdown-urgent" : ""}`}>
                  {isMounted ? formatTime() : "--:--"}
                </span>
              </div>

              <div className={styles.currentBidBlock}>
                <span className={styles.currentBidLabel}>Current Bid</span>
                <span className={styles.currentBidValue}>{formatCurrency(currentBid)}</span>
                <span className={styles.bidCountLabel}>{bidCount} bids</span>
              </div>

              <div className={styles.reserveIndicator}>
                {auction.reservePrice && (
                  <span className={reserveMet ? styles.reserveMet : styles.reserveNotMet}>
                    {reserveMet ? "✓ Reserve Met" : "Reserve Not Yet Met"}
                  </span>
                )}
              </div>

              {isLive && !isPurchased && (
                <div className={styles.bidForm}>
                  {userRole === "seller" ? (
                    <div style={{ background: 'var(--color-cream)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '20px 16px', textAlign: 'center', margin: '8px 0' }}>
                      <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '6px' }}>🔒</span>
                      <h3 style={{ fontSize: '1.125rem', color: 'var(--color-charcoal)', fontWeight: 700, marginBottom: '6px' }}>Seller Accounts Restricted</h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--color-warm-grey)', marginBottom: '0', lineHeight: 1.4 }}>
                        Institutional fashion liquidators and sellers are restricted from placing competitive bids on wholesale lots to prevent platform manipulation and shill bidding.
                      </p>
                    </div>
                  ) : userRole ? (
                    <>
                      {/* Secure Wallet Info Strip */}
                      <div style={{ background: 'var(--color-cream)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '10px 14px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontSize: '0.688rem', fontWeight: 700, color: 'var(--color-warm-grey)', textTransform: 'uppercase', display: 'block' }}>Secure Nodal Wallet</span>
                          <strong style={{ fontSize: '1.063rem', color: 'var(--color-charcoal)' }}>{formatCurrency(walletBalance)}</strong>
                        </div>
                        <button
                          className="btn btn-ghost btn-sm"
                          style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                          onClick={() => {
                            setWalletBalance(b => b + 200000);
                            setShowToast("Deposited ₹2,00,000 to Escrow Wallet!");
                            setTimeout(() => setShowToast(""), 3000);
                          }}
                          id="add-funds-button"
                        >
                          ⊕ Add Funds
                        </button>
                      </div>

                      <div className={styles.bidInputRow}>
                        <span className={styles.currencyPrefix}>₹</span>
                        <input
                          type="number"
                          className={styles.bidInput}
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          min={minBid}
                          step={increment}
                          id="bid-amount-input"
                        />
                      </div>
                      <p className={styles.bidHint}>
                        Min. increment: {formatCurrency(increment)} · Min. bid: {formatCurrency(minBid)}
                      </p>
                      <button
                        className="btn btn-accent btn-lg"
                        style={{ width: "100%" }}
                        onClick={handlePlaceBid}
                        disabled={isPending}
                        id="place-bid-button"
                      >
                        {isPending ? "Locking Database Escrow..." : "Place Bid"}
                      </button>
                      {auction.buyNowPrice && currentBid < auction.buyNowPrice && (
                        <button
                          className="btn btn-outline"
                          style={{ width: "100%", marginTop: "8px" }}
                          onClick={handleBuyNow}
                          disabled={isPending}
                          id="buy-now-button"
                        >
                          {isPending ? "Processing Nodal Transfer..." : `Buy Now — ${formatCurrency(auction.buyNowPrice)}`}
                        </button>
                      )}
                    </>
                  ) : (
                    <div style={{ background: 'var(--color-cream)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '20px 16px', textAlign: 'center', margin: '8px 0' }}>
                      <h3 style={{ fontSize: '1.125rem', color: 'var(--color-charcoal)', fontWeight: 700, marginBottom: '6px' }}>Authentication Required</h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--color-warm-grey)', marginBottom: '16px', lineHeight: 1.4 }}>
                        Institutional escrow accounts require KYC authorization. Sign in to unlock physical clearing wallets and lock competitive bids.
                      </p>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <Link href={`/auth/login?callbackUrl=/auctions/${auction.id}`} className="btn btn-primary btn-sm" style={{ fontWeight: 700 }}>
                          Sign In
                        </Link>
                        <Link href="/auth/register" className="btn btn-outline btn-sm">
                          Register Account
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {isPurchased && (
                <div style={{ padding: '24px 16px', textAlign: 'center', background: 'var(--color-cream)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-accent)', margin: '16px 0' }}>
                  <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '8px' }}>🎉</span>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--color-accent)', marginBottom: '4px', fontWeight: 700 }}>Inventory Secured!</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-warm-grey)', marginBottom: '16px', lineHeight: 1.5 }}>
                    {formatCurrency(auction.buyNowPrice ?? currentBid)} instantly reserved from your Secure Wallet. Escrow lock applied.
                  </p>
                  <Link href={`/orders/${auction.id}`} className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                    Track Order Fulfillment Timeline →
                  </Link>
                </div>
              )}

              {!isLive && (
                <div className={styles.endedBanner}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>This auction has ended</span>
                </div>
              )}

              <div className={styles.bidHistory}>
                <h3 className={styles.bidHistoryTitle}>Bid History</h3>
                <div className={styles.bidList}>
                  {bids.slice(0, 10).map((bid) => (
                    <div key={bid.id} className={`${styles.bidItem} ${bid.bidderAlias === "you" ? styles.bidItemYou : ""}`} id={`bid-row-${bid.id}`}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className={styles.bidder}>{bid.bidderAlias === "you" ? "You" : bid.bidderAlias}</span>
                        <code style={{ fontSize: '0.65rem', color: 'var(--color-warm-grey)', marginTop: '2px', fontFamily: 'monospace' }}>ID: {bid.id}</code>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <span className={styles.bidAmountHistory}>{formatCurrency(bid.amount)}</span>
                        <span className={styles.bidTime}>{isMounted ? getRelativeTime(bid.placedAt) : ""}</span>
                      </div>
                    </div>
                  ))}
                  {bids.length === 0 && (
                    <p className={styles.noBids}>No bids yet. Be the first!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <div className={styles.toast} id="bid-toast">
          {showToast}
        </div>
      )}
    </div>
  );
}

function getRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    "T-Shirts": "#E8E0D8", "Ethnic Wear": "#D8E0E8", Jackets: "#DDE4D8",
    Activewear: "#E4D8E0", Shirts: "#D8E4E0", Sarees: "#E0D8E4",
  };
  return colors[category] || "#E8E4E0";
}

function getCategoryEmoji(category: string): string {
  const icons: Record<string, string> = {
    "T-Shirts": "👕", "Ethnic Wear": "🪷", Jackets: "🧥",
    Activewear: "🩳", Shirts: "👔", Sarees: "🧶",
  };
  return icons[category] || "📦";
}
