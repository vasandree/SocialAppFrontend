import axios from 'axios';

import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/utils/helpers';
import { postRefreshToken } from '@/utils/api/requests';

const BASE_URL = 'http://localhost:5132/api/social_app';

const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

apiInstance.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(apiInstance(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const tokens = { accessToken: getAccessToken(), refreshToken: getRefreshToken() };

        if (tokens.accessToken && tokens.refreshToken) {
          const newTokens = await postRefreshToken({
            params: {
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken,
            },
          });
          setAccessToken(newTokens.accessToken);
          setRefreshToken(newTokens.refreshToken);
          apiInstance.defaults.headers.common['Authorization'] = `Bearer ${newTokens.accessToken}`;

          onRefreshed(newTokens.accessToken);

          originalRequest.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;
          return apiInstance(originalRequest);
        }
      } catch (refreshError) {
        removeAccessToken();
        removeRefreshToken();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export { apiInstance };
