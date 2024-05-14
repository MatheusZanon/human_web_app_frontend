import { api } from "@/utils/axios";
import { Cliente } from "@/utils/types/cliente";
import { CriarClienteType } from "@/utils/types/criar_cliente";

export async function postCliente(data: CriarClienteType) {
  const res = await api.post<Cliente>('clientes_financeiro/', data).then((res) => res.data);
  return res;
}