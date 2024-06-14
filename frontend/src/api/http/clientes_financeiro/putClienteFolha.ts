import { api } from '@/utils/axios';
import { Cliente } from '@/utils/types/financeiro/cliente';

export async function putUpdateClienteFolha({
    id,
    id_cliente,
    colaborador,
    registrado,
}: {
    id: string;
    id_cliente: string;
    colaborador: boolean;
    registrado: boolean;
}) {
    const res = await api
        .put<Cliente>(`clientes_financeiro/${id_cliente}/folha_ponto/atualizar/`, { id, colaborador, registrado })
        .then((res) => res.data);
    return res;
}
