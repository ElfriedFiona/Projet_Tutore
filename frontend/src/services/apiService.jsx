// src/services/apiService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

  export const createLoan = async (ouvrageId) => {
  const res = await axios.post('/emprunts', {
    ouvrages_id: ouvrageId
  });

  return res.data;
};

export default api;
