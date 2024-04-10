import { api } from '@/utils/axios';
import { CriarParametroType } from '@/utils/types/criar_parametro';
import { Parametro } from '@/utils/types/parametro';
export async function postParametros(roboId: number, data: CriarParametroType) {
    const token = localStorage.getItem('accessToken');
    const res = await api.post<Parametro>(`robos/${roboId}/parametros/criar/`, data, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data);
    return res;
}
