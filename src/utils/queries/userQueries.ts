/*import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteUser, editUser, getUser, getUsers } from '@/api/api';
import { User } from '@/utils/types/user';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });
}

type EditUserMutation = {
  id: number;
  data: Partial<Omit<User, 'id'>>;
};

type EditUserMutationResponse = unknown;

export function useEditUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation<EditUserMutationResponse, unknown, EditUserMutation>({
    mutationFn: ({ id, data }) => editUser(id, data),
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: [['users'], ['user', id]] });
    },
  });

  const handleEdit = (id: number, data: Partial<Omit<User, 'id'>>) => {
    mutation.mutate({ id, data });
  };

  return { handleEdit, ...mutation };
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation<EditUserMutationResponse, unknown, number>({
    mutationFn: (id) => deleteUser(id),
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: [['users'], ['user', id]] });
    },
  });

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  };

  return { handleDelete, ...mutation };
}
*/
