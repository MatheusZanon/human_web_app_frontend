import { useMutation, useQuery } from '@tanstack/react-query';
import { getRobos } from './http/robos/';
import { postRobos } from './http/robos/postRobos';
import { queryClient } from '@/utils/queryClient';
import { deleteRobos } from './http/robos/deleteRobos';
import { getRoboById } from './http/robos/getRoboById';
import { getRoboParametrosById } from './http/robos/getRoboParametrosById';

export function useRobos() {
  return useQuery({
    queryKey: ['robos'],
    queryFn: () => getRobos(),
  });
}

export function useRoboById({ roboId }: { roboId: string }) {
  return useQuery({
    queryKey: ['robo', roboId],
    queryFn: () => getRoboById({ robo_id: roboId }),
    enabled: !!roboId
  });
}

export function useRoboParametrosById({ roboId }: { roboId: string }) {
  return useQuery({
    queryKey: ['robo', roboId, 'parametros'],
    queryFn: () => getRoboParametrosById({ robo_id: roboId }),
    enabled: !!roboId
  })
}

export function useSeedRobos() {
  return useMutation({
    mutationFn: () => {
      return postRobos();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['robos'] });
    }
  })
}

export function useDeleteRobos() {
  return useMutation({
    mutationFn: () => {
      return deleteRobos();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['robos'] });
    }
  })
}