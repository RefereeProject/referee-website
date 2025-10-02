"use client";

import { useState } from "react";

/**
 * Newsletter signup component using Mailchimp
 * Provides a clean, modern form for users to subscribe to project updates
 */
export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Mailchimp form action URL from the content.json
    const formUrl = "https://referee-project.us17.list-manage.com/subscribe/post?u=3d5634b1315d3daa737ca37ab&id=7fee4f2f04&f_id=00826ae0f0";

    try {
      // Create form data
      const formData = new FormData();
      formData.append("EMAIL", email);
      formData.append("FNAME", firstName);

      // Note: Mailchimp forms require actual form submission or JSONP for CORS
      // For a production setup, consider using Mailchimp's API or a server-side endpoint
      const form = document.createElement("form");
      form.method = "POST";
      form.action = formUrl;
      form.target = "_blank";

      const emailInput = document.createElement("input");
      emailInput.type = "hidden";
      emailInput.name = "EMAIL";
      emailInput.value = email;
      form.appendChild(emailInput);

      const fnameInput = document.createElement("input");
      fnameInput.type = "hidden";
      fnameInput.name = "FNAME";
      fnameInput.value = firstName;
      form.appendChild(fnameInput);

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      setStatus("success");
      setEmail("");
      setFirstName("");
    } catch {
      // Error handling without unused variable
      setStatus("error");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
      <div className="max-w-md mx-auto text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Stay Updated
        </h3>
        <p className="text-gray-600 mb-6">
          Get monthly updates on the Referee Project. No spam, just insights.
        </p>

        {status === "success" ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            {status === "error" && (
              <p className="text-red-600 text-sm">
                Something went wrong. Please try again.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
