import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';
import { getClientes } from './getClientes';
import { getClienteById } from './getClienteById';
import { patchCliente } from './patchCliente';
import { Cliente } from '@/utils/types/financeiro/cliente';
import { CriarClienteType } from '@/utils/types/financeiro/criar_cliente';
import { postCliente } from './postCliente';
import { putDeactivateCliente } from './putDesactivateCliente';
import { putActivateCliente } from './putActivateCliente';
import { getClientesFolhaPonto } from './getClientesFolhaPonto';
import { postClienteFolhaPonto } from './postClienteFolha';
import { deleteClienteFolhaPonto } from './deleteClienteFolha';
import { putUpdateClienteFolha } from './putClienteFolha';

export function useGetClientes(url: string) {
    return useQuery({
        queryKey: ['clientes', url],
        queryFn: () => getClientes(url),
    });
}

export function useGetClientesFolhaPonto(url: string) {
    return useQuery({
        queryKey: ['clientes_folha_ponto', url],
        queryFn: () => getClientesFolhaPonto(url),
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
        mutationFn: ({ clienteId, data }: { clienteId: number; data: Partial<Cliente> }) =>
            patchCliente({ clienteId, data }),
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

export function usePostClienteFolhaPonto() {
    return useMutation({
        mutationKey: ['post-cliente-folha-ponto'],
        mutationFn: ({ id_clientes }: { id_clientes: string[] }) => postClienteFolhaPonto({ id_clientes }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clientes_folha_ponto'] });
            queryClient.invalidateQueries({ queryKey: ['clientes_financeiro'] });
        },
    });
}

export function useDeactivateCliente() {
    return useMutation({
        mutationKey: ['desativar-cliente'],
        mutationFn: (clienteId: number) => putDeactivateCliente({ clienteId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clientes'] });
            queryClient.invalidateQueries({ queryKey: ['clientes_financeiro'] });
            queryClient.invalidateQueries({ queryKey: ['clientes_folha_ponto'] });
        },
    });
}

export function useActivateCliente() {
    return useMutation({
        mutationKey: ['ativar-cliente'],
        mutationFn: (clienteId: number) => putActivateCliente({ clienteId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clientes'] });
            queryClient.invalidateQueries({ queryKey: ['clientes_financeiro'] });
            queryClient.invalidateQueries({ queryKey: ['clientes_folha_ponto'] });
        },
    });
}

export function useUpdateClienteFolhaPonto() {
    return useMutation({
        mutationKey: ['update-cliente-folha-ponto'],
        mutationFn: ({
            id,
            id_cliente,
            registrado,
            colaborador,
        }: {
            id: string;
            id_cliente: string;
            registrado: boolean;
            colaborador: boolean;
        }) => putUpdateClienteFolha({ id, id_cliente, registrado, colaborador }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clientes_folha_ponto'] }),
    });
}

export function useDeleteClienteFolhaPonto() {
    return useMutation({
        mutationKey: ['delete-cliente-folha-ponto'],
        mutationFn: ({ id }: { id: string }) => deleteClienteFolhaPonto({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clientes_folha_ponto'] });
            queryClient.invalidateQueries({ queryKey: ['clientes_financeiro'] });
        },
    });
}
