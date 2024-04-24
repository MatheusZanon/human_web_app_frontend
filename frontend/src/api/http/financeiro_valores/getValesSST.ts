import { api } from '@/utils/axios';
import { FinanceiroValesSST } from '@/utils/types/financeiro_vales_sst';
import PaginatedResponse from '@/utils/types/paginated_response';

export async function getValesSST(url: string, mes?: number, ano?: number) {
    const response = await api.get<PaginatedResponse<FinanceiroValesSST>>(url, { params: { mes, ano } });
    return response.data;
}