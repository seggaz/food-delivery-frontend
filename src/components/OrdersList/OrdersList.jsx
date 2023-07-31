import { useState } from 'react';
import styles from './OrdersList.module.scss';

const OrdersList = () => {
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders')) || []);

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.orderId !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const handleDeleteAllOrders = () => {
	localStorage.setItem('orders', JSON.stringify([]));
	setOrders([]);
  };
  
  return (
    <div className={styles.ordersList}>
      <h2>List of orders:</h2>
      {orders.length === 0 ? (
        <p>There are no saved orders.</p>
      ) : (
        <div>
          <ul>
            {orders.map((order) => (
              <li key={order.orderId}>
                <p>Order ID: <span>{order.orderId}</span></p>
                <p>Email: <span>{order.email}</span></p>
                <p>Phone: <span>{order.phone}</span></p>
                <p>Name: <span>{order.name}</span></p>
                <p>Products:</p>
                <ul className={styles.orderProducts}>
                  {Array.isArray(order.products) ? (
                    order.products.map((product) => (
                      <li key={product.id}>
                        <p>- Product ID: <span>{product.id}</span></p>
                        <p>- Quantity: <span>{product.quantity}</span></p>
                        <p>- Name: <span>{product.name}</span></p>
                      </li>
                    ))
                  ) : (
                    <p>Invalid product data</p>
                  )}
                </ul>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteOrder(order.orderId)}
                >
                  Remove Order
                </button>
              </li>
            ))}
          </ul>
          <button className={styles.deleteButton} onClick={handleDeleteAllOrders}>
            Remove All Orders
          </button>
        </div>
      )}
	  {/* <h3>Total: {getTotalPrice}</h3> */}
    </div>
  );
};

export default OrdersList;

