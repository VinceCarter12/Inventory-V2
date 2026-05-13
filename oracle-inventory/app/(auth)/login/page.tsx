"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { setToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 44,
  background: "#FAFAFA",
  border: "1.5px solid #E4E4DE",
  borderRadius: 10,
  padding: "0 14px",
  fontSize: 13,
  color: "#1C1E21",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color .15s",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Invalid email or password.");
        setLoading(false);
        return;
      }

      setToken(data.token);
      router.replace("/dashboard");
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden", background: "#F2F2EE" }}>

      {/* ── Left panel ──────────────────────────────────────────────── */}
      <div style={{
        width: 460,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        padding: "40px 48px",
        background: "#F2F2EE",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "auto" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/oracle-logo.png" alt="Oracle Petroleum" width={40} height={40} style={{ objectFit: "contain", display: "block" }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1C1E21", letterSpacing: "-.01em", lineHeight: 1.1 }}>
              ORACLE
            </div>
            <div style={{ fontSize: 9, fontWeight: 600, color: "#8A8A82", letterSpacing: ".12em", textTransform: "uppercase" }}>
              Petroleum
            </div>
          </div>
        </div>

        {/* Form card */}
        <Card style={{
          background: "#FFFFFF",
          borderRadius: 20,
          boxShadow: "0 4px 32px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
          marginTop: 24,
          border: "none",
        }}>
          <CardContent style={{ padding: "40px 40px 36px" }}>
            <h1 style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#1C1E21",
              letterSpacing: "-.025em",
              marginBottom: 6,
            }}>
              Admin Login
            </h1>
            <p style={{ fontSize: 13, color: "#8A8A82", marginBottom: 28, fontWeight: 400 }}>
              Please enter your credentials to continue.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div style={{ marginBottom: 16 }}>
                <Label style={{ fontSize: 12, fontWeight: 600, color: "#4A4A44", marginBottom: 6, display: "block" }}>
                  Email address
                </Label>
                <input
                  type="email"
                  placeholder="jay@oracle.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = "#1C1E21")}
                  onBlur={e => (e.target.style.borderColor = "#E4E4DE")}
                  required
                  autoFocus
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: error ? 12 : 10 }}>
                <Label style={{ fontSize: 12, fontWeight: 600, color: "#4A4A44", marginBottom: 6, display: "block" }}>
                  Password
                </Label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ ...inputStyle, paddingRight: 44 }}
                    onFocus={e => (e.target.style.borderColor = "#1C1E21")}
                    onBlur={e => (e.target.style.borderColor = "#E4E4DE")}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPass(v => !v)}
                    style={{
                      position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)",
                      width: 32, height: 32, color: "#8A8A82",
                    }}
                  >
                    {showPass ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </Button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div style={{
                  background: "rgba(220,38,38,.08)",
                  border: "1px solid rgba(220,38,38,.2)",
                  borderRadius: 8,
                  padding: "9px 12px",
                  fontSize: 12,
                  color: "#DC2626",
                  marginBottom: 12,
                }}>
                  {error}
                </div>
              )}

              {/* Forgot password */}
              <div style={{ textAlign: "right", marginBottom: 24 }}>
                <a href="#" style={{ fontSize: 12, color: "#4A4A44", textDecoration: "underline", textUnderlineOffset: 2 }}>
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-[46px] text-sm font-bold tracking-tight"
                style={{ background: "#1C1E21", color: "#FFFFFF", borderRadius: 10 }}
                disabled={loading}
              >
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div style={{
          marginTop: "auto",
          paddingTop: 32,
          fontSize: 11,
          color: "#B0B0A8",
          textAlign: "center",
          letterSpacing: ".01em",
        }}>
          Oracle Inventory System · v1.0 · {new Date().getFullYear()}
        </div>
      </div>

      {/* ── Right panel — Oracle building photo ─────────────────────── */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/oracle-building.jpg"
          alt="Oracle Petroleum headquarters"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(242,242,238,0.5) 0%, transparent 18%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "absolute", bottom: 28, left: 32, right: 32 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 12,
            padding: "10px 16px",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C6FF00", flexShrink: 0 }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#fff", letterSpacing: ".01em" }}>
              Oracle Petroleum Corporation Headquarters
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
