/**
 * BBPS (Bharat Bill Payment System) API Client
 * Abstraction layer for bill fetching
 */

export interface BBPSBill {
  billNumber: string;
  consumerNumber: string;
  amount: number;
  dueDate: string;
  discom: string;
  billDetails?: {
    units: number;
    period: string;
    [key: string]: any;
  };
}

export interface BBPSConfig {
  apiKey: string;
  apiSecret: string;
  baseUrl: string;
  retryAttempts?: number;
  retryDelay?: number;
}

class BBPSClient {
  private config: Required<BBPSConfig>;
  private cache: Map<string, { bill: BBPSBill; expiresAt: number }> = new Map();
  private cacheTTL = 5 * 60 * 1000; // 5 minutes

  constructor(config: BBPSConfig) {
    this.config = {
      ...config,
      retryAttempts: config.retryAttempts || 3,
      retryDelay: config.retryDelay || 1000,
    };
  }

  /**
   * Fetch bill from BBPS
   */
  async fetchBill(
    consumerNumber: string,
    discom: string
  ): Promise<BBPSBill> {
    // Check cache first
    const cacheKey = `${consumerNumber}-${discom}`;
    const cached = this.cache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.bill;
    }

    // Retry logic
    let lastError: Error | null = null;
    for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
      try {
        const bill = await this._fetchBillFromAPI(consumerNumber, discom);

        // Cache the result
        this.cache.set(cacheKey, {
          bill,
          expiresAt: Date.now() + this.cacheTTL,
        });

        return bill;
      } catch (error) {
        lastError = error as Error;
        if (attempt < this.config.retryAttempts) {
          await this._delay(this.config.retryDelay * attempt);
        }
      }
    }

    throw lastError || new Error("Failed to fetch bill after retries");
  }

  /**
   * Internal method to fetch bill from BBPS API
   * TODO: Replace with actual BBPS API integration
   */
  private async _fetchBillFromAPI(
    consumerNumber: string,
    discom: string
  ): Promise<BBPSBill> {
    // Placeholder implementation
    // In production, this would call the actual BBPS API
    // Example: https://api.bbps.com/v1/bills/fetch

    const response = await fetch(`${this.config.baseUrl}/bills/fetch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        consumerNumber,
        discom,
      }),
    });

    if (!response.ok) {
      throw new Error(`BBPS API error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      billNumber: data.billNumber,
      consumerNumber: data.consumerNumber,
      amount: parseFloat(data.amount),
      dueDate: data.dueDate,
      discom: data.discom,
      billDetails: data.billDetails,
    };
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  private _delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Singleton instance
let bbpsClient: BBPSClient | null = null;

export function getBBPSClient(): BBPSClient {
  if (!bbpsClient) {
    bbpsClient = new BBPSClient({
      apiKey: process.env.BBPS_API_KEY || "",
      apiSecret: process.env.BBPS_API_SECRET || "",
      baseUrl: process.env.BBPS_BASE_URL || "https://api.bbps.com/v1",
      retryAttempts: 3,
      retryDelay: 1000,
    });
  }
  return bbpsClient;
}

