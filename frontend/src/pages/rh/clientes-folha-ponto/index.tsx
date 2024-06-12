import { useGetClientesFolhaPonto } from '@/api/http/clientes_financeiro';
import AlertMessage from '@/components/alert-message';
import {
    BaseModalBody,
    BaseModalContent,
    BaseModalHeader,
    BaseModalRoot,
    BaseModalTitle,
} from '@/components/baseModal';
import { Content } from '@/components/layout/content';
import { Table, TableBody, TableData, TableHead, TableHeader, TableRow } from '@/components/table';
import { formatCnpj, formatCpf } from '@/libs';
import { Cliente } from '@/utils/types/financeiro/cliente';
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';
import { useState } from 'react';

export default function ClientesFolhaPontoRH() {
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortBy, setSortBy] = useState<keyof Cliente>('nome_razao_social');
    const [url, setUrl] = useState<string>('clientes_financeiro/folha_ponto?limit=12&offset=0');
    const { data: clientesFolhaPonto, isSuccess: isGetClientesFolhaPontoSuccess } = useGetClientesFolhaPonto(url);
    const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

    const handleSort = (columnKey: keyof Cliente) => {
        if (sortBy === columnKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(columnKey as keyof Cliente);
            setSortDirection('asc');
        }
    };

    const clientes = isGetClientesFolhaPontoSuccess
        ? clientesFolhaPonto.results.map((cliente) => {
              return cliente.cliente;
          })
        : [];

    const sortedData = [...clientes].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    return (
        <Content title='Folha de Ponto'>
            {isGetClientesFolhaPontoSuccess && (
                <div className='d-flex gap-2'>
                    <button
                        className='btn btn-primary'
                        onClick={() => setUrl(clientesFolhaPonto.previous ?? '')}
                        disabled={!clientesFolhaPonto.previous}
                    >
                        <ArrowBigLeftDash />
                    </button>
                    <button
                        className='btn btn-primary'
                        onClick={() => setUrl(clientesFolhaPonto.next ?? '')}
                        disabled={!clientesFolhaPonto.next}
                    >
                        <ArrowBigRightDash />
                    </button>
                </div>
            )}
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
                            columnKey='email'
                            sortable
                            sortDirection={sortBy === 'email' ? sortDirection : undefined}
                            onSort={() => {
                                handleSort('email');
                            }}
                        >
                            Email
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
                    {sortedData &&
                        sortedData.length > 0 &&
                        sortedData.map((cliente) => (
                            <TableRow key={cliente.id}>
                                <TableData>{cliente.nome_razao_social}</TableData>
                                <TableData>{cliente.cnpj && formatCnpj(cliente.cnpj)}</TableData>
                                <TableData>{cliente.cpf && formatCpf(cliente.cpf)}</TableData>
                                <TableData>{cliente.email}</TableData>
                                <TableData>{cliente.regiao}</TableData>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            {sortedData && sortedData.length < 1 && <AlertMessage message='Nenhum registro encontrado' />}

            <BaseModalRoot modalKey='edit'>
                <BaseModalContent>
                    <BaseModalHeader>
                        <BaseModalTitle>Editar registro de folha {selectedCliente?.nome_razao_social}</BaseModalTitle>
                    </BaseModalHeader>
                    <BaseModalBody>Teste</BaseModalBody>
                </BaseModalContent>
            </BaseModalRoot>
        </Content>
    );
}
