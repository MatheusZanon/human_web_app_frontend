import { useState, useEffect } from 'react';
import { Table, TableBody, TableData, TableHeader, TableRow, TableHead } from '@/components/table';
import { Funcionarios } from '@/utils/types/funcionarios';
import { Pencil, Trash2 } from 'lucide-react';
import axios from 'axios';


function Home() {
  const [funcionarios, setFuncionarios] = useState<Funcionarios[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/funcionarios/')  // Substitua pela URL da sua API
      .then(response => {
        setFuncionarios(response.data);
      })
      .catch(error => {
        console.error('Houve um erro ao buscar os clientes!', error);
      });
  }, []); // O array vazio indica que o useEffect deve ser executado uma única vez após o carregamento do componente

  return (
    <div className='px-3 pb-3 shadow rounded'>
      <h1 className='my-3'>Funcionários</h1>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>ID</TableHeader>
              <TableHeader>Nome</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>RG</TableHeader>
              <TableHeader>CPF</TableHeader>
              <TableHeader>Telefone</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {funcionarios.map(funcionario => (
              <TableRow key={funcionario.id}>
                <TableData>{funcionario.id}</TableData>
                <TableData>{funcionario.nome}</TableData>
                <TableData>{funcionario.email}</TableData>
                {funcionario.rg != null ? <TableData>{funcionario.rg}</TableData> : <TableData>-</TableData>}
                {funcionario.cpf != null ? <TableData>{funcionario.cpf}</TableData> : <TableData>-</TableData>}
                <TableData>{funcionario.telefone_celular}</TableData>
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
    </div>
  );
}

export default Home;
