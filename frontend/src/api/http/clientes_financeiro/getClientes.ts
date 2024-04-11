import { api } from '@/utils/axios';
import { Cliente } from '@/utils/types/cliente';
import PaginatedResponse from '@/utils/types/paginated_response';

export async function getClientes() {
    const token = localStorage.getItem('accessToken');
    const response = await api.get<PaginatedResponse<Cliente>>('clientes_financeiro', {headers: {Authorization: `Bearer ${token}`}});
    return response.data;
}