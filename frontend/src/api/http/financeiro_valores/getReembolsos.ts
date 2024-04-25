import { api } from '@/utils/axios';
import { FinanceiroReembolsos } from '@/utils/types/financeiro_reembolsos';
import PaginatedResponse from '@/utils/types/paginated_response';

export async function getReembolsos(url:string, mes?: number, ano?: number) {
    const response = await api.get<PaginatedResponse<FinanceiroReembolsos>>(url, { params: { mes, ano } });
    return response.data;
}