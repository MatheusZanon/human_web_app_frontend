import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';
import { getClientes } from './getClientes';
import { getClienteById } from './getClienteById';
import { patchCliente } from './patchCliente';
import { Cliente } from '@/utils/types/cliente';

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

export function useUpdateCliente() {
    return useMutation({
        mutationKey: ['update-user'],
        mutationFn: ({ clienteId, data }: { clienteId: number; data: Partial<Cliente> }) => patchCliente({ clienteId, data }),
        onSuccess: ({ id }) => {
            queryClient.invalidateQueries({ queryKey: [`cliente`, id] });
            const cliente = queryClient.getQueryData<Cliente>(['cliente']);

            if (cliente?.id === id) {
                queryClient.invalidateQueries({ queryKey: ['cliente'] });
            }
        },
    });
}
