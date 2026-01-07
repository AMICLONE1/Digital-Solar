/**
 * Razorpay Payment Integration
 */

export interface RazorpayConfig {
  keyId: string;
  keySecret: string;
}

export interface CreateOrderParams {
  amount: number; // in paise
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

class RazorpayClient {
  private config: RazorpayConfig;
  private baseUrl = "https://api.razorpay.com/v1";

  constructor(config: RazorpayConfig) {
    this.config = config;
  }

  /**
   * Create a Razorpay order
   */
  async createOrder(params: CreateOrderParams): Promise<RazorpayOrder> {
    const response = await fetch(`${this.baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${this.config.keyId}:${this.config.keySecret}`).toString("base64")}`,
      },
      body: JSON.stringify({
        amount: params.amount,
        currency: params.currency || "INR",
        receipt: params.receipt,
        notes: params.notes,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Razorpay API error: ${error.error?.description || response.statusText}`);
    }

    return response.json();
  }

  /**
   * Verify payment signature
   */
  verifySignature(
    orderId: string,
    paymentId: string,
    signature: string
  ): boolean {
    const crypto = require("crypto");
    const text = `${orderId}|${paymentId}`;
    const generatedSignature = crypto
      .createHmac("sha256", this.config.keySecret)
      .update(text)
      .digest("hex");

    return generatedSignature === signature;
  }

  /**
   * Fetch payment details
   */
  async getPayment(paymentId: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/payments/${paymentId}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${this.config.keyId}:${this.config.keySecret}`).toString("base64")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch payment: ${response.statusText}`);
    }

    return response.json();
  }
}

// Singleton instance
let razorpayClient: RazorpayClient | null = null;

export function getRazorpayClient(): RazorpayClient {
  if (!razorpayClient) {
    razorpayClient = new RazorpayClient({
      keyId: process.env.RAZORPAY_KEY_ID || "",
      keySecret: process.env.RAZORPAY_KEY_SECRET || "",
    });
  }
  return razorpayClient;
}

