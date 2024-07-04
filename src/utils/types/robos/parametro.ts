interface SelectOptions {
    id: string;
    nome: string;
    created_at: string;
    updated_at: string;
}

interface Parametro {
    id: string;
    nome: string;
    tipo: string;
    options?: SelectOptions[];
    created_at: string;
    updated_at: string;
}

export type { Parametro };
