import { useState } from 'react';
import axios from 'axios';
import styles from './ShoppingCart.module.scss';
import BACKEND_URL from '../../config';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = ({ cartItems, setCartItems }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderedProducts, setOrderedProducts] = useState([]);

  const navigate = useNavigate();

  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: quantity !== undefined ? parseInt(quantity) : 0 };
        }
        return item;
      }),
    );
  };

  const handleCheckout = () => {
    const orderedProducts = cartItems.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity,
        name: item.name,
      };
    });

    const orderData = {
      email: customerEmail,
      phone: customerPhone,
      name: customerName,
      orders_products: orderedProducts,
    };

    axios
      .post(`${BACKEND_URL}/orders`, orderData)
      .then((response) => {
		const orderId = response.data.orderId;
		console.log('Order placed successfully');
		setCartItems([]);
		setCustomerEmail('');
		setCustomerPhone('');
		setCustomerName('');
		setOrderedProducts(orderedProducts);
	  
		const orders = JSON.parse(localStorage.getItem('orders')) || [];
		const newOrder = {
		  orderId: orderId,
		  email: customerEmail,
		  phone: customerPhone,
		  name: customerName,
		  products: orderedProducts,
		};
		orders.push(newOrder);
		localStorage.setItem('orders', JSON.stringify(orders));
	  
		// Відображення інформації замовлення
		const orderInfo = `Email: ${customerEmail}\nPhone: ${customerPhone}\nName: ${customerName}\nOrder ID: ${orderId}\nTotal Price: ${getTotalPrice()}`;
		const productInfo = orderedProducts.map((product) => {
		  return `Product ID: ${product.id}\nQuantity: ${product.quantity}\nName: ${product.name}`;
		}).join('\n\n');
	  
		alert(`Order placed successfully!\n\n${orderInfo}\n\n${productInfo}`);
		navigate('/orders/list');
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
          <p>Email:</p>
          <input
            type="email"
            placeholder="Email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
          />
        </div>
        <div>
          <p>Phone:</p>
          <input
            type="text"
            placeholder="Phone"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
          />
        </div>
        <div>
          <p>Name:</p>
          <input
            type="text"
            placeholder="Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
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