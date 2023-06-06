import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import ShopsPage from './components/ShopsPage/ShopsPage';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Navbar from './components/Navbar/Navbar';
import { useState } from 'react';


function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className={styles.App}>
      <Navbar />
      <Routes>
        <Route 
			path="/shops" 
			element={<ShopsPage 
					setCartItems={setCartItems} />} />
        <Route
          path="/order"
          element={<ShoppingCart 
					cartItems={cartItems} 
					setCartItems={setCartItems} />}
        />
      </Routes>
    </div>
  );
}

export default App;
