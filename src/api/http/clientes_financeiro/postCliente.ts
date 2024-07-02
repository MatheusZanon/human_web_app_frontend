import { api } from "@/utils/axios";
import { Cliente } from "@/utils/types/financeiro/cliente";
import { CriarClienteType } from "@/utils/types/financeiro/criar_cliente";

export async function postCliente(data: CriarClienteType) {
  const res = await api.post<Cliente>('clientes_financeiro/', data).then((res) => res.data);
  return res;
}