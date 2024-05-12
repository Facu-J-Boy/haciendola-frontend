import axios, { AxiosRequestConfig } from 'axios';
const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:3001', // URL base para todas las solicitudes
};

export const axiosInstance = axios.create(axiosRequestConfig);
