import { api } from '@/utils/axios';

interface getTaxaAdministracaoProps {
    mes: number;
    taxa_administracao: number;
}

export async function getTaxaAdministracao(url: string) {
    const response = await api.get<getTaxaAdministracaoProps[]>(url);
    return response.data;
}
