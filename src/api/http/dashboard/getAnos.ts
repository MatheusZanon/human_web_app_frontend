import { api } from '@/utils/axios';

interface Ano {
  ano: number;
}

export async function getAnos() {
    const response = await api.get<Ano[]>('dashboard/anos');
    return response.data;
}
