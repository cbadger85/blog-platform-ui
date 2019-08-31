import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { history } from './history';

export const axiosInstance = axios.create({
  withCredentials: true,
});

const requestHandler = (request: AxiosRequestConfig) => {
  // Modify request here

  return request;
};

const requestErrorHandler = (error: AxiosError) => {
  // Handle request errors

  return Promise.reject({ ...error });
};

axiosInstance.interceptors.request.use(
  request => requestHandler(request),
  error => requestErrorHandler(error)
);

const responseErrorHandler = (error: AxiosError) => {
  if (error.response!.status === 401) {
    history.push('/login');
  }

  return Promise.reject({ ...error });
};

const successHandler = (response: AxiosResponse) => {
  // Handle responses

  return response;
};

axiosInstance.interceptors.response.use(
  response => successHandler(response),
  error => responseErrorHandler(error)
);
