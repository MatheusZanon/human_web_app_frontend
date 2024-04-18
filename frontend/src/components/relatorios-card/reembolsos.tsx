import { useState } from 'react';
import { useGetReembolsos } from '@/api/http/financeiro_valores';
import { Table, TableBody, TableData, TableHeader, TableRow, TableHead  } from "@/components/table";
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';
import styles from './reembolsos-card.module.scss';

function CardReembolsos({ ...props }) {
    const [url, setUrl] = useState<string>('financeiro_valores/reembolsos/?limit=15&offset=0');
    const reembolsos = useGetReembolsos(url);
    const reembolsosResults = reembolsos.isSuccess && reembolsos.data && 'results' in reembolsos.data ? reembolsos.data.results : [];

    return (
        <div className={`card ${styles.card} shadow`}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <div className='d-flex gap-2'>
                    {reembolsos.data && reembolsos.data.previous ? 
                    <button type='button' className='btn btn-primary' onClick={() => reembolsos.data.previous && setUrl(reembolsos.data.previous)}><ArrowBigLeftDash/></button>
                        : 
                    <button type='button' className='btn btn-primary' disabled={true}><ArrowBigLeftDash/></button>}
        
                    {reembolsos.data && reembolsos.data.next ?
                    <button type='button' className='btn btn-primary' onClick={() => reembolsos.data.next && setUrl(reembolsos.data.next)}><ArrowBigRightDash/></button>
                        :
                    <button type='button' className='btn btn-primary' disabled={true}><ArrowBigRightDash/></button>}
                    <button type='button' className={`btn ${styles.addButton}`}>Adicionar Reembolso</button>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableHeader>ID</TableHeader>
                        <TableHeader>Nome</TableHeader>
                        <TableHeader>Descrição</TableHeader>
                        <TableHeader>Valor</TableHeader>
                        <TableHeader>Mês</TableHeader>
                        <TableHeader>Ano</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reembolsosResults.map(reembolso => (
                        <TableRow key={reembolso.id}>
                            <TableData>{reembolso.id}</TableData>
                            <TableData>{reembolso.nome_razao_social}</TableData>
                            <TableData>{reembolso.descricao}</TableData>
                            <TableData>{reembolso.valor.toFixed(2).toString().replace('.',',')}</TableData>
                            <TableData>{reembolso.mes}</TableData>
                            <TableData>{reembolso.ano}</TableData>
                        </TableRow>
                         ))}   
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default CardReembolsos;