import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';
import {
  getRobos,
  getRoboById,
  getRoboParametrosById,
  postRobos,
  deleteRobos,
  postExecutarRobo,
  RoboParametrosType,
} from './http/';

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
    enabled: !!roboId,
  });
}

export function useRoboParametrosById({ roboId }: { roboId: string }) {
  return useQuery({
    queryKey: ['robo', roboId, 'parametros'],
    queryFn: () => getRoboParametrosById({ robo_id: roboId }),
    enabled: !!roboId,
  });
}

export function useSeedRobos() {
  return useMutation({
    mutationKey: ['robos'],
    mutationFn: () => {
      return postRobos();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['robos'] });
    },
  });
}

export function useDeleteRobos() {
  return useMutation({
    mutationKey: ['robos'],
    mutationFn: () => {
      return deleteRobos();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['robos'] });
    },
  });
}

export function useExecutarRobo({ roboId }: { roboId: string }) {
  return useMutation({
    mutationKey: ['robo', roboId, 'executar'],
    mutationFn: (data: RoboParametrosType) => {
      return postExecutarRobo({ roboId, data });
    },
  });
}
