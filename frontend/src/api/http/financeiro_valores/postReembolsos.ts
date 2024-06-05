import { api } from '@/utils/axios';
import { FinanceiroReembolsos } from '@/utils/types/dashboard/financeiro_reembolsos';
export async function postReembolso(data: Omit<FinanceiroReembolsos, 'id'>) {
    const res = await api
        .post<FinanceiroReembolsos>(`financeiro_valores/reembolsos/criar/`, data)
        .then((res) => res.data);
    return res;
}
