import { api } from '@/utils/axios';
import { AtualizarReembolsoType } from '@/utils/types/financeiro/atualizar_reembolso';
import { FinanceiroReembolsos } from '@/utils/types/dashboard/financeiro_reembolsos';

export async function putReembolso(data: Partial<AtualizarReembolsoType>) {
    const res = await api
        .put<FinanceiroReembolsos>(`financeiro_valores/reembolsos/atualizar/`, data)
        .then((res) => res.data);
    return res;
}
