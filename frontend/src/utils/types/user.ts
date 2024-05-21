export type User = {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    rg: string;
    cpf: string;
    telefone_celular: string;
    profile_header: string;
    profile_picture: string;
    is_staff: boolean;
    is_superuser: boolean;
    is_active: boolean;
    groups: string[];
    permissions: string[];
    situacao: string;
};
