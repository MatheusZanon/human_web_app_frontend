import { api } from '@/utils/axios';
import { Cliente } from '@/utils/types/cliente';

export async function getClientesFinanceiro() {
    const response = await api.get<Cliente[]>('dashboard/clientes_financeiro');
    return response.data;
}
