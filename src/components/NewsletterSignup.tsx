"use client";

import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName: firstName || undefined }),
      });
      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setFirstName("");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Unable to connect. Please check your internet connection and try again.");
      console.error("Newsletter signup error:", error);
    }
  };

  return (
    <section className="card-flat card-tint">
      <div className="mx-auto max-w-md">
        <p className="eyebrow"><span className="eyebrow-tick" />Newsletter</p>
        <h3 style={{ marginTop: 10 }}>Stay updated</h3>
        <p style={{ marginTop: 8, color: "var(--ink-muted)", fontSize: 14 }}>
          Get monthly updates on the Referee Project. No spam, just insights.
        </p>

        {status === "success" ? (
          <div className="card-flat" style={{ marginTop: 20, borderColor: "var(--primary-200)", background: "var(--surface)" }}>
            <p style={{ color: "var(--primary-800)", fontWeight: 600 }}>
              ✓ Thanks for subscribing. Check your email to confirm.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ marginTop: 22, display: "grid", gap: 12 }}>
            <input
              type="text"
              placeholder="First name (optional)"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={status === "loading"}
              className="w-full border bg-card-bg px-4 py-3 outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
              style={{ borderColor: "var(--border-strong)", color: "var(--ink)" }}
            />
            <input
              type="email"
              placeholder="Email address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading"}
              className="w-full border bg-card-bg px-4 py-3 outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
              style={{ borderColor: "var(--border-strong)", color: "var(--ink)" }}
            />
            {status === "error" && errorMessage ? (
              <p style={{ color: "var(--error)", fontSize: 13 }}>{errorMessage}</p>
            ) : null}
            <button type="submit" disabled={status === "loading"} className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50">
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
