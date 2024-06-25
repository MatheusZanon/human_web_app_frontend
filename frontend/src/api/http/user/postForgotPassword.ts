import { api } from '@/utils/axios';

export async function postForgotPassword(email: string) {
    const data = await api
        .post<{ message: string }>('user/forgot-password/', {
            email: email,
        })
        .then((res) => res.data);
    return data;
}
