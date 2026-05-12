"use client";

import { useState, use } from "react";
import Link from "next/link";
import { formatCurrency, MOCK_AUCTIONS } from "@/lib/mock-data";
import styles from "./page.module.css";

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  // Mocking order data based on the ID or auction
  const auction = MOCK_AUCTIONS[0];
  const [step, setStep] = useState<"summary" | "shipping" | "payment">("summary");
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const finalAmount = auction.currentBid || auction.startPrice;
  const platformFee = Math.round(finalAmount * 0.08); // 8% commission
  const totalPayable = finalAmount; // PRD: Buyer pays full bid price, commission deducted from seller payout

  const handleNext = () => {
    if (step === "summary") setStep("shipping");
    else if (step === "shipping") setStep("payment");
  };

  const handleBack = () => {
    if (step === "shipping") setStep("summary");
    else if (step === "payment") setStep("shipping");
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.checkoutLayout}>
          <div className={styles.main}>
            <div className={styles.stepper}>
              <div className={`${styles.step} ${step === "summary" ? styles.stepActive : ""} ${step !== "summary" ? styles.stepDone : ""}`}>
                <span className={styles.stepNum}>1</span>
                <span className={styles.stepLabel}>Summary</span>
              </div>
              <div className={styles.stepDivider} />
              <div className={`${styles.step} ${step === "shipping" ? styles.stepActive : ""} ${step === "payment" ? styles.stepDone : ""}`}>
                <span className={styles.stepNum}>2</span>
                <span className={styles.stepLabel}>Shipping</span>
              </div>
              <div className={styles.stepDivider} />
              <div className={`${styles.step} ${step === "payment" ? styles.stepActive : ""}`}>
                <span className={styles.stepNum}>3</span>
                <span className={styles.stepLabel}>Payment</span>
              </div>
            </div>

            <div className={styles.card}>
              {step === "summary" && (
                <div className={styles.content}>
                  <h2 className={styles.cardTitle}>Order Summary</h2>
                  <div className={styles.itemRow}>
                    <div className={styles.itemImage}>👕</div>
                    <div className={styles.itemInfo}>
                      <h3 className={styles.itemName}>{auction.title}</h3>
                      <p className={styles.itemMeta}>{auction.brand} · {auction.lotSize} pcs</p>
                    </div>
                    <div className={styles.itemPrice}>{formatCurrency(finalAmount)}</div>
                  </div>
                  <div className={styles.summaryTable}>
                    <div className={styles.summaryRow}>
                      <span>Winning Bid</span>
                      <span>{formatCurrency(finalAmount)}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span>Shipping</span>
                      <span className={styles.free}>Calculated post-ship</span>
                    </div>
                    <div className={styles.summaryTotal}>
                      <span>Total Payable</span>
                      <span>{formatCurrency(totalPayable)}</span>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-lg" style={{width: '100%', marginTop: '24px'}} onClick={handleNext}>
                    Continue to Shipping
                  </button>
                </div>
              )}

              {step === "shipping" && (
                <div className={styles.content}>
                  <h2 className={styles.cardTitle}>Shipping Address</h2>
                  <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                    <div className={styles.grid}>
                      <div className={styles.field}>
                        <label className="input-label">Full Name</label>
                        <input type="text" className="input-field" required value={address.name} onChange={e => setAddress({...address, name: e.target.value})} />
                      </div>
                      <div className={styles.field}>
                        <label className="input-label">Phone Number</label>
                        <input type="tel" className="input-field" required value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} />
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label className="input-label">Street Address</label>
                      <input type="text" className="input-field" required value={address.street} onChange={e => setAddress({...address, street: e.target.value})} />
                    </div>
                    <div className={styles.grid}>
                      <div className={styles.field}>
                        <label className="input-label">City</label>
                        <input type="text" className="input-field" required value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
                      </div>
                      <div className={styles.field}>
                        <label className="input-label">State</label>
                        <input type="text" className="input-field" required value={address.state} onChange={e => setAddress({...address, state: e.target.value})} />
                      </div>
                      <div className={styles.field}>
                        <label className="input-label">Pincode</label>
                        <input type="text" className="input-field" required value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})} />
                      </div>
                    </div>
                    <div className={styles.actions}>
                      <button type="button" className="btn btn-ghost" onClick={handleBack}>Back</button>
                      <button type="submit" className="btn btn-primary">Continue to Payment</button>
                    </div>
                  </form>
                </div>
              )}

              {step === "payment" && (
                <div className={styles.content}>
                  <h2 className={styles.cardTitle}>Payment Method</h2>
                  <p className={styles.cardSubtitle}>All payments are secured and held in escrow via Razorpay.</p>
                  
                  <div className={styles.paymentBox}>
                    <div className={styles.paymentOption}>
                      <div className={styles.paymentIcon}>💳</div>
                      <div className={styles.paymentInfo}>
                        <span className={styles.paymentName}>Razorpay Secure</span>
                        <span className={styles.paymentDesc}>UPI, Cards, Netbanking</span>
                      </div>
                      <div className={styles.paymentCheck}>✓</div>
                    </div>
                  </div>

                  <div className={styles.securityNote}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="3" y="7" width="10" height="7" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M5 7V5C5 3.34315 6.34315 2 8 2C9.65685 2 11 3.34315 11 5V7" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>Your transaction is encrypted and secured by SSL.</span>
                  </div>

                  <button className="btn btn-accent btn-lg" style={{width: '100%', marginTop: '24px'}} id="pay-button">
                    Pay {formatCurrency(totalPayable)}
                  </button>
                  <button className="btn btn-ghost" style={{width: '100%', marginTop: '8px'}} onClick={handleBack}>
                    Go Back
                  </button>
                </div>
              )}
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.trustCard}>
              <h4 className={styles.trustTitle}>Secure Liquidation</h4>
              <ul className={styles.trustList}>
                <li>Verified Authentic Goods</li>
                <li>Secure Escrow Payments</li>
                <li>7-Day Dispute Window</li>
              </ul>
            </div>
            <div className={styles.helpCard}>
              <p>Need help with your order?</p>
              <Link href="/contact" className={styles.helpLink}>Contact Support</Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
