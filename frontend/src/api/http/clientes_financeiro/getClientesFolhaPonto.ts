import { api } from '@/utils/axios';
import { ClienteFolhaPonto } from '@/utils/types/cliente_folha_ponto';
import PaginatedResponse from '@/utils/types/paginated_response';

export async function getClientesFolhaPonto(url:string) {
    const response = await api.get<PaginatedResponse<ClienteFolhaPonto>>(url);
    return response.data;
}