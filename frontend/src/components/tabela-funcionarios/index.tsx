import { useState } from 'react';
import { Table, TableHead, TableRow, TableHeader, TableBody, TableData } from '@/components/table';
import { Pencil, Trash2 } from 'lucide-react';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import { User } from '@/utils/types/user';
import { useNavigate } from 'react-router-dom';

function TabelaFuncionarios({ data }: { data: User[] }) {
    const { hasPermission } = useAuthenticatedUser();
    const [sortBy, setSortBy] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const navigate = useNavigate();

    const handleSort = (columnKey: string) => {
        if (sortBy === columnKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(columnKey);
            setSortDirection('asc');
        }
    };

    const sortedData = [...data].sort((a, b) => {
        if ((a as any)[sortBy] < (b as any)[sortBy]) return sortDirection === 'asc' ? -1 : 1;
        if ((a as any)[sortBy] > (b as any)[sortBy]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const handleEdit = (id: number) => {
        navigate(`/funcionarios/${id}`);
    }

    return (
        <div className='px-3 pb-3 shadow rounded'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader columnKey='id' onSort={() => handleSort('id')}>
                            ID
                        </TableHeader>
                        <TableHeader
                            sortable
                            sortDirection={sortBy === 'username' ? sortDirection : ''}
                            columnKey='username'
                            onSort={() => handleSort('username')}
                        >
                            Nome
                        </TableHeader>
                        <TableHeader
                            sortable
                            sortDirection={sortBy === 'cpf' ? sortDirection : ''}
                            columnKey='cpf'
                            onSort={() => handleSort('cpf')}
                        >
                            CPF
                        </TableHeader>
                        <TableHeader
                            sortable
                            sortDirection={sortBy === 'telefone_celular' ? sortDirection : ''}
                            columnKey='telefone_celular'
                            onSort={() => handleSort('telefone_celular')}
                        >
                            Telefone
                        </TableHeader>
                        {hasPermission('Can change funcionarios') && <TableHeader>Actions</TableHeader>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedData.map(
                        (funcionario) =>
                            funcionario.is_active && (
                                <TableRow key={funcionario.id}>
                                    <TableData>{funcionario.id}</TableData>
                                    <TableData>
                                        {funcionario.username} —{' '}
                                        {funcionario.groups.length > 0
                                            ? funcionario.groups.map((group, index) =>
                                                  index !== funcionario.groups.length - 1 ? `${group}, ` : `${group}`,
                                              )
                                            : 'Sem Cargo'}
                                    </TableData>
                                    <TableData>{funcionario.cpf}</TableData>
                                    <TableData>{funcionario.telefone_celular}</TableData>
                                    {hasPermission('Can change funcionarios') && (
                                        <TableData>
                                            <div className='d-flex gap-2'>
                                                {hasPermission('Can change funcionarios') && (
                                                    <>
                                                        <button
                                                            className='btn btn-warning btn-sm p-1 d-flex justify-content-center align-items-center'
                                                            onClick={() => handleEdit(funcionario.id)}
                                                        >
                                                            <Pencil width={16} height={16} />
                                                        </button>
                                                        <button className='btn btn-danger btn-sm p-1 d-flex justify-content-center align-items-center'>
                                                            <Trash2 width={16} height={16} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </TableData>
                                    )}
                                </TableRow>
                            ),
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export { TabelaFuncionarios };
