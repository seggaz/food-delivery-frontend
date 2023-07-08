import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../../config';
import axios from 'axios';
import styles from './ShopsPage.module.scss';
import SkeletonLoader from './SkeletonLoader';
import Spinner from './Spinner';

const ShopsPage = ({ setCartItems }) => {
  const navigate = useNavigate();
  const [selectedShop, setSelectedShop] = useState(null);
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedProducts, setDisplayedProducts] = useState(4);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/shops`)
      .then((response) => {
        setShops(response.data.shops);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching shops:', error);
      });
  }, []);

  const handleShopClick = (shop) => {
    setSelectedShop(shop);
  };

  const handleAddToCart = (product) => {
    const newCartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
    };

    setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
    navigate('/orders');
  };

  const skeleton = [...Array(4)].map((_, index) => <SkeletonLoader key={index} />);

  const handleShowMore = () => {
    setDisplayedProducts((prevCount) => prevCount + 4);
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
        {isLoading ? (
          <div className={styles.skeletonContainer}>
            {skeleton}
          </div>
        ) : selectedShop ? (
          <>
            <h2>Products in {selectedShop.name}</h2>
            <div className={styles.productCards}>
              {selectedShop.products.slice(0, displayedProducts).map((product) => (
                <div className={styles.productCard} key={product.id}>
                  <img src={product.image} alt={product.name} />
                  <h4>{product.name}</h4>
                  <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
              ))}
            </div>
            {selectedShop.products.length > displayedProducts && (
              <button className={styles.showMoreButton} onClick={handleShowMore}>
                Show More
              </button>
            )}
          </>
        ) : (
          <div className={styles.selectPage}>
            <p>Please select a shop.</p>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopsPage;

