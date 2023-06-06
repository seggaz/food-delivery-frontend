import { useState } from 'react';
import axios from 'axios';
import styles from './ShoppingCart.module.scss';

const ShoppingCart = ({ cartItems, setCartItems }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const handleCheckout = () => {
    const orderedProducts = cartItems.map((item) => item.id);

    const orderData = {
      email: customerEmail,
      phone: customerPhone,
      name: customerName,
      ordered_products: orderedProducts,
    };

    axios.post('/order', orderData)
      .then((response) => {
        console.log('Order placed successfully');
        setCartItems([]);
        setCustomerName('');
        setCustomerEmail('');
        setCustomerPhone('');
      })
      .catch((error) => {
        console.error('Error placing order:', error);
      });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
  };

  return (
    <div className={styles.shoppingCart}>
      <div className={styles.customerDetails}>
        <h2>Customer Details</h2>
        <div>
          <p>Name:</p>
          <input type="text" placeholder="Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        </div>
        <div>
          <p>Email:</p>
          <input type="email" placeholder="Email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
        </div>
        <div>
          <p>Phone:</p>
          <input type="text" placeholder="Phone" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
        </div>
      </div>
      <div className={styles.cartProducts}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div className={styles.cartProduct} key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className={styles.productName}>
                  <h3>{item.name}</h3>
                  <p>Price: {item.price}</p>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                  />
                  <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
            <div className={styles.totalPrice}>
              <h3>Total Price: {getTotalPrice()}</h3>
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
