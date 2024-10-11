import axios from 'axios';

const baseURL = process.env.EXPO_PUBLIC_SERVER_URL;

export const instance = axios.create({
  baseURL: `${baseURL}/api/v1`,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    return Promise.reject(error);
  }
);
