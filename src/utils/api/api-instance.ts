import axios from 'axios';

import { getAccessToken } from '@/utils/helpers';
const BASE_URL = "https://localhost:7278/social_app";

const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiInstance.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export { apiInstance };
