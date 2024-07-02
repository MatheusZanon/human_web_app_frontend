import { api } from '@/utils/axios';
import { RoboParametros } from '@/utils/types/robos/robo_parametros';

interface getRoboParametrosByIdProps {
    robo_id: string;
}
export async function getRoboParametrosById({ robo_id }: getRoboParametrosByIdProps) {
    const data = await api.get<RoboParametros[]>(`robos/${robo_id}/parametros/listar`).then((res) => res.data);
    return data;
}
