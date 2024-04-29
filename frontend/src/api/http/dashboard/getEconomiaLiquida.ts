import { api } from '@/utils/axios';
import type { getEconomiaLiquida } from '@/utils/types/economia_liquida';

export async function getEconomiaLiquida(url: string) {
    const response = await api.get<getEconomiaLiquida[]>(url);
    return response.data;
}
