import { api } from '@/utils/axios';
import { FinanceiroReembolsos } from '@/utils/types/dashboard/financeiro_reembolsos';
export async function deleteReembolso(data: Pick<FinanceiroReembolsos, 'id'>) {
    const res = await api
        .delete<FinanceiroReembolsos>(`financeiro_valores/reembolsos/deletar/${data}`)
        .then((res) => res.data);
    return res;
}
