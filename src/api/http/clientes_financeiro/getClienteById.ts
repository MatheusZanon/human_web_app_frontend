import { api } from "@/utils/axios";
import { Cliente } from "@/utils/types/financeiro/cliente";

export async function getClienteById({ cliente_id }: { cliente_id: number }) {
    const data = api.get<Cliente>(`clientes_financeiro/${cliente_id}`).then((res) => res.data);
    return data;
}