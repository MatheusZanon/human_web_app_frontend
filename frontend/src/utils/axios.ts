import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true
});



const refreshAccessToken = async () => {
  try {
    const response = await api.post('token/refresh/', {}, { withCredentials: true });
    if (response.status === 200) {
      return response.data.access;
    } else {
      console.error('Error refreshing access token:', response.data);
    }
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
};


/*
// Interceptor para lidar com tokens expirados
api.interceptors.response.use(
  response => response, // Se não houver erro, apenas retorne a resposta
  async error => {
    const originalRequest = error.config;

    // Verifica se o token expirou e a tentativa de renovação ainda não foi feita
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Marca que uma tentativa de renovação foi feita

      const tokenRefreshed = await refreshAccessToken();
      if (tokenRefreshed) {
        // O cookie já foi atualizado, reenvia a requisição original
        return api(originalRequest);
      }
    }

    // Se a renovação do token falhar, rejeita a promessa com o erro original
    return Promise.reject(error);
  }
);
*/
