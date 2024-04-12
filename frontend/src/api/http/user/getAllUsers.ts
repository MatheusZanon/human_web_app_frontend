import { api } from '@/utils/axios';
import { User } from '@/utils/types/user';

export async function getAllUsers() {
  const data = await api.get<User[]>('funcionarios').then((res) => res.data);
  return data;
}