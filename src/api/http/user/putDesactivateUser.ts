import { api } from '@/utils/axios';
import { User } from '@/utils/types/user/user';

export async function putDeactivateUser({ userId }: { userId: number}) {
    const res = await api.put<User>(`funcionarios/${userId}/deactivate/`).then((res) => res.data);
    return res;
}
