import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // Set the API URL in your .env file
  withCredentials: true,
});

export default axiosInstance;
