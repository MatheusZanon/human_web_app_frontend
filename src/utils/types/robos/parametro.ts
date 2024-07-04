import { SelectOption } from "./option";

interface Parametro {
    id: string;
    nome: string;
    tipo: string;
    options?: SelectOption[];
    created_at: string;
    updated_at: string;
}

export type { Parametro };
