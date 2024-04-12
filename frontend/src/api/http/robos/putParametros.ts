import { api } from '@/utils/axios';
import { RoboParametrosType } from './postExecutarRobo';

export async function putParametros({ roboId, parametroId, data }: { roboId: number; parametroId: number; data: RoboParametrosType }) {
    const token = localStorage.getItem('accessToken');
    const res = await api.put<RoboParametrosType>(`robos/${roboId}/parametros/atualizar/${parametroId}/`, data, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data);
    return res;
}
