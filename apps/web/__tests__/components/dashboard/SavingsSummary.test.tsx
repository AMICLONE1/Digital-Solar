import { render, screen, waitFor } from "@testing-library/react";
import SavingsSummary from "@/components/dashboard/SavingsSummary";

// Mock fetch
global.fetch = jest.fn();

describe("SavingsSummary", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("should render loading state", () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {})); // Never resolves
    render(<SavingsSummary />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should display savings data", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        currentMonthCredits: 5000,
        lifetimeSavings: 50000,
        totalSavings: 45000,
      }),
    });

    render(<SavingsSummary />);

    await waitFor(() => {
      expect(screen.getByText(/5,000/)).toBeInTheDocument();
      expect(screen.getByText(/50,000/)).toBeInTheDocument();
    });
  });
});

