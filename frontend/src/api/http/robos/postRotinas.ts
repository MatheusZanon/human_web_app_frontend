import { api } from '@/utils/axios';
import { CriarRotinaType } from '@/utils/types/criar_rotina';
import { Parametro } from '@/utils/types/parametro';
export async function postRotinas(roboId: number, data: CriarRotinaType) {
    const token = localStorage.getItem('accessToken');
    const res = await api.post<Parametro>(`robos/${roboId}/rotinas/criar/`, data, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data);
    return res;
}
