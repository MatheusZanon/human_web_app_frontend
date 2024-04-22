import { api } from '@/utils/axios';
import type { getEconomiaFormal } from '@/utils/types/economia_formal';

export async function getEconomiaFormal(url: string) {
    const response = await api.get<getEconomiaFormal[]>(url);
    return response.data;
}
