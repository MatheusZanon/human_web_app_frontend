import { api } from '@/utils/axios';
import { CriarParametroType } from '@/utils/types/criar_parametro';
import { Parametro } from '@/utils/types/robos/parametro';
export async function postParametros(roboId: number, data: CriarParametroType) {
    const res = await api.post<Parametro>(`robos/${roboId}/parametros/criar/`, data).then((res) => res.data);
    return res;
}
