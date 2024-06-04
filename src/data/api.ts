import { getCookie } from '@auth/cookie';
import axios, { AxiosError } from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_HOST}`
});

api.interceptors.request.use(
    (config) => {
        const authToken = getCookie('site');
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default api;