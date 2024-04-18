import { useState } from 'react';
import styles from './vales-sst.module.scss';
import { Table, TableBody, TableData, TableHeader, TableRow, TableHead  } from "@/components/table";
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';
import { useGetValesSST } from '@/api/http/financeiro_valores';

function CardValesSST({ ...props }) {
    const [url, setUrl] = useState<string>('financeiro_valores/vales_sst/?limit=15&offset=0');
    const valesSST = useGetValesSST(url);
    const valesSSTResults = valesSST.isSuccess && valesSST.data && 'results' in valesSST.data ? valesSST.data.results : [];
    
    return (
        <div className={`card ${styles.card} shadow`}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <div className='d-flex gap-2'>
                    {valesSST.data && valesSST.data.previous ? 
                    <button type='button' className='btn btn-primary' onClick={() => valesSST.data.previous && setUrl(valesSST.data.previous)}><ArrowBigLeftDash/></button>
                        : 
                    <button type='button' className='btn btn-primary' disabled={true}><ArrowBigLeftDash/></button>}
        
                    {valesSST.data && valesSST.data.next ?
                    <button type='button' className='btn btn-primary' onClick={() => valesSST.data.next && setUrl(valesSST.data.next)}><ArrowBigRightDash/></button>
                        :
                    <button type='button' className='btn btn-primary' disabled={true}><ArrowBigRightDash/></button>}
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableHeader>ID</TableHeader>
                        <TableHeader>Nome</TableHeader>
                        <TableHeader>Vale Transporte</TableHeader>
                        <TableHeader>Assinatura Eletrônica</TableHeader>
                        <TableHeader>Vale Refeição</TableHeader>
                        <TableHeader>Ponto Eletrônico</TableHeader>
                        <TableHeader>Saúde/Segurança do Trabalho</TableHeader>
                        <TableHeader>Mês</TableHeader>
                        <TableHeader>Ano</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {valesSSTResults.map(vale => (
                            <TableRow key={vale.id}>
                            <TableData>{vale.id}</TableData>
                            <TableData>{vale.nome_razao_social}</TableData>
                            <TableData>{vale.vale_transporte.toFixed(2).toString().replace('.',',')}</TableData>
                            <TableData>{vale.assinat_eletronica.toFixed(2).toString().replace('.',',')}</TableData>
                            <TableData>{vale.vale_refeicao.toFixed(2).toString().replace('.',',')}</TableData>
                            <TableData>{vale.mensal_ponto_elet.toFixed(2).toString().replace('.',',')}</TableData>
                            <TableData>{vale.saude_seguranca_trabalho.toFixed(2).toString().replace('.',',')}</TableData>
                            <TableData>{vale.mes}</TableData>
                            <TableData>{vale.ano}</TableData>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default CardValesSST;