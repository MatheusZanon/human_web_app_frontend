import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
    baseURL: API_BASE_URL,
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
            } catch (renewError) {
                if (renewError instanceof AxiosError) {
                    if (
                        renewError.response &&
                        (renewError.response.status === 401 || renewError.response.status === 404)
                    ) {
                        // A renovação falhou e não pode ser recuperada, rejeite explicitamente com uma mensagem
                        return Promise.reject('Token de refresh expirado - usuário precisa relogar');
                    }
                }

                return Promise.reject(renewError);
            }
        }
        return Promise.reject(error);
    },
);

export default api;
