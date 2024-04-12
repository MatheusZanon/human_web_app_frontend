import { api } from '@/utils/axios';

export async function deleteRotina(roboId: number, rotinaId: number) {
    const token = localStorage.getItem('accessToken');
    const res = await api.delete(`robos/${roboId}/rotinas/excluir/${rotinaId}`, {headers: {Authorization: `Bearer ${token}`}}).then((res) => res.data);
    return res;
}