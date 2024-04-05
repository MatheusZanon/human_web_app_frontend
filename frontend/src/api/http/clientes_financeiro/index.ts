import { useQuery } from '@tanstack/react-query';
import { getClientes } from './getClientes';

export function useGetClientes() {
    return useQuery({
        queryKey: ['clientes'],
        queryFn: () => getClientes(),
    });
}