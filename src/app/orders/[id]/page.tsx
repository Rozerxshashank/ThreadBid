"use client";

import { use } from "react";
import Link from "next/link";
import { formatCurrency, MOCK_AUCTIONS } from "@/lib/mock-data";
import styles from "./page.module.css";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const auction = MOCK_AUCTIONS[0]; // Mocking
  
  const order = {
    id: id,
    date: "May 12, 2026",
    status: "PAID",
    fulfillment: "AWAITING DISPATCH",
    amount: auction.currentBid || auction.startPrice,
    address: {
      name: "Rahul Sharma",
      phone: "+91 98765 43210",
      street: "123, MG Road, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038"
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>Order #{order.id.slice(0, 8)}</h1>
            <span className={`badge badge-verified`}>PAID</span>
          </div>
          <Link href="/buyer/dashboard" className="btn btn-ghost btn-sm">
            ← Back to Dashboard
          </Link>
        </div>

        <div className={styles.layout}>
          <div className={styles.main}>
            <div className={styles.statusCard}>
              <div className={styles.statusHeader}>
                <h2 className={styles.sectionTitle}>Order Status</h2>
                <span className={styles.statusLabel}>{order.fulfillment}</span>
              </div>
              <div className={styles.progress}>
                <div className={`${styles.progressStep} ${styles.active}`}>
                  <div className={styles.dot} />
                  <span className={styles.label}>Paid</span>
                </div>
                <div className={styles.progressLine} />
                <div className={styles.progressStep}>
                  <div className={styles.dot} />
                  <span className={styles.label}>Dispatched</span>
                </div>
                <div className={styles.progressLine} />
                <div className={styles.progressStep}>
                  <div className={styles.dot} />
                  <span className={styles.label}>Delivered</span>
                </div>
              </div>
              <p className={styles.statusNote}>
                Seller is preparing your lot. Tracking information will appear here once dispatched.
              </p>
            </div>

            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Order Items</h2>
              <div className={styles.itemRow}>
                <div className={styles.itemImage}>👕</div>
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{auction.title}</h3>
                  <p className={styles.itemMeta}>{auction.brand} · {auction.lotSize} pcs</p>
                  <p className={styles.itemCondition}>{auction.condition.replace(/_/g, ' ')}</p>
                </div>
                <div className={styles.itemPrice}>{formatCurrency(order.amount)}</div>
              </div>
              
              <div className={styles.paymentSummary}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.amount)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Commission & Fees</span>
                  <span className={styles.feeNote}>Paid by seller</span>
                </div>
                <div className={styles.summaryTotal}>
                  <span>Total Paid</span>
                  <span>{formatCurrency(order.amount)}</span>
                </div>
              </div>
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Shipping Address</h2>
              <div className={styles.addressBox}>
                <p className={styles.addressName}>{order.address.name}</p>
                <p>{order.address.street}</p>
                <p>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
                <p className={styles.addressPhone}>Phone: {order.address.phone}</p>
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Seller Information</h2>
              <div className={styles.sellerBox}>
                <div className={styles.sellerAvatar}>{auction.seller.name.charAt(0)}</div>
                <div className={styles.sellerInfo}>
                  <p className={styles.sellerName}>{auction.seller.name}</p>
                  <p className={styles.sellerRating}>★ {auction.seller.rating} rating</p>
                </div>
              </div>
              <button className="btn btn-outline btn-sm" style={{width: '100%', marginTop: '16px'}}>
                Raise a Dispute
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
