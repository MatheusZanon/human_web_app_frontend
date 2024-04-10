import { api } from '@/utils/axios';
import { FinanceiroValores } from '@/utils/types/financeiro_valores';

export async function getFinanceiroValores() {
    const token = localStorage.getItem('accessToken');
    const data = await api.get<FinanceiroValores[]>('financeiro_valores', {headers: {Authorization: `Bearer ${token}`}}).then((res) => res.data);
    return data;
}