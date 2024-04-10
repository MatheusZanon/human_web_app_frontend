import { api } from '@/utils/axios';

export async function deleteParametros(roboId: number, parametroId: number) {
    const token = localStorage.getItem('accessToken');
    const res = await api.delete(`robos/${roboId}/parametros/excluir/${parametroId}`, {headers: {Authorization: `Bearer ${token}`}}).then((res) => res.data);
    return res;
}
