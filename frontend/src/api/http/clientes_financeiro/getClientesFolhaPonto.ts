import { api } from '@/utils/axios';
import { Cliente } from '@/utils/types/cliente';
import PaginatedResponse from '@/utils/types/paginated_response';

export async function getClientesFolhaPonto(url:string) {
    const response = await api.get<PaginatedResponse<Cliente>>(url);
    return response.data;
}