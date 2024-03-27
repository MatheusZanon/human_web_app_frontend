import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';

import { getUser } from './getUser';
import { getAllUsers } from './getAllUsers';

export function useGetUser() {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(),
    });
}

export function useGetAllUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => getAllUsers(),
    });
}
