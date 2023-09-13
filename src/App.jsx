import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import styles from './App.module.scss';
import ShopsPage from './components/ShopsPage/ShopsPage';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Navbar from './components/Navbar/Navbar';
import OrdersList from './components/OrdersList/OrdersList';


function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className={styles.App}>
      <Navbar />
      <Routes>
	  <Route path="/" element={<Navigate to="/shops" />} />
        <Route 
			path="/shops" 
			element={<ShopsPage 
					setCartItems={setCartItems} />} />
        <Route
          path="/orders"
          element={<ShoppingCart 
					cartItems={cartItems}
					setCartItems={setCartItems}
					 />}
        />
		 <Route 
		 	path="/orders/list" 
			element={<OrdersList />}/>
      </Routes>
    </div>
  );
}

export default App;
