import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';
import { getClientes } from './getClientes';
import { getClienteById } from './getClienteById';
import { patchCliente } from './patchCliente';
import { Cliente } from '@/utils/types/cliente';
import { CriarClienteType } from '@/utils/types/criar_cliente';
import { postCliente } from './postCliente';
import { putDeactivateCliente } from './putDesactivateCliente';
import { putActivateCliente } from './putActivateCliente';

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

export function usePostCliente() {
    return useMutation({
        mutationKey: ['post-cliente'],
        mutationFn: (data: CriarClienteType) => postCliente(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clientes'] }),
    });
}

export function useDeactivateCliente() {
    return useMutation({
        mutationKey: ['desativar-cliente'],
        mutationFn: (clienteId: number) => putDeactivateCliente({ clienteId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clientes'] });
        },
    });
}

export function useActivateCliente() {
    return useMutation({
        mutationKey: ['ativar-cliente'],
        mutationFn: (clienteId: number) => putActivateCliente({ clienteId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clientes'] });
        },
    });
}