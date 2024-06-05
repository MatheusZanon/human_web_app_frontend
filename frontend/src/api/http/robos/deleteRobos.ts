import { api } from '@/utils/axios';
import { Robo } from '@/utils/types/robos/robo';

export async function deleteRobos(id: number) {
    const data = await api.delete<Robo>(`robos/${id}`).then((res) => res.data);
    return data;
}
