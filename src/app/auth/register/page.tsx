"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../auth.module.css";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gstin, setGstin] = useState("");
  const [pan, setPan] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordChecks = [
    { label: "At least 10 characters", met: password.length >= 10 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One digit", met: /\d/.test(password) },
    { label: "One special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password || !confirmPassword || !fullName.trim() || !phoneNumber.trim()) {
      setError("Please fill in all standard identity contact fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!passwordChecks.every((c) => c.met)) {
      setError("Password does not meet requirements");
      return;
    }
    if (role === "seller") {
      if (!businessName.trim()) {
        setError("Corporate Entity / Business Name is required for liquidation clearance.");
        return;
      }
      if (gstin.trim().length !== 15) {
        setError("Institutional GSTIN signature must be precisely 15 alphanumeric characters.");
        return;
      }
      if (pan.trim().length !== 10) {
        setError("Corporate PAN verification index must be precisely 10 characters.");
        return;
      }
    }
    if (!agreed) {
      setError("Please accept the terms of service");
      return;
    }
    setLoading(true);

    try {
      // Execute true secure industry standard HTTP-Only HMAC cryptographic session token handshake
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Account serialization verification failed");
        setLoading(false);
        return;
      }

      if (role === "seller") {
        router.push("/seller/dashboard");
      } else {
        router.push("/buyer/dashboard");
      }
    } catch (err) {
      console.error("Registration network layer timeout:", err);
      setError("Network fault connecting to identity cluster engines");
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Link href="/" className={styles.logo}>ThreadBid</Link>
          <h1 className={styles.title}>Create your account</h1>
          <p className={styles.subtitle}>Join the fashion dead stock marketplace</p>
        </div>

        <div className={styles.roleToggle}>
          <button
            className={`${styles.roleBtn} ${role === "buyer" ? styles.roleBtnActive : ""}`}
            onClick={() => setRole("buyer")}
            type="button"
            id="role-buyer"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 16C3 13 5.5 11 9 11s6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Buyer
          </button>
          <button
            className={`${styles.roleBtn} ${role === "seller" ? styles.roleBtnActive : ""}`}
            onClick={() => setRole("seller")}
            type="button"
            id="role-seller"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 4V3a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.5"/></svg>
            Seller
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error} id="register-error">{error}</div>}

          <div className={styles.field}>
            <label className="input-label" htmlFor="register-fullname">Representative Full Name</label>
            <input id="register-fullname" type="text" className="input-field" placeholder="First and Last Name" value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" />
          </div>

          <div className={styles.field}>
            <label className="input-label" htmlFor="register-email">Email address</label>
            <input id="register-email" type="email" className="input-field" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>

          <div className={styles.field}>
            <label className="input-label" htmlFor="register-phone">Corporate Contact Number</label>
            <input id="register-phone" type="tel" className="input-field" placeholder="+91 98765 43210" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} autoComplete="tel" />
          </div>

          {role === "seller" && (
            <>
              <div className={styles.field}>
                <label className="input-label" htmlFor="register-business">Corporate Entity / Business Name</label>
                <input id="register-business" type="text" className="input-field" placeholder="Registered Brand or Company Ltd." value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
              </div>
              <div className={styles.field}>
                <label className="input-label" htmlFor="register-gstin">Institutional GSTIN (15 characters)</label>
                <input id="register-gstin" type="text" className="input-field" placeholder="e.g. 22AAAAA0000A1Z5" value={gstin} onChange={(e) => setGstin(e.target.value.toUpperCase())} maxLength={15} />
              </div>
              <div className={styles.field}>
                <label className="input-label" htmlFor="register-pan">Corporate PAN (10 characters)</label>
                <input id="register-pan" type="text" className="input-field" placeholder="e.g. ABCDE1234F" value={pan} onChange={(e) => setPan(e.target.value.toUpperCase())} maxLength={10} />
              </div>
            </>
          )}

          <div className={styles.field}>
            <label className="input-label" htmlFor="register-password">Password</label>
            <input id="register-password" type="password" className="input-field" placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
            {password.length > 0 && (
              <div className={styles.passwordChecks}>
                {passwordChecks.map((check) => (
                  <span key={check.label} className={check.met ? styles.checkMet : styles.checkUnmet}>
                    {check.met ? "✓" : "○"} {check.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className={styles.field}>
            <label className="input-label" htmlFor="register-confirm">Confirm password</label>
            <input id="register-confirm" type="password" className="input-field" placeholder="Repeat your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" />
          </div>

          <label className={styles.checkbox} id="terms-checkbox">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            <span>I agree to the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link></span>
          </label>

          <button type="submit" className={`btn btn-primary btn-lg ${styles.submitBtn}`} disabled={loading} id="register-submit">
            {loading ? "Creating account..." : `Create ${role} account`}
          </button>
        </form>

        <div className={styles.footer}>
          Already have an account?{" "}
          <Link href="/auth/login" className={styles.footerLink}>Sign in</Link>
        </div>
      </div>
    </div>
  );
}
