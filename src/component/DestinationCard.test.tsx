import { describe, expect, it } from 'vitest';
import DestinationCard from './DestinationCardComponent';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectedWeatherData from '../schemas/SelectedWeatherData';
import { MemoryRouter } from 'react-router-dom';
import notFavourite from './../assets/star1.svg';
import favourite from './../assets/star2.svg';
import { addFavourite, removeFavourite, isFavourite } from '../utils/favourite';
import renderer from 'react-test-renderer';

interface MockDestinationCardProps extends SelectedWeatherData {
  isLocalStorageFavourite: boolean;
}

const mockData: MockDestinationCardProps = {
  destination: 'Åre',
  temperature: -3.7,
  windSpeed: 12.1,
  symbolCode: 'heavyrainandthunder',
  isLocalStorageFavourite: false,
};

describe('DestinationCard', () => {
  it('Destination image is visible', () => {
    renderCard();
    const img = screen.getByRole('img', { name: 'Åre' });
    expect(img).toBeVisible();
  });

  it('Favourite star changes when clicked', () => {
    renderCard();

    /* Check correct initial state (not favourite) */
    const star = screen.getByRole('img', { name: 'Favourite star' });
    expect(!isFavourite('Åre'));
    expect(star).toHaveAttribute('src', notFavourite);

    /* Click star and check for state change */
    fireEvent.click(star);
    addFavourite('Åre');
    expect(isFavourite('Åre'));
    expect(star).toHaveAttribute('src', favourite);

    /* Click star again to check state change back */
    fireEvent.click(star);
    removeFavourite('Åre');
    expect(!isFavourite('Åre'));
    expect(star).toHaveAttribute('src', notFavourite);
  });

  it('DestinationCard snapshot', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <DestinationCard
            destination={mockData.destination}
            temperature={mockData.temperature}
            windSpeed={mockData.windSpeed}
            symbolCode={mockData.symbolCode}
            isLocalStorageFavourite={mockData.isLocalStorageFavourite}
          />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

/* Renders a destination card with mock data */
function renderCard() {
  render(
    <MemoryRouter>
      <DestinationCard
        destination={mockData.destination}
        temperature={mockData.temperature}
        windSpeed={mockData.windSpeed}
        symbolCode={mockData.symbolCode}
        isLocalStorageFavourite={mockData.isLocalStorageFavourite}
      />
    </MemoryRouter>
  );
}
