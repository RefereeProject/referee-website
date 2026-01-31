"use client";

import { useState } from "react";

/**
 * Newsletter signup component using server-side Mailchimp integration
 * Provides a clean, modern form for users to subscribe to project updates
 */
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName: firstName || undefined,
        }),
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
    <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-2xl p-8 border border-primary-200">
      <div className="max-w-md mx-auto text-center">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Stay Updated
        </h3>
        <p className="text-foreground-muted mb-6">
          Get monthly updates on the Referee Project. No spam, just insights.
        </p>

        {status === "success" ? (
          <div className="bg-primary-50 border border-primary-300 rounded-lg p-4">
            <p className="text-primary-800 font-medium">
              ✓ Thanks for subscribing! Check your email to confirm.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="First Name (optional)"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={status === "loading"}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card-bg text-foreground placeholder:text-foreground-muted focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading"}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card-bg text-foreground placeholder:text-foreground-muted focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            {status === "error" && errorMessage ? (
              <p className="text-accent-600 text-sm">
                {errorMessage}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
