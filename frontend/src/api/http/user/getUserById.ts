import { api } from '@/utils/axios';
import { User } from '@/utils/types/user';

export async function getUserById({ userId }: { userId: number }) {
    const data = await api.get<User>(`funcionarios/${userId}`).then((res) => res.data);
    return data;
}