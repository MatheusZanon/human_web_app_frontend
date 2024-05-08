import { api } from '@/utils/axios';
import { Cliente } from '@/utils/types/cliente';

export async function patchCliente({ clienteId, data }: { clienteId: number; data: Partial<Cliente> }) {
    const res = await api.patch<Cliente>(`clientes_financeiro/${clienteId}/`, data).then((res) => res.data);
    return res;
}
