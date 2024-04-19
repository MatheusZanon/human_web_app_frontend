import { useQuery } from '@tanstack/react-query';
import { getProvisaoTrabalhista } from './getProvisaoDireitoTrabalhista';
import { getClientesFinanceiro } from './getClientesFinanceiro';
import { getAnos } from './getAnos';

export function useGetProvisaoTrabalhista3487(url:string) {
  return useQuery({
      queryKey: ['total_provisao_trabalhista_3487', url],
      queryFn: () => getProvisaoTrabalhista(url),
  });
}

export function useGetProvisaoTrabalhista0926(url:string) {
  return useQuery({
      queryKey: ['total_provisao_trabalhista_0926', url],
      queryFn: () => getProvisaoTrabalhista(url),
  });
}

export function useGetClientesFinanceiro() {
  return useQuery({
      queryKey: ['clientes_financeiro'],
      queryFn: () => getClientesFinanceiro(),
  });
}

export function useGetAnos() {
  return useQuery({
      queryKey: ['anos'],
      queryFn: () => getAnos(),
  });
}
