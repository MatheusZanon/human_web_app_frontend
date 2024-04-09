import { useQuery } from '@tanstack/react-query';
import { getFinanceiroValores } from './getFinanceiroValores';
import { getReembolsos } from './getReembolsos';
import { getValesSST } from './getValesSST';

export function useGetFinanceiroValores() {
    return useQuery({
        queryKey: ['financeiro_valores'],
        queryFn: () => getFinanceiroValores(),
    });
}

export function useGetReembolsos() {
    return useQuery({
        queryKey: ['reembolsos'],
        queryFn: () => getReembolsos(),
    });
}

export function useGetValesSST() {
    return useQuery({
        queryKey: ['vales_sst'],
        queryFn: () => getValesSST(),
    });
}