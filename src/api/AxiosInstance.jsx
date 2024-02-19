import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'https://jin-myserver.shop',
});

export default AxiosInstance;
