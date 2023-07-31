import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ShopsPage from './ShopsPage';
import BACKEND_URL from '../../config';

const mockAxios = new MockAdapter(axios);

const mockShops = [
  {
    id: 1,
    name: 'Shop 1',
    products: [
      { id: 1, name: 'Product 1', image: 'product1.jpg', price: 10 },
      { id: 2, name: 'Product 2', image: 'product2.jpg', price: 20 },
      { id: 3, name: 'Product 3', image: 'product3.jpg', price: 15 },
    ],
  },
  {
    id: 2,
    name: 'Shop 2',
    products: [
      { id: 4, name: 'Product 4', image: 'product4.jpg', price: 25 },
      { id: 5, name: 'Product 5', image: 'product5.jpg', price: 30 },
    ],
  },
];

test('displays list of products in selected shop', async () => {
  mockAxios.onGet(`${BACKEND_URL}/shops`).reply(200, { shops: mockShops });

  render(
    <MemoryRouter>
      <ShopsPage setCartItems={() => {}} />
    </MemoryRouter>
  );

  const shop1 = await screen.findByText('Shop 1');
  expect(shop1).toBeInTheDocument();

  fireEvent.click(shop1);

  // Check if products in the selected shop are displayed
  const product1 = await screen.findByText('Product 1');
  const product2 = await screen.findByText('Product 2');
  const product3 = await screen.findByText('Product 3');

  expect(product1).toBeInTheDocument();
  expect(product2).toBeInTheDocument();
  expect(product3).toBeInTheDocument();
});
