import { useQuery } from '@tanstack/react-query';
import { getRobos } from './http/robos/';

export function useRobos() {
  return useQuery({
    queryKey: ['robos'],
    queryFn: () => getRobos(),
  });
}
