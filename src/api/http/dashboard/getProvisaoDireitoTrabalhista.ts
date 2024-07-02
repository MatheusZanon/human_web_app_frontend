import { api } from '@/utils/axios';

interface getProvisaoDireitoTrabalhistaProps {
    mes: number;
    valor: number;
}

export async function getProvisaoTrabalhista(url: string) {
    const response = await api.get<getProvisaoDireitoTrabalhistaProps[]>(url);
    return response.data;
}
