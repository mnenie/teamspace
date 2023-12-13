import axios from 'axios'

export const URL : string = 'http://95.163.228.52:8080/api';
export const API: string = URL + '/api';

const $api = axios.create({
  withCredentials:true,
  baseURL: URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
});

export default $api;