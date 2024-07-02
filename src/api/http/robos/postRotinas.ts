import { api } from '@/utils/axios';
import { CriarRotinaType } from '@/utils/types/robos/criar_rotina';
import { Parametro } from '@/utils/types/robos/parametro';
export async function postRotinas(roboId: number, data: CriarRotinaType) {
    const res = await api.post<Parametro>(`robos/${roboId}/rotinas/criar/`, data).then((res) => res.data);
    return res;
}
