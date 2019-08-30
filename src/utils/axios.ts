import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/',
});

const requestHandler = (request: AxiosRequestConfig) => {
  // Modify request here

  return request;
};

const requestErrorHandler = (error: Error) => {
  // Handle request errors

  return Promise.reject({ ...error });
};

axiosInstance.interceptors.request.use(
  request => requestHandler(request),
  error => requestErrorHandler(error)
);

const responseErrorHandler = (error: Error) => {
  // Handle errors

  // if 401, log the user out

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
