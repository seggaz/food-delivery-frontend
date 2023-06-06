
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav>
      <ul className={styles.navBar}>
        <li>
          <NavLink to="/shops">Shops</NavLink>
        </li>
        <li>
          <NavLink to="/order">Shopping Cart</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;