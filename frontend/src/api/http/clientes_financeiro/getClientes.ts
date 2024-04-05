import { api } from '@/utils/axios';
import { Cliente } from '@/utils/types/cliente';

export async function getClientes() {
    const data = await api.get<Cliente[]>('clientes_financeiro').then((res) => res.data);
    return data;
}