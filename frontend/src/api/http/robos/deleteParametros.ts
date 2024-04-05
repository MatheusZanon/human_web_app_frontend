import { api } from '@/utils/axios';

export async function deleteParametros(roboId: number, parametroId: number) {
    const res = await api.delete(`robos/${roboId}/parametros/excluir/${parametroId}`).then((res) => res.data);
    return res;
}
