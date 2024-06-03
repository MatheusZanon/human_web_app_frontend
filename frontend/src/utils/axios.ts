import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    //baseURL: 'http://192.168.2.131:8000/api/',
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const renewResponse = await api.post('session/renew/');
                if (renewResponse.status === 200) {
                    return axios(originalRequest);
                } else {
                    // Se a renovação falhar, não tente novamente e lance um erro
                    return Promise.reject('Token de refresh expirado - usuário precisa relogar');
                }
            } catch (renewError: any) {
                if (renewError.response && (renewError.response.status === 401 || renewError.response.status === 404)) {
                    // A renovação falhou e não pode ser recuperada, rejeite explicitamente com uma mensagem
                    return Promise.reject('Token de refresh expirado - usuário precisa relogar');
                }
            }
        }
        return Promise.reject(error);
    },
);

export default api;
