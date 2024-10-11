import { UserController } from '@/database';
import axios from 'axios';

const baseURL = process.env.EXPO_PUBLIC_SERVER_URL;

export const instance = axios.create({
  baseURL: `${baseURL}/api/v1`,
});

instance.interceptors.request.use(async (config) => {
  const user = await UserController.getUser();

  if (!user) {
    return config;
  }

  config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});
