import { useState } from 'react';
import { useGetReembolsos } from '@/api/http/financeiro_valores';
import { Table, TableBody, TableData, TableHeader, TableRow, TableHead  } from "@/components/table";
import styles from './reembolsos-card.module.scss';

function CardReembolsos({ ...props }) {
    const [url, setUrl] = useState<string>('financeiro_valores/reembolsos/?limit=15&offset=0');
    const reembolsos = useGetReembolsos(url);
    const reembolsosResults = reembolsos.isSuccess && reembolsos.data && 'results' in reembolsos.data ? reembolsos.data.results : [];
    console.log(reembolsos)
    return (
        <div className={`card ${styles.card}`}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableHeader>ID</TableHeader>
                        <TableHeader>Nome</TableHeader>
                        <TableHeader>Descrição</TableHeader>
                        <TableHeader>Valor</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reembolsosResults.map(reembolso => (
                        <TableRow key={reembolso.id}>
                            <TableData>{reembolso.id}</TableData>
                            <TableData>{reembolso.nome_razao_social}</TableData>
                            <TableData>{reembolso.descricao}</TableData>
                            <TableData>{reembolso.valor.toFixed(2).toString().replace('.',',')}</TableData>
                        </TableRow>
                         ))}   
                    </TableBody>
                </Table>
                <div className='d-flex gap-2'>
                    {reembolsos.data && reembolsos.data.previous ? 
                    <button type='button' className='btn btn-primary' onClick={() => reembolsos.data.previous && setUrl(reembolsos.data.previous)}>Anterior</button>
                        : 
                    <button type='button' className='btn btn-primary' disabled={true}>Anterior</button>}
        
                    {reembolsos.data && reembolsos.data.next ?
                    <button type='button' className='btn btn-primary' onClick={() => reembolsos.data.next && setUrl(reembolsos.data.next)}>Próximo</button>
                        :
                    <button type='button' className='btn btn-primary' disabled={true}>Próximo</button>}
                </div>
            </div>
        </div>
    );
}

export default CardReembolsos;