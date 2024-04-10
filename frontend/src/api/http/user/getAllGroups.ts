import { api } from '@/utils/axios';
import { Group } from '@/utils/types/group';

export async function getAllGroups() {
    const token = localStorage.getItem('accessToken');
    const data = await api.get<Group[]>('groups', {headers: {Authorization: `Bearer ${token}`}}).then((res) => res.data);
    return data;
}
