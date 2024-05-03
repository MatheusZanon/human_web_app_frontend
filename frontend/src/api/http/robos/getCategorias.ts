import { api } from '@/utils/axios';

export async function getCategorias() {
    const data = await api.get<string[]>('robos/categorias/').then((res) => res.data);
    return data;
}
