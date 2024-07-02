import { api } from '@/utils/axios';
import { User } from '@/utils/types/user/user';

export async function putActivateUser({ userId, data }: { userId: number; data: { id: number[] } }) {
    const res = await api.put<User>(`funcionarios/${userId}/activate/`, data).then((res) => res.data);
    return res;
}
