import { Table, TableBody, TableData, TableHeader, TableRow, TableHead } from '@/components/table';
import { Search, Trash2 } from 'lucide-react';
import { useGetClientes } from "@/api/http";

function Clientes() {
  const clientes = useGetClientes();
    if (clientes.isSuccess && clientes.data.length > 0) {
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
              {clientes.data.map(cliente => (
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
                        <Search width={16} height={16} />
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
      </div>
      );
    } else {
      return (
          <div>Não há funcionarios!</div>
      );
    }
}
export default Clientes;
