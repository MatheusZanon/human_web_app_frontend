import { api } from "@/utils/axios";
import { User } from '@/utils/types/user';

export async function getActiveUsers() {
    const data = await api.get<User[]>('funcionarios/buscar_usuarios_ativos').then((res) => res.data);
    return data;
}