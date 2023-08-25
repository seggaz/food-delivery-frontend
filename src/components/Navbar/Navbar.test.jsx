import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

test('displays correct navigation links', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // Check if NavLink components are displayed with correct links
  const shopsNavLink = screen.getByText('Shops');
  expect(shopsNavLink).toBeInTheDocument();
  expect(shopsNavLink.getAttribute('href')).toBe('/shops');

  const cartNavLink = screen.getByText('Shopping Cart');
  expect(cartNavLink).toBeInTheDocument();
  expect(cartNavLink.getAttribute('href')).toBe('/orders');
});

test('adds "active" class to active NavLink', () => {
  // Mock the current path to pretend that we are on the "/shops" page
  const path = '/shops';
  render(
    <MemoryRouter initialEntries={[path]}>
      <Navbar />
    </MemoryRouter>
  );

  // Check if NavLink with path '/shops' has the 'active' class
  const shopsNavLink = screen.getByText('Shops');
  expect(shopsNavLink).toHaveClass('active');

  // Check if NavLink with path '/orders' does not have the 'active' class
  const cartNavLink = screen.getByText('Shopping Cart');
  expect(cartNavLink).not.toHaveClass('active');
});
