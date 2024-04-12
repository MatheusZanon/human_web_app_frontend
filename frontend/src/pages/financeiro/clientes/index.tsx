import { useState } from 'react'
import { useGetClientes } from "@/api/http";
import { Search, Trash2 } from 'lucide-react';
import { Table, TableBody, TableData, TableHeader, TableRow, TableHead } from '@/components/table';

function Clientes() {
  const [url, setUrl] = useState<string>('clientes_financeiro/?limit=5&offset=0');
  const clientes = useGetClientes(url);
  const clienteResults = clientes.isSuccess && clientes.data && 'results' in clientes.data ? clientes.data.results : [];

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
          <div className='d-flex gap-2'>
            {clientes.data.previous ? 
              <button type='button' className='btn btn-primary' onClick={() => clientes.data.previous && setUrl(clientes.data.previous)}>Anterior</button>
                : 
              <button type='button' className='btn btn-primary' disabled={true}>Anterior</button>}
   
            {clientes.data.next ?
              <button type='button' className='btn btn-primary' onClick={() => clientes.data.next && setUrl(clientes.data.next)}>Próximo</button>
                :
              <button type='button' className='btn btn-primary' disabled={true}>Próximo</button>}
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
