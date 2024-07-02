import { api } from '@/utils/axios';

interface GetTotalValesSSTPeriodoProps {
    name: string;
    vale_transporte: number;
    vale_refeicao: number;
    assinatura_eletronica: number;
    mensal_ponto_eletronico: number;
    saude_seguranca_trabalho: number;
}

export async function getTotalValesSSTPeriodo(url: string) {
    const response = await api.get<GetTotalValesSSTPeriodoProps>(url);
    return response.data;
}
