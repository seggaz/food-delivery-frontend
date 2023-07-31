const BACKEND_URL =
  process.env.NODE_ENV === 'production' ? 'https://food-delivery.com/api' : 'http://localhost:3001';

export default BACKEND_URL;
