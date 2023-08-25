import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../../config';
import styles from './Login.module.scss';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post(`${BACKEND_URL}/login`, { username, password })
      .then((response) => {
        const authToken = response.data.token;
        onLogin(authToken);
        navigate('/shops');
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
