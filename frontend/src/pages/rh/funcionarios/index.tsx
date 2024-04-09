import { useState, useEffect } from 'react';
import { Table, TableBody, TableData, TableHeader, TableRow, TableHead } from '@/components/table';
import { Pencil, Trash2 } from 'lucide-react';
import { useGetAllUsers } from '@/api/http/user';


function Funcionarios() {
  const users = useGetAllUsers();
  if (users.isSuccess && users.data.length > 0) {
    return (
      <div className='px-3 pb-3 shadow rounded mb-2'>
      <h1 className='my-3'>Funcionários</h1>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>ID</TableHeader>
              <TableHeader>Nome</TableHeader>
              <TableHeader>CPF</TableHeader>
              <TableHeader>Telefone</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.data.map(funcionario => (
              <TableRow key={funcionario.id}>
                <TableData>{funcionario.id}</TableData>
                <TableData>{funcionario.username}</TableData>
                <TableData>{funcionario.cpf}</TableData>
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
  } else {
    return (
        <div>Não há funcionarios!</div>
    );
  }
};

export default Funcionarios;
