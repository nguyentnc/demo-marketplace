import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://marketplace-server-udpw.onrender.com/mk/',
});
