import { useQuery } from '@tanstack/react-query';
import { getTotalValesSSTPeriodo } from './getTotalValesSST';

export function useGetTotalValesSST(url:string) {
  return useQuery({
      queryKey: ['total_vales_sst', url],
      queryFn: () => getTotalValesSSTPeriodo(url),
  });
}