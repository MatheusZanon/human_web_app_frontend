import { Cliente } from "./cliente";

export interface getEconomiaLiquida extends Pick<Cliente, 'nome_razao_social'> {
    mes: number;
    ano: number;
    economia_liquida: number;
    regiao: string;
}
