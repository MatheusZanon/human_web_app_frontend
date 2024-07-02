import { api } from '@/utils/axios';
import { Cliente } from '@/utils/types/financeiro/cliente';

export async function getClientesFinanceiro({
    is_active = null,
    folha_ponto = null,
}: {
    is_active?: boolean | null;
    folha_ponto?: boolean | null;
}) {
    const response = await api.get<Cliente[]>(
        `dashboard/clientes_financeiro?is_active=${is_active}&folha_ponto=${folha_ponto}`,
    );
    return response.data;
}
