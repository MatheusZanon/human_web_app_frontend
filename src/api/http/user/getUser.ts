import { api } from '@/utils/axios';
import { User } from '@/utils/types/user/user';

export async function getUser() {
  const data = await api.get<User>('user/login', {withCredentials: true}).then((res) => res.data);
  return data;
}
