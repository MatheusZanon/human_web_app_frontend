import { api } from '@/utils/axios';
import { FinanceiroReembolsos } from '@/utils/types/dashboard/financeiro_reembolsos';
export async function deleteReembolso({ id }: Pick<FinanceiroReembolsos, 'id'>) {
    const res = await api
        .delete<FinanceiroReembolsos>(`financeiro_valores/reembolsos/deletar/${id}`)
        .then((res) => res.data);
    return res;
}
