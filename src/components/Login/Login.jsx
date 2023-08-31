import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../../config';
import styles from './Login.module.scss';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    axios
      .post(`${BACKEND_URL}/login`, data)
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
      <form onSubmit={handleSubmit(handleLogin)}>
        <input
          type="text"
          placeholder="Username"
          className={errors.username ? `${styles.input} ${styles.invalid}` : `${styles.input} ${styles.valid}`}
          {...register('username', { required: true, pattern: /^\S+@\S+$/i })}
		  onKeyDown={(e) => {
			if (e.key === 'Enter') {
			  e.preventDefault();
			  handleSubmit(handleLogin)();
			}
		  }}
        />
        {errors.username && (
          <span className={styles.errorMessage}>
            {errors.username.type === 'required' ? 'Email is empty' : 'Invalid email format'}
          </span>
        )}
        <input
          type="password"
          placeholder="Password"
          className={errors.password ? `${styles.input} ${styles.invalid}` : `${styles.input} ${styles.valid}`}
          {...register('password', { required: true, minLength: 5 })}
        />
        {errors.password && (
          <p className={styles.errorMessage}>
            {errors.password.type === 'required'
              ? 'Password is empty'
              : 'Password should be at least 5 characters long'}
          </p>
        )}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

