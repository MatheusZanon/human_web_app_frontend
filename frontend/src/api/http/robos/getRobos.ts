import { api } from '@/utils/axios';
import { Robo } from '@/utils/types/robos/robo';

export async function getRobos(categoria?: string) {
    const data = await api.get<Robo[]>('robos', { params: { categoria } }).then((res) => res.data);
    return data;
}
