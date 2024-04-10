import { api } from '@/utils/axios';
import { User } from '@/utils/types/user';

export async function putActivateUser({ userId, data }: { userId: number; data: { id: number[] } }) {
    const token = localStorage.getItem('accessToken');
    const res = await api.put<User>(`funcionarios/${userId}/activate/`, data, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data);
    return res;
}
