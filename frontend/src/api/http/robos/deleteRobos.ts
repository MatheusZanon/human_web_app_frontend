import { api } from '@/utils/axios';
import { Robo } from '@/utils/types/robo';

export async function deleteRobos(id: number) {
    const token = localStorage.getItem('accessToken');
    const data = await api.delete<Robo>(`robos/${id}`, {headers: {Authorization: `Bearer ${token}`}}).then((res) => res.data);
    return data;
}
