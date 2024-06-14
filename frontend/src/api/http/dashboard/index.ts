import { useQuery } from '@tanstack/react-query';
import { getProvisaoTrabalhista } from './getProvisaoDireitoTrabalhista';
import { getClientesFinanceiro } from './getClientesFinanceiro';
import { getAnos } from './getAnos';
import { getEconomiaLiquida } from './getEconomiaLiquida';
import { getTaxaAdministracao } from './getTaxaAdministracao';

export function useGetProvisaoTrabalhista3487(url: string) {
    return useQuery({
        queryKey: ['total_provisao_trabalhista_3487', url],
        queryFn: () => getProvisaoTrabalhista(url),
    });
}

export function useGetProvisaoTrabalhista0926(url: string) {
    return useQuery({
        queryKey: ['total_provisao_trabalhista_0926', url],
        queryFn: () => getProvisaoTrabalhista(url),
    });
}

export function useGetTaxaAdministracao(url: string) {
    return useQuery({
        queryKey: ['taxa_administracao', url],
        queryFn: () => getTaxaAdministracao(url),
    });
}

export function useGetClientesFinanceiro(is_active: boolean | null = null, folha_ponto: boolean | null = null) {
    return useQuery({
        queryKey: ['clientes_financeiro'],
        queryFn: () => getClientesFinanceiro({ is_active, folha_ponto }),
    });
}

export function useGetAnos() {
    return useQuery({
        queryKey: ['anos'],
        queryFn: () => getAnos(),
    });
}

export function useGetEconomiaLiquida(url: string) {
    return useQuery({
        queryKey: ['economia_liquida', url],
        queryFn: () => getEconomiaLiquida(url),
    });
}
