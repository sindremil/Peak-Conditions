import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import NewForecastList from "../features/NewForecastList/NewForecastList";

describe("NewForecastList", () => {
  // Render component before each test
  beforeEach(() => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <NewForecastList destination="Åre" pointIndex={0} />
        </Router>
      </QueryClientProvider>,
    );
  });

  // Test header fields
  it("Header fields are visible", () => {
    expect(screen.getByText("Tidspunkt")).toBeVisible();
    expect(screen.getByText("Vær")).toBeVisible();
    expect(screen.getByText("Cº")).toBeVisible();
    expect(screen.getByText("Nedbør")).toBeVisible();
    expect(screen.getByText("Vind")).toBeVisible();
  });

  // Test that expected date and time is visible (will be static since data is mocked)
  it("Times of day are visible", async () => {
    await waitFor(() => {
      expect(screen.getByText("man. 01:00")).toBeVisible();
    });
  });

  it("NewForecastList snapshot", () => {
    expect(screen).toMatchSnapshot();
  });
});
