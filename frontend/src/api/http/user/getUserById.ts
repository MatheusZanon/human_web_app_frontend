import { api } from '@/utils/axios';
import { User } from '@/utils/types/user';

export async function getUserById({ userId }: { userId: number }) {
    const token = localStorage.getItem('accessToken');
    const data = await api.get<User>(`funcionarios/${userId}`, {headers: {Authorization: `Bearer ${token}`}}).then((res) => res.data);
    return data;
}
