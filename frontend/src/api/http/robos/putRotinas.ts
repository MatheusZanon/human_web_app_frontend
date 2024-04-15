import { api } from '@/utils/axios';
import { CriarRotinaType } from '@/utils/types/criar_rotina';

export async function putRotinas({
    roboId,
    rotinaId,
    data,
}: {
    roboId: number;
    rotinaId: number;
    data: CriarRotinaType;
}) {
    const token = localStorage.getItem('accessToken');
    const res = await api
        .put<CriarRotinaType>(`robos/${roboId}/rotinas/atualizar/${rotinaId}/`, data, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.data);
    return res;
}
