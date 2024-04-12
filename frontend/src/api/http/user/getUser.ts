import { api } from '@/utils/axios';
import { User } from '@/utils/types/user';

export async function getUser() {
  const data = await api.get<User>('funcionarios/auth/').then((res) => res.data);
  return data;
}
