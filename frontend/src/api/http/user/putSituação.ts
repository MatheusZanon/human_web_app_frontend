import { api } from '@/utils/axios';
import { User } from '@/utils/types/user/user';

export async function putSituacao(userId: number, data: { situacao: 'ATIVO' | 'INATIVO' | 'FERIAS' | 'SUSPENSO' }) {
    const res = await api.put<User>(`funcionarios/${userId}/situacao/`, data).then((res) => res.data);
    return res;
}
