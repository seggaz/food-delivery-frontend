import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import styles from './App.module.scss';
import ShopsPage from './components/ShopsPage/ShopsPage';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Navbar from './components/Navbar/Navbar';
import OrdersList from './components/OrdersList/OrdersList';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  const handleLogin = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
  };

  const handleLogout = () => {
    setAuthToken('');
    localStorage.removeItem('authToken');
    setCartItems([]);
  };

  return (
    <div className={styles.App}>
      <Navbar authToken={authToken} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Navigate to="/shops" />} />
        <Route 
          path="/shops" 
          element={<ShopsPage 
            setCartItems={setCartItems}
            authToken={authToken} />} />
        <Route
          path="/orders"
          element={<ShoppingCart 
            cartItems={cartItems}
            setCartItems={setCartItems}
            authToken={authToken}
          />}
        />
        <Route 
          path="/orders/list" 
          element={<OrdersList 
            authToken={authToken}
          />}
        />
        <Route 
          path="/login" 
          element={<Login 
            onLogin={handleLogin}
          />}
        />
		<Route
          path="/register" 
          element={<Register />}
        />
      </Routes>
    </div>
  );
}

export default App;
