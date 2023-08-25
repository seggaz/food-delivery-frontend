import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../../config';
import styles from './Register.module.scss';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    axios
      .post(`${BACKEND_URL}/register`, { username, password })
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Registration error:', error);
      });
  };

  return (
    <div className={styles.registerContainer}>
      <h2>Register</h2>
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
