import { api } from '@/utils/axios';
import { User } from '@/utils/types/user';

export async function patchUser({ userId, data }: { userId: number; data: Partial<User> }) {
    const res = await api.patch<User>(`funcionarios/${userId}/`, data).then((res) => res.data);
    return res;
}
