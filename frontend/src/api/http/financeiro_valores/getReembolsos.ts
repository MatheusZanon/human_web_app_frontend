import { api } from '@/utils/axios';
import { FinanceiroReembolsos } from '@/utils/types/financeiro_reembolsos';

export async function getReembolsos() {
    const token = localStorage.getItem('accessToken');
    const data = await api.get<FinanceiroReembolsos[]>('financeiro_valores/reembolsos', {headers: {Authorization: `Bearer ${token}`}}).then((res) => res.data);
    return data;
}