import { useQuery } from '@tanstack/react-query';
import { getClientes } from './getClientes';
import { getClienteById } from './getClienteById';

export function useGetClientes(url: string) {
    return useQuery({
        queryKey: ['clientes', url],
        queryFn: () => getClientes(url),
    });
}

export function useGetClienteById({ clienteId }: { clienteId: number }) {
    return useQuery({
        queryKey: ['cliente', clienteId],
        queryFn: () => getClienteById({ cliente_id: clienteId }),
    });
}

