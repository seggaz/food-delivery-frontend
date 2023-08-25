import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import OrdersList from './OrdersList';

describe('OrdersList', () => {
  test('removes order after calling the function handleDeleteOrder', () => {
    // Create test data for orders
    const testOrders = [
      { orderId: 'order123', email: 'test1@example.com', phone: '123456789', name: 'Test User 1', products: [] },
      { orderId: 'order456', email: 'test2@example.com', phone: '987654321', name: 'Test User 2', products: [] },
    ];

    // Installing test data in localStorage
    localStorage.setItem('orders', JSON.stringify(testOrders));

    render(<OrdersList />);

	// Find button "Remove Order" for first order and click on it
    const removeButton = screen.getAllByText('Remove Order')[0];
    fireEvent.click(removeButton);

	//Checking order succesfully removed in state component and localeStorage
    const updatedOrders = testOrders.filter(order => order.orderId !== 'order123');
    const ordersInStorage = JSON.parse(localStorage.getItem('orders'));
    expect(ordersInStorage).toEqual(updatedOrders);
  });

  test('removes order after calling the function handleDeleteAllOrders', () => {
	//Create text data for order
    const testOrders = [
      { orderId: 'order123', email: 'test1@example.com', phone: '123456789', name: 'Test User 1', products: [] },
      { orderId: 'order456', email: 'test2@example.com', phone: '987654321', name: 'Test User 2', products: [] },
    ];

     // Installing test data in localStorage
    localStorage.setItem('orders', JSON.stringify(testOrders));

    render(<OrdersList />);

    // Find button "Remove All Orders" for first order and click on it
    const removeAllButton = screen.getByText('Remove All Orders');
    fireEvent.click(removeAllButton);

    //Checking order succesfully removed in state component and localeStorage
    const ordersInStorage = JSON.parse(localStorage.getItem('orders'));
    expect(ordersInStorage).toEqual([]);
  });
});

