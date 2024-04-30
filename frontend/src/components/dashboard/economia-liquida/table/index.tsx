import { useState } from 'react';
import { Table, TableBody, TableHeader, TableHead, TableData, TableRow, TableFooter } from '@/components/table';
import type { getEconomiaLiquida } from '@/utils/types/economia_liquida';
import styles from './economia_liquida_table.module.scss';

function EconomiaLiquidaTable({ data }: { data?: getEconomiaLiquida[] }) {
    const [sortBy, setSortBy] = useState<keyof getEconomiaLiquida>('nome_razao_social');
    const [sortDirection, setSortDirection] = useState('asc');
    const handleSort = (columnKey: string) => {
        if (sortBy === columnKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(columnKey as keyof getEconomiaLiquida);
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
                            columnKey='economia_liquida'
                            sortDirection={sortBy === 'economia_liquida' ? sortDirection : ''}
                            onSort={() => handleSort('economia_liquida')}
                            sortable
                        >
                            Valor
                        </TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedData.map((row, index) => (
                        <TableRow key={`${row.nome_razao_social}_${index}`}>
                            <TableData>{row.nome_razao_social ? row.nome_razao_social : 'Não informado'}</TableData>
                            <TableData>{row.economia_liquida ? row.economia_liquida.toFixed(2).toString().replace('.', ',') : '0,00'}</TableData>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableData>
                            <span className='fw-bold'>Total:</span>
                        </TableData>
                        <TableData>{somatorio(sortedData.map((row) => row.economia_liquida))}</TableData>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}

export { EconomiaLiquidaTable };
