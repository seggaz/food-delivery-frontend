import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../../config';
import styles from './Register.module.scss';
import axios from 'axios';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleRegister = (data) => {
    axios
      .post(`${BACKEND_URL}/register`, data)
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
      <form onSubmit={handleSubmit(handleRegister)}>
        <input
          type="text"
          placeholder="Username"
          className={errors.username ? `${styles.input} ${styles.invalid}` : `${styles.input} ${styles.valid}`}
          {...register('username', { required: true, pattern: /^\S+@\S+$/i })}
		  onKeyDown={(e) => {
			if (e.key === 'Enter') {
			  e.preventDefault();
			  handleSubmit(handleRegister)();
			}
		  }}
        />
        {errors.username && (
          <span className={styles.errorMessage}>
            {errors.username.type === 'required' ? 'Username is empty' : 'Invalid email format'}
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
              ? 'Password is emty'
              : 'Password should be at least 5 characters long'}
          </p>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
