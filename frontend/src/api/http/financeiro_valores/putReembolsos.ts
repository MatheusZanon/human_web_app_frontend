import { api } from '@/utils/axios';
import { AtualizarReembolsoType } from '@/utils/types/atualizar_reembolso';
import { FinanceiroReembolsos } from '@/utils/types/financeiro_reembolsos';

export async function putReembolso(data: Partial<AtualizarReembolsoType>) {
    const res = await api
        .put<FinanceiroReembolsos>(`financeiro_valores/reembolsos/atualizar/`, data)
        .then((res) => res.data);
    return res;
}
