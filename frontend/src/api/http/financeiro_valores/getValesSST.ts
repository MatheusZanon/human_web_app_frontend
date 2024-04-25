import { api } from '@/utils/axios';
import { FinanceiroValesSST } from '@/utils/types/financeiro_vales_sst';
import PaginatedResponse from '@/utils/types/paginated_response';

export async function getValesSST(url: string ) {
    const response = await api.get<PaginatedResponse<FinanceiroValesSST>>(url);
    return response.data;
}