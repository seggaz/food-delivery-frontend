import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './ShopsPage.module.scss';

const ShopsPage = ({ setCartItems }) => {
  const navigate = useNavigate();
  const [selectedShop, setSelectedShop] = useState(null);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/shops')
      .then(response => {
        setShops(response.data.shops);
      })
      .catch(error => {
        console.error('Error fetching shops:', error);
      });
  }, []);

  const handleShopClick = (shop) => {
    setSelectedShop(shop);
  };

  const handleAddToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
    navigate('/order');
  };

  return (
    <div className={styles.shopsPage}>
      <div className={styles.shopList}>
        <h2>Shops:</h2>
        <ul>
          {shops.map((shop) => (
            <li
              key={shop.id}
              onClick={() => handleShopClick(shop)}
              className={selectedShop && selectedShop.id === shop.id ? styles.active : ''}
            >
              {shop.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.productList}>
        {selectedShop && (
          <>
            <h2>Products in {selectedShop.name}</h2>
            <div className={styles.productCards}>
              {selectedShop.products.map((product) => (
                <div className={styles.productCard} key={product.id}>
                  <img src={product.image} alt={product.name} />
                  <h4>{product.name}</h4>
                  <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShopsPage;

