import { api } from '@/utils/axios';
import { Robo } from '@/utils/types/robo';

export async function getRobos() {
  const data = await api.get<Robo[]>('robos').then((res) => res.data);
  return data;
}
