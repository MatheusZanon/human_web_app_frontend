import { api } from '@/utils/axios';
import { User } from '@/utils/types/user';

export async function getUser() {
  const token = localStorage.getItem('accessToken');
  const data = await api.get<User>('funcionarios/auth/', {headers: {Authorization: `Bearer ${token}`}}).then((res) => res.data);
  return data;
}
