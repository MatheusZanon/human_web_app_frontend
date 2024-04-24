import { Cliente } from "./cliente";

export interface getEconomiaFormal extends Pick<Cliente, 'nome_razao_social'> {
    mes: number;
    ano: number;
    economia_formal: number;
    regiao: string;
}
