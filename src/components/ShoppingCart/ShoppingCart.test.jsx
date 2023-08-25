import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ShoppingCart from './ShoppingCart';

test('renders ShoppingCart component without errors', () => {
  render(
    <MemoryRouter>
       <ShoppingCart cartItems={[]} setCartItems={() => {}} />
    </MemoryRouter>,
  );
});

test('renders "Your cart is empty." message when cart is empty', () => {
	render(
	  <MemoryRouter>
		<ShoppingCart cartItems={[]} setCartItems={() => {}} />
	  </MemoryRouter>,
	);
  
	const emptyCartMessage = screen.getByText(/Your cart is empty./i);
	expect(emptyCartMessage).toBeInTheDocument();
  });
