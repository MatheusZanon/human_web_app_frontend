import { Table, TableBody, TableData, TableHeader, TableRow, TableHead } from '@/components/table';
import { Pencil, Trash2 } from 'lucide-react';
import { useGetClientes } from "@/api/http";

function Clientes() {
  const clientes = useGetClientes();
  const clienteResults = clientes.isSuccess && clientes.data && 'results' in clientes.data ? clientes.data.results : [];
  console.log(clientes.data?.next)
    if (clientes.isSuccess && clienteResults.length > 0) {
      return (
        <div className='px-3 pb-3 shadow rounded mb-2'>
        <h1 className='my-3'>Clientes</h1>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>Razão Social</TableHeader>
                <TableHeader>CNPJ</TableHeader>
                <TableHeader>CPF</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Região</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {clienteResults.map(cliente => (
                <TableRow key={cliente.id}>
                  <TableData>{cliente.id}</TableData>
                  <TableData>{cliente.nome_razao_social}</TableData>
                  {cliente.cnpj ? <TableData>{cliente.cnpj}</TableData> : <TableData>-</TableData>}
                  {cliente.cpf ? <TableData>{cliente.cpf}</TableData> : <TableData>-</TableData>}
                  <TableData>{cliente.email}</TableData>
                  <TableData>{cliente.regiao}</TableData>
                  <TableData>
                    <div className='d-flex gap-2'>
                      <button className='btn btn-warning btn-sm p-1 d-flex justify-content-center align-items-center'>
                        <Pencil width={16} height={16} />
                      </button>
                      <button className='btn btn-danger btn-sm p-1 d-flex justify-content-center align-items-center'>
                        <Trash2 width={16} height={16} />
                      </button>
                    </div>
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div>
            {clientes.data.previous && (
                <button onClick={() => setUrl(clientes.data.previous)}>Anterior</button>
            )}
            {clientes.data.next && (
                <button onClick={() => setUrl(clientes.data.next)}>Próximo</button>
            )}
        </div>
      </div>
      );
    } else {
      return (
          <div>Não há clientes!</div>
      );
    }
}
export default Clientes;
