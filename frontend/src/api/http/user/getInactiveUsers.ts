import { api } from "@/utils/axios";
import { User } from '@/utils/types/user';

export async function getInactiveUsers() {
    const data = await api.get<User[]>('funcionarios/buscar_usuarios_inativos').then((res) => res.data);
    return data;
}