import { useEffect, useState, useRef } from 'react'
import { api } from '@/utils/axios';
import { useGetClientes } from "@/api/http";
import { Search, Trash2 } from 'lucide-react';
import { Table, TableBody, TableData, TableHeader, TableRow, TableHead } from '@/components/table';
import { ArrowBigLeftDash, ArrowBigRightDash, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Content } from '@/components/layout/content';

function ClientesFinanceiro() {
  const [url, setUrl] = useState<string>('clientes_financeiro/?limit=12&offset=0');
  const clientes = useGetClientes(url);
  const clienteResults = clientes.isSuccess && clientes.data && 'results' in clientes.data ? clientes.data.results : [];
  const [filtro, setFiltro] = useState<string>('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setUrl(`clientes_financeiro/?limit=12&offset=0&search=${filtro}`);
    }, 500);  // Delay de 500ms para evitar muitas requisições enquanto digita
    
    return () => {
      clearTimeout(delayDebounce);
    };
  }, [filtro]);

  useEffect(() => {
    if (clienteResults.length > 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [clienteResults]);
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(event.target.value);
  }

  const handleEdit = (id : number) => {
    navigate(`${id}`);
  }

  return (
    <>
    <Content title='Clientes'>
      <div className='d-flex gap-2 justify-content-left' style={{height: '7vh'}}>
        {clientes.data?.previous ? 
          <button type='button' className='btn btn-primary' onClick={() => clientes.data.previous && setUrl(clientes.data.previous)}><ArrowBigLeftDash/></button>
          : 
          <button type='button' className='btn btn-primary' disabled={true}><ArrowBigLeftDash/></button>}

        {clientes.data?.next ?
          <button type='button' className='btn btn-primary' onClick={() => clientes.data.next && setUrl(clientes.data.next)}><ArrowBigRightDash/></button>
          :
          <button type='button' className='btn btn-primary' disabled={true}><ArrowBigRightDash/></button>}
        <input ref={inputRef} type="text" className='form-control mx-2 w-25 custom-input' value={filtro} placeholder='Filtrar' onChange={handleSearchChange}/>
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
        {clienteResults.length > 0 && clienteResults.map(cliente => (
        <TableBody>
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
        </TableBody>
        ))}
      </Table>
      {!clienteResults.length && 
        <h6 className='text-center align-self-center'>Nenhum cliente encontrado <p className='mt-2'><AlertTriangle/></p></h6>
      }
    </Content>
    </>
  );
} 

export default ClientesFinanceiro;
