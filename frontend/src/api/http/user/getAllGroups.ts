import { api } from '@/utils/axios';
import { Group } from '@/utils/types/group';

export async function getAllGroups() {
    const data = await api.get<Group[]>('groups').then((res) => res.data);
    return data;
}
