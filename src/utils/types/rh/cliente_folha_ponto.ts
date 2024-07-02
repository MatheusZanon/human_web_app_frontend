import { Cliente } from "../financeiro/cliente";

export type ClienteFolhaPonto = {
    id: number;
    cliente: Cliente;
    registrado: boolean;
    colaborador: boolean;
    created_at: string;
    updated_at: string;
}