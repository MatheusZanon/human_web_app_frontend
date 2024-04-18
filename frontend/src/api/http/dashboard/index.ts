import { useQuery } from '@tanstack/react-query';
import { getProvisaoTrabalhista } from './getProvisaoDireitoTrabalhista';
import { getClientesFinanceiro } from './getClientesFinanceiro';

export function useGetProvisaoTrabalhista(url:string) {
  return useQuery({
      queryKey: ['total_provisao_trabalhista', url],
      queryFn: () => getProvisaoTrabalhista(url),
  });
}

export function useGetClientesFinanceiro() {
  return useQuery({
      queryKey: ['clientes_financeiro'],
      queryFn: () => getClientesFinanceiro(),
  });
}