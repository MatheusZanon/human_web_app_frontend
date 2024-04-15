import { useState, useEffect } from 'react'
import { useGetClientes } from "@/api/http";
import { Search, Trash2 } from 'lucide-react';
import { Table, TableBody, TableData, TableHeader, TableRow, TableHead } from '@/components/table';
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ClientesFinanceiro() {
  const [url, setUrl] = useState<string>('clientes_financeiro/?limit=12&offset=0');
  const clientes = useGetClientes(url);
  const clienteResults = clientes.isSuccess && clientes.data && 'results' in clientes.data ? clientes.data.results : [];
  const [filtro, setFiltro] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setUrl(`clientes_financeiro/?limit=12&offset=0&search=${filtro}`);
    }, 700);  // Delay de 700ms para evitar muitas requisições enquanto digita

    return () => clearTimeout(delayDebounce);
  }, [filtro]);
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(event.target.value);
  }

  const handleEdit = (id : number) => {
    navigate(`profile/${id}`);
  }


  if (clientes.isSuccess && clienteResults.length > 0) {
    return (
      <div className='px-3 pb-3 shadow rounded mb-2'>
      <h1 className='my-3'>Clientes</h1>
      <div className='d-flex gap-2 justify-content-left' style={{height: '7vh'}}>
        {clientes.data.previous ? 
          <button type='button' className='btn btn-primary' onClick={() => clientes.data.previous && setUrl(clientes.data.previous)}><ArrowBigLeftDash/></button>
          : 
          <button type='button' className='btn btn-primary' disabled={true}><ArrowBigLeftDash/></button>}

        {clientes.data.next ?
          <button type='button' className='btn btn-primary' onClick={() => clientes.data.next && setUrl(clientes.data.next)}><ArrowBigRightDash/></button>
          :
          <button type='button' className='btn btn-primary' disabled={true}><ArrowBigRightDash/></button>}
        <input type="text" className='form-control mx-2 w-25' value={filtro} placeholder='Filtrar' onChange={handleSearchChange}/>
      </div>  
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>ID</TableHeader>
              <TableHeader>Razão Social</TableHeader>
              <TableHeader>CNPJ</TableHeader>
              <TableHeader>CPF</TableHeader>
              <TableHeader>Região</TableHeader>
              <TableHeader>Ações</TableHeader>
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
                    <button className='btn btn-warning btn-sm p-1 d-flex justify-content-center align-items-center'
                    onClick={() => handleEdit(cliente.id)}>
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
      <div className='px-3 pb-3 shadow rounded mb-2'>
        <h1 className='my-3'>Clientes</h1>
        <div className='d-flex gap-2 justify-content-left' style={{height: '7vh'}}>
          {clientes.data?.previous ? 
            <button type='button' className='btn btn-primary' onClick={() => clientes.data.previous && setUrl(clientes.data.previous)}><ArrowBigLeftDash/></button>
            : 
            <button type='button' className='btn btn-primary' disabled={true}><ArrowBigLeftDash/></button>}

          {clientes.data?.next ?
            <button type='button' className='btn btn-primary' onClick={() => clientes.data.next && setUrl(clientes.data.next)}><ArrowBigRightDash/></button>
            :
            <button type='button' className='btn btn-primary' disabled={true}><ArrowBigRightDash/></button>}
          <input type="text" className='form-control mx-2 w-25' value={filtro} placeholder='Filtrar' onChange={handleSearchChange}/>
        </div>  
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
          </Table>
          <div className='text-center'>Não há clientes com esse nome!</div>
      </div>
    );
}
}
export default ClientesFinanceiro;
