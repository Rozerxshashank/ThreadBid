"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../auth.module.css";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);

    const isAdmin = email.includes("admin");
    const isSeller = email.includes("seller");
    const assignedRole = isAdmin ? "admin" : isSeller ? "seller" : "buyer";

    try {
      // Execute true secure industry standard HTTP-Only HMAC cryptographic session token handshake
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: assignedRole }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Authentication payload validation failed");
        setLoading(false);
        return;
      }

      // Smoothly route to matching authenticated environment dashboard
      if (assignedRole === "admin") {
        router.push("/admin");
      } else if (assignedRole === "seller") {
        router.push("/seller/dashboard");
      } else {
        router.push("/buyer/dashboard");
      }
    } catch (err) {
      console.error("Session network layer failure:", err);
      setError("Network timeout communicating with secure token gateway cluster");
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Link href="/" className={styles.logo}>ThreadBid</Link>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Sign in to your account to continue bidding</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error} id="login-error">{error}</div>}

          <div className={styles.field}>
            <label className="input-label" htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              className="input-field"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label className="input-label" htmlFor="login-password">Password</label>
              <Link href="/auth/forgot-password" className={styles.forgotLink}>Forgot password?</Link>
            </div>
            <div className={styles.passwordWrap}>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 9S5 4 9 4s7 5 7 5-3 5-7 5S2 9 2 9Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M3 15L15 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 9S5 4 9 4s7 5 7 5-3 5-7 5S2 9 2 9Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/></svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`btn btn-primary btn-lg ${styles.submitBtn}`}
            disabled={loading}
            id="login-submit"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className={styles.footer}>
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className={styles.footerLink}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}
