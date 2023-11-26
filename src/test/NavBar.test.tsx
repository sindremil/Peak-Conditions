import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../features/Navbar.tsx/NavBar';
import peakConditionsLogo from '../assets/peakConditionsLogo.svg';

describe('Navbar', () => {
  beforeEach(() => {
    render(
    <Router>
      <Navbar />;
    </Router>
    );
  });

  it('Logo is visible', async () => {
    await waitFor(() => {
      const logo = screen.getByRole('img', { name: 'Logo' });
      expect(logo).toBeVisible();
      expect(logo).toHaveAttribute('src', peakConditionsLogo);
    });
  });

  it('Navbar snapshot', () => {
    expect(screen).toMatchSnapshot();
  });
});