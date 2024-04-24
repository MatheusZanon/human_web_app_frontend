import { useState } from 'react';
import { Table, TableBody, TableHeader, TableHead, TableData, TableRow, TableFooter } from '@/components/table';
import type { getEconomiaFormal } from '@/utils/types/economia_formal';
import styles from './economia_formal_table.module.scss';

function EconomiaFormalTable({ data }: { data?: getEconomiaFormal[] }) {
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

    const sortedData = [...(data || [])].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const somatorio = (values: number[]) => {
        return values.reduce((a, b) => a + b, 0).toFixed(2);
    };

    return (
        <div className={`w-100 d-block ${styles.table_container}`}>
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
                            columnKey='regiao'
                            sortDirection={sortBy === 'regiao' ? sortDirection : ''}
                            onSort={() => handleSort('regiao')}
                            sortable
                        >
                            Região
                        </TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedData.map((row, index) => (
                        <TableRow key={`${row.nome_razao_social}_${index}`}>
                            <TableData>{row.nome_razao_social}</TableData>
                            <TableData>{row.economia_formal}</TableData>
                            <TableData>{row.regiao}</TableData>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableData>
                            <span className='fw-bold'>Total:</span>
                        </TableData>
                        <TableData>{somatorio(sortedData.map((row) => row.economia_formal))}</TableData>
                        <TableData></TableData>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}

export { EconomiaFormalTable };
