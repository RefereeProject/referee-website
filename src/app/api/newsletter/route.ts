import { NextResponse } from "next/server";

/**
 * Newsletter API types
 */
type NewsletterRequest = {
  email: string;
  firstName?: string;
};

type NewsletterResponse = {
  status: "success" | "error";
  message: string;
};

/**
 * Validate newsletter signup input
 */
function validateInput(input: unknown): { ok: boolean; message?: string; data?: NewsletterRequest } {
  if (!input || typeof input !== "object") {
    return { ok: false, message: "Invalid request format" };
  }

  const { email, firstName } = input as Partial<NewsletterRequest>;

  // Validate email
  if (!email || typeof email !== "string") {
    return { ok: false, message: "Email is required" };
  }

  const trimmedEmail = email.trim();
  if (trimmedEmail.length === 0) {
    return { ok: false, message: "Email cannot be empty" };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { ok: false, message: "Please enter a valid email address" };
  }

  // Validate firstName if provided
  let trimmedFirstName: string | undefined;
  if (firstName !== undefined && firstName !== null) {
    if (typeof firstName !== "string") {
      return { ok: false, message: "First name must be a string" };
    }
    trimmedFirstName = firstName.trim();
    if (trimmedFirstName.length > 100) {
      return { ok: false, message: "First name is too long" };
    }
  }

  return {
    ok: true,
    data: {
      email: trimmedEmail,
      firstName: trimmedFirstName,
    },
  };
}

/**
 * Subscribe email to Mailchimp list
 */
async function subscribeToMailchimp(input: NewsletterRequest): Promise<{
  ok: boolean;
  status: number;
  message: string;
}> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  // Check environment variables
  if (!apiKey || !serverPrefix || !audienceId) {
    console.error("Missing Mailchimp environment variables:", {
      hasApiKey: !!apiKey,
      hasServerPrefix: !!serverPrefix,
      hasAudienceId: !!audienceId,
    });
    return {
      ok: false,
      status: 500,
      message: "Server configuration error. Please contact support.",
    };
  }

  // Prepare Mailchimp API request
  const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

  // Mailchimp uses Basic auth with "anystring:API_KEY"
  const auth = Buffer.from(`anystring:${apiKey}`).toString("base64");

  const payload = {
    email_address: input.email,
    status: "pending", // Double opt-in - user must confirm via email
    merge_fields: input.firstName ? { FNAME: input.firstName } : {},
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${auth}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    // Handle successful subscription
    if (response.ok) {
      return {
        ok: true,
        status: 200,
        message: "Thanks for subscribing! Please check your email to confirm your subscription.",
      };
    }

    // Handle member already exists
    if (response.status === 400 && data.title === "Member Exists") {
      return {
        ok: false,
        status: 409,
        message: "This email is already subscribed to our newsletter.",
      };
    }

    // Handle Mailchimp server errors
    if (response.status >= 500) {
      console.error("Mailchimp server error:", data);
      return {
        ok: false,
        status: 502,
        message: "Newsletter service is temporarily unavailable. Please try again later.",
      };
    }

    // Handle other Mailchimp errors
    console.error("Mailchimp API error:", data);
    return {
      ok: false,
      status: 400,
      message: data.detail || "Unable to subscribe. Please check your email and try again.",
    };
  } catch (error) {
    console.error("Failed to connect to Mailchimp:", error);
    return {
      ok: false,
      status: 502,
      message: "Unable to connect to newsletter service. Please try again later.",
    };
  }
}

/**
 * POST /api/newsletter
 * Subscribe a user to the Mailchimp newsletter
 */
export async function POST(req: Request): Promise<NextResponse<NewsletterResponse>> {
  try {
    // Parse request body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { status: "error", message: "Invalid request format" },
        { status: 400 }
      );
    }

    // Validate input
    const validation = validateInput(body);
    if (!validation.ok || !validation.data) {
      return NextResponse.json(
        { status: "error", message: validation.message || "Validation failed" },
        { status: 400 }
      );
    }

    // Subscribe to Mailchimp
    const result = await subscribeToMailchimp(validation.data);

    // Return response
    if (result.ok) {
      return NextResponse.json(
        { status: "success", message: result.message },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { status: "error", message: result.message },
        { status: result.status }
      );
    }
  } catch (error) {
    console.error("Unexpected error in newsletter API:", error);
    return NextResponse.json(
      { status: "error", message: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
