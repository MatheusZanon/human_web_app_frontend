import { useState } from 'react';
import { Table, TableBody, TableHeader, TableHead, TableData, TableRow } from '@/components/table';
import type { getEconomiaFormal } from '@/utils/types/economia_formal';

function EconomiaFormalTable({ data }: { data: getEconomiaFormal[] }) {
    const [sortBy, setSortBy] = useState<keyof getEconomiaFormal>('nome_razao_social');
    const [sortDirection, setSortDirection] = useState('asc');
    const handleSort = (columnKey: string) => {
        if (sortBy === columnKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(columnKey as keyof getEconomiaFormal);
            setSortDirection('asc');
        }
    };

    const sortedData = [...data].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeader
                        columnKey='nome_razao_social'
                        sortDirection={sortBy === 'nome_razao_social' ? sortDirection : ''}
                        onSort={() => handleSort('nome_razao_social')}
                        sortable
                    >
                        Empresa
                    </TableHeader>
                    <TableHeader
                        columnKey='economia_formal'
                        sortDirection={sortBy === 'economia_formal' ? sortDirection : ''}
                        onSort={() => handleSort('economia_formal')}
                        sortable
                    >
                        Economia Formal
                    </TableHeader>
                    <TableHeader
                        columnKey='mes'
                        sortDirection={sortBy === 'mes' ? sortDirection : ''}
                        onSort={() => handleSort('mes')}
                        sortable
                    >
                        Mês
                    </TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedData.map((row, index) => (
                    <TableRow key={`${row.nome_razao_social}_${index}`}>
                        <TableData>{row.nome_razao_social}</TableData>
                        <TableData>{row.economia_formal}</TableData>
                        <TableData>{row.mes}</TableData>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export { EconomiaFormalTable };
