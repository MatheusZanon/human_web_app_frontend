import { api } from '@/utils/axios';
import { FinanceiroValores } from '@/utils/types/dashboard/financeiro_valores';

export async function getFinanceiroValores() {
    const data = await api.get<FinanceiroValores[]>('financeiro_valores').then((res) => res.data);
    return data;
}