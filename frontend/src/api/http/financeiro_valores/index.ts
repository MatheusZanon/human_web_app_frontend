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

export function useGetReembolsos(url:string, mes?: number, ano?: number) {
    return useQuery({
        queryKey: ['reembolsos', url, mes, ano],
        queryFn: () => getReembolsos(url, mes, ano),
    });
}

export function useGetValesSST(url:string) {
    return useQuery({
        queryKey: ['vales_sst', url],
        queryFn: () => getValesSST(url),
    });
}