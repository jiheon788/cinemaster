import axios from 'axios';

const host = process.env.REACT_APP_SERVER_URL;

export const apiClient = axios.create({
  baseURL: host,
});