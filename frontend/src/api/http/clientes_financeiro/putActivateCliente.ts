import { api } from '@/utils/axios';
import type { Cliente } from '@/utils/types/cliente';

export async function putActivateCliente({ clienteId }: { clienteId: number}) {
    const res = await api.put<Cliente>(`clientes_financeiro/${clienteId}/ativar/`).then((res) => res.data);
    return res;
}
