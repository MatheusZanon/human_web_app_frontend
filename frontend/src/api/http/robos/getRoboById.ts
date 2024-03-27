import { api } from '@/utils/axios';
import { Robo } from '@/utils/types/robo';
import { RoboParametros } from '@/utils/types/robo_parametros';

interface getRoboByIdProps {
  robo_id: string;
}

interface getRoboByIdResponse extends Robo {
  parametros: RoboParametros[];
}

export async function getRoboById({ robo_id }: getRoboByIdProps) {
  const data = await api.get<getRoboByIdResponse>(`robos/${robo_id}`).then((res) => res.data);
  return data;
}
