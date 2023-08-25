import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar = ({ authToken, onLogout }) => {
	return (
	  <nav>
		<ul className={styles.navBar}>
		  <li>
			<NavLink to="/shops">Shops</NavLink>
		  </li>
		  <li>
			<NavLink to="/orders">Shopping Cart</NavLink>
		  </li>
		  {!authToken ? (
			<>
			<li>
			  <NavLink to="/login">Login</NavLink>
			</li>
			<li>
			  <NavLink to="/register">Register</NavLink>
			</li>
		  </>
		  ) : (
			<li className={styles.logoutButton}>
			  <button onClick={onLogout}>Logout</button>
			</li>
		  )}
		</ul>
	  </nav>
	);
  };
  
  export default Navbar;