import { useQuery } from '@tanstack/react-query';
import { getClientes } from './getClientes';

export function useGetClientes(url: string) {
    return useQuery({
        queryKey: ['clientes', url],
        queryFn: () => getClientes(url),
    });
}