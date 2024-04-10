import { api } from '@/utils/axios';
import { Robo } from '@/utils/types/robo';

export async function getRobos() {
  const token = localStorage.getItem('accessToken');
  const data = await api.get<Robo[]>('robos', {headers: {Authorization: `Bearer ${token}`}}).then((res) => res.data);
  return data;
}
