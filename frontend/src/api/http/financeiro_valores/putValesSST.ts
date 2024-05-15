import { api } from '@/utils/axios';
import { FinanceiroValesSST } from '@/utils/types/financeiro_vales_sst';

export async function putValesSST(data: Partial<FinanceiroValesSST>) {
    const res = await api
        .put<FinanceiroValesSST>(`financeiro_valores/vales_sst/atualizar/`, data)
        .then((res) => res.data);
    return res;
}
