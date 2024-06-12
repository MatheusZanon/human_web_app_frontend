import { useGetClientesFolhaPonto } from '@/api/http/clientes_financeiro';
import { Content } from '@/components/layout/content';
import { Table, TableBody, TableData, TableFooter, TableHead, TableHeader, TableRow } from '@/components/table';
import { formatCellphone, formatCnpj, formatCpf } from '@/libs';
import { Cliente } from '@/utils/types/cliente';
import { useState } from 'react';

export default function ClientesFinanceiroRH() {
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortBy, setSortBy] = useState<keyof Cliente>('id');
    const [url, setUrl] = useState<string>('clientes_financeiro/folha_ponto?limit=12&offset=0');
    const { data: clientes, isSuccess: isGetClientesSuccess } = useGetClientesFolhaPonto(url);
    const offset = Number(url.split('offset=')[1] || 0);
    const page = offset >= Number(clientes?.count || 0) ? -1 : offset / 12 + 1;

    const handleSort = (columnKey: keyof Cliente) => {
        if (sortBy === columnKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(columnKey as keyof Cliente);
            setSortDirection('asc');
        }
    };

    const sortedData = [...(clientes?.results || [])].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
    return (
        <Content title='Folha de Ponto'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader
                            columnKey='nome_razao_social'
                            sortable
                            sortDirection={sortBy === 'nome_razao_social' ? sortDirection : undefined}
                            onSort={() => {
                                handleSort('nome_razao_social');
                            }}
                        >
                            Nome
                        </TableHeader>
                        <TableHeader>CNPJ</TableHeader>
                        <TableHeader>CPF</TableHeader>
                        <TableHeader
                            columnKey='telefone_celular'
                            sortable
                            sortDirection={sortBy === 'telefone_celular' ? sortDirection : undefined}
                            onSort={() => {
                                handleSort('telefone_celular');
                            }}
                        >
                            Telefone
                        </TableHeader>
                        <TableHeader
                            columnKey='regiao'
                            sortable
                            sortDirection={sortBy === 'regiao' ? sortDirection : undefined}
                            onSort={() => {
                                handleSort('regiao');
                            }}
                        >
                            Região
                        </TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isGetClientesSuccess &&
                        clientes.results.length > 0 &&
                        sortedData.map((cliente) => (
                            <TableRow key={cliente.id}>
                                <TableData>{cliente.nome_razao_social}</TableData>
                                <TableData>{cliente.cnpj && formatCnpj(cliente.cnpj)}</TableData>
                                <TableData>{cliente.cpf && formatCpf(cliente.cpf)}</TableData>
                                <TableData>
                                    {cliente.telefone_celular && formatCellphone(cliente.telefone_celular)}
                                </TableData>
                                <TableData>{cliente.regiao}</TableData>
                            </TableRow>
                        ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableData colSpan={4}>
                            {clientes && `Página ${page} de ${Math.ceil(clientes.count / 12)}`}
                        </TableData>
                        <TableData>
                            {isGetClientesSuccess && (
                                <div className='d-flex gap-2'>
                                    <button
                                        className='btn btn-sm btn-outline-secondary'
                                        onClick={() => setUrl(clientes.previous ?? '')}
                                        disabled={!clientes.previous}
                                    >
                                        Anterior
                                    </button>
                                    <button
                                        className='btn btn-sm btn-outline-secondary'
                                        onClick={() => setUrl(clientes.next ?? '')}
                                        disabled={!clientes.next}
                                    >
                                        Próximo
                                    </button>
                                </div>
                            )}
                        </TableData>
                    </TableRow>
                </TableFooter>
            </Table>
        </Content>
    );
}
