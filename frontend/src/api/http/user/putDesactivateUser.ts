import { api } from '@/utils/axios';
import { User } from '@/utils/types/user';

export async function putDeactivateUser({ userId }: { userId: number}) {
    const token = localStorage.getItem('accessToken');
    const res = await api.put<User>(`funcionarios/${userId}/deactivate/`, null, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data);
    return res;
}
