import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import DestinationCard from "../features/DestinationCard/DestinationCard";

describe("DestinationCard", async () => {
  beforeEach(() => {
    const destinationPoint = { destination: "Åre", pointIndex: 0 };
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <DestinationCard
            destinationPoint={destinationPoint}
            isLocalStorageFavourite={false}
          />
        </Router>
      </QueryClientProvider>,
    );
  });

  it("Destination image is visible", async () => {
    await waitFor(() => {
      const img = screen.getByRole("img", { name: "Åre" });
      expect(img).toBeVisible();
    });
  });
});
