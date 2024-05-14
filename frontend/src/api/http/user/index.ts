import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';

import { getUser } from './getUser';
import { getAllUsers } from './getAllUsers';
import { getAllGroups } from './getAllGroups';
import { putActivateUser } from './putActivateUser';
import { getUserById } from './getUserById';
import { putDeactivateUser } from './putDesactivateUser';
import { User } from '@/utils/types/user';
import { patchUser } from './patchUser';
import { putSituacao } from './putSituação';

export function useGetUser() {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(),
    });
}

export function useGetUserById({ userId }: { userId: number }) {
    return useQuery({
        queryKey: [`user/${userId}`],
        queryFn: () => getUserById({ userId }),
        enabled: !!userId,
    });
}

export function useGetAllUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => getAllUsers(),
    });
}

export function useGetAllGroups() {
    return useQuery({
        queryKey: ['groups'],
        queryFn: () => getAllGroups(),
    });
}

export function useActivateUser() {
    return useMutation({
        mutationKey: ['users'],
        mutationFn: ({ userId, data }: { userId: number; data: { id: number[] } }) => putActivateUser({ userId, data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}

export function useDeactivateUser() {
    return useMutation({
        mutationKey: ['users'],
        mutationFn: (userId: number) => putDeactivateUser({ userId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
}

export function useUpdateUser() {
    return useMutation({
        mutationKey: ['update-user'],
        mutationFn: ({ userId, data }: { userId: number; data: Partial<User> }) => patchUser({ userId, data }),
        onSuccess: ({ id }) => {
            queryClient.invalidateQueries({ queryKey: [`user/${id}`] });
            const user = queryClient.getQueryData<User>(['user']);

            if (user?.id === id) {
                queryClient.invalidateQueries({ queryKey: ['user'] });
            }
        },
    });
}

export function useUpdateSituacao() {
    return useMutation({
        mutationKey: ['users'],
        mutationFn: ({ userId, data }: { userId: number; data: { situacao: 'ATIVO' | 'FERIAS' | 'SUSPENSO' } }) =>
            putSituacao(userId, data),
        onSuccess: ({ id }) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: [`user/${id}`] });
        },
    });
}
