import { api } from '@/utils/axios';
import { Cliente } from '@/utils/types/cliente';

export async function getClientes() {
    const token = localStorage.getItem('accessToken');
    const data = await api.get<Cliente[]>('clientes_financeiro', {headers: {Authorization: `Bearer ${token}`}}).then((res) => res.data);
    return data;
}