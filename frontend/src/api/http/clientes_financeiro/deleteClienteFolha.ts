import { api } from '@/utils/axios';
import { Cliente } from '@/utils/types/financeiro/cliente';

export async function deleteClienteFolhaPonto({ id }: { id: string }) {
    const res = await api.delete<Cliente>(`clientes_financeiro/${id}/folha_ponto/deletar/`).then((res) => res.data);
    return res;
}
