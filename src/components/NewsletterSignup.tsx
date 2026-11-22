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
        <h3 className="mt-2.5">Stay updated</h3>
        <p className="mt-2 text-sm text-ink-muted">
          Get monthly updates on the Referee Project. No spam, just insights.
        </p>

        {status === "success" ? (
          // role="status" makes screen readers announce the confirmation,
          // which otherwise appears silently in place of the form.
          <div className="card-flat mt-5" role="status">
            <p className="font-semibold text-navy">
              ✓ Thanks for subscribing. Check your email to confirm.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
            {/* A placeholder is not an accessible name, so each field also
                carries the same wording as its aria-label. Focus styling
                comes from .field (the inputs used to remove their outline). */}
            <input
              type="text"
              placeholder="First name (optional)"
              aria-label="First name (optional)"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={status === "loading"}
              className="field"
            />
            <input
              type="email"
              placeholder="Email address *"
              aria-label="Email address"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading"}
              className="field"
            />
            {status === "error" && errorMessage ? (
              <p role="alert" className="text-[13px]" style={{ color: "var(--error)" }}>{errorMessage}</p>
            ) : null}
            <button type="submit" disabled={status === "loading"} className="btn btn-primary w-full">
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
