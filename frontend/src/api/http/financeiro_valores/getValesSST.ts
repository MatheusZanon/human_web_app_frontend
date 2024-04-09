import { api } from '@/utils/axios';
import { FinanceiroValesSST } from '@/utils/types/financeiro_vales_sst';

export async function getValesSST() {
    const token = localStorage.getItem('accessToken');
    const data = await api.get<FinanceiroValesSST[]>('financeiro_valores/vales_sst', {headers: {Authorization: `Bearer ${token}`}}).then((res) => res.data);
    return data;
}