import { api } from '@/utils/axios';
import { Cliente } from '@/utils/types/financeiro/cliente';

export async function postClienteFolhaPonto({ id_clientes }: { id_clientes: string[] }) {
    const res = await api
        .post<Cliente>('clientes_financeiro/folha_ponto/criar/', { id_clientes })
        .then((res) => res.data);
    return res;
}
