import { useMutation, useQuery } from '@tanstack/react-query';
import { getRobos } from './http/robos/';
import { postRobos } from './http/robos/postRobos';
import { queryClient } from '@/utils/queryClient';
import { deleteRobos } from './http/robos/deleteRobos';

export function useRobos() {
  return useQuery({
    queryKey: ['robos'],
    queryFn: () => getRobos(),
  });
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