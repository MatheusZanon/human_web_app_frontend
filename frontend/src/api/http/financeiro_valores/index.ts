import { useMutation, useQuery } from '@tanstack/react-query';
import { getFinanceiroValores } from './getFinanceiroValores';
import { getReembolsos } from './getReembolsos';
import { getValesSST } from './getValesSST';
import { FinanceiroValesSST } from '@/utils/types/financeiro_vales_sst';
import { putValesSST } from './putValesSST';
import { queryClient } from '@/utils/queryClient';
import { FinanceiroReembolsos } from '@/utils/types/financeiro_reembolsos';
import { postReembolso } from './postReembolsos';
import { putReembolso } from './putReembolsos';
import { deleteReembolso } from './deleteReembolsos';

export function useGetFinanceiroValores() {
    return useQuery({
        queryKey: ['financeiro_valores'],
        queryFn: () => getFinanceiroValores(),
    });
}

export function useGetReembolsos(url: string) {
    return useQuery({
        queryKey: ['reembolsos', url],
        queryFn: () => getReembolsos(url),
    });
}

export function useGetValesSST(url: string) {
    return useQuery({
        queryKey: ['vales_sst', url],
        queryFn: () => getValesSST(url),
    });
}

export function usePutValesSST() {
    return useMutation({
        mutationKey: ['vales_sst'],
        mutationFn: ({
            ano,
            mes,
            assinat_eletronica,
            mensal_ponto_elet,
            nome_razao_social,
            saude_seguranca_trabalho,
            vale_refeicao,
            vale_transporte,
        }: Partial<FinanceiroValesSST>) =>
            putValesSST({
                ano,
                mes,
                assinat_eletronica,
                mensal_ponto_elet,
                nome_razao_social,
                saude_seguranca_trabalho,
                vale_refeicao,
                vale_transporte,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vales_sst'] });
        },
    });
}

export function usePostReembolso() {
    return useMutation({
        mutationKey: ['reembolsos'],
        mutationFn: (data: Omit<FinanceiroReembolsos, 'id'>) => postReembolso(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reembolsos'] });
        },
    });
}

export function usePutReembolso() {
    return useMutation({
        mutationKey: ['reembolsos'],
        mutationFn: (data: Partial<FinanceiroReembolsos>) => putReembolso(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reembolsos'] });
        },
    });
}

export function useDeleteReembolso() {
    return useMutation({
        mutationKey: ['reembolsos'],
        mutationFn: ({ id }: Pick<FinanceiroReembolsos, 'id'>) => deleteReembolso(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reembolsos'] });
        },
    });
}
