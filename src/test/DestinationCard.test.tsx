import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import DestinationCard from "../features/DestinationCard/DestinationCard";
import notFavourite from "../assets/destinationCard/star1.svg";
import favourite from "../assets/destinationCard/star2.svg";
import { isFavourite } from "../utils/favourite";

describe("DestinationCard", async () => {
  beforeEach(() => {
    // Render DestinationCard of Åre with necessary providers
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

  it("Favorite button is working", async () => {
    await waitFor(() => {
      const star = screen.getByRole("img", { name: "Favourite star" });
      const button = screen.getByRole("button", { name: "Toggle Favourite" });

      // Card is supposed to be not favourite
      expect(star).toHaveAttribute("src", notFavourite);
      expect(isFavourite("Åre")).toBe(false);
      fireEvent.click(star);

      // Card is supposed to be favourite after click
      expect(star).toHaveAttribute("src", favourite);
      expect(isFavourite("Åre")).toBe(true);
      // Try using Enter key instead of mouse click
      fireEvent.keyDown(button, { key: "Enter", code: "Enter" })

      // Card is supposed to be not favourite again after second click
      expect(star).toHaveAttribute("src", notFavourite);
      expect(isFavourite("Åre")).toBe(false);

      // Try using Space key instead of mouse click
      fireEvent.keyDown(button, { key: "Space", code: "Space" })
      expect(star).toHaveAttribute("src", favourite);
      expect(isFavourite("Åre")).toBe(true);
    });
  });
});
