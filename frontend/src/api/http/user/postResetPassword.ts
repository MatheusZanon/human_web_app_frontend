import { api } from '@/utils/axios';

export async function postResetPassword(new_password: string, token: string) {
    const data = await api
        .post<{ message: string }>(`user/reset-password/?token=${token}`, {
            new_password: new_password,
        })
        .then((res) => res.data);
    return data;
}
