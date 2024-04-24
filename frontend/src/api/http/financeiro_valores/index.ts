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

export function useGetReembolsos(url:string) {
    return useQuery({
        queryKey: ['reembolsos', url],
        queryFn: () => getReembolsos(url),
    });
}

export function useGetValesSST(url:string, mes?: number, ano?: number) {
    return useQuery({
        queryKey: ['vales_sst', url, mes, ano],
        queryFn: () => getValesSST(url, mes, ano),
    });
}