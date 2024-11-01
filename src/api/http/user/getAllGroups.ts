import { api } from '@/utils/axios';
import { Group } from '@/utils/types/user/group';

export async function getAllGroups() {
    const data = await api.get<Group[]>('groups').then((res) => res.data);
    return data;
}
