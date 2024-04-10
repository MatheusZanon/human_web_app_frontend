import { api } from '@/utils/axios';
import { RoboParametros } from '@/utils/types/robo_parametros';

interface getRoboParametrosByIdProps {
    robo_id: string;
}
export async function getRoboParametrosById({ robo_id }: getRoboParametrosByIdProps) {
    const token = localStorage.getItem('accessToken');
    const data = await api.get<RoboParametros[]>(`robos/${robo_id}/parametros/listar`, {headers: {Authorization: `Bearer ${token}`}}).then((res) => res.data);
    return data;
}
