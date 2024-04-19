import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true
});


/*
api.interceptors.response.use(response => response, async error => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const { data } = await api.post('/refresh_token', {
        refreshToken: localStorage.getItem('refreshToken')
      });
      localStorage.setItem('accessToken', data.accessToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
});
*/
