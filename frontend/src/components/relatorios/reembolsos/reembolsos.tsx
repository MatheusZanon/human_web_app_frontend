import { useEffect, useState } from 'react';
import { useGetReembolsos } from '@/api/http/financeiro_valores';
import { Table, TableBody, TableData, TableHeader, TableRow, TableHead  } from "@/components/table";
import { ArrowBigLeftDash, ArrowBigRightDash, Pencil, Trash2, AlertTriangle, Plus } from 'lucide-react';
import styles from './reembolsos-card.module.scss';

function CardReembolsos({ ...props }) {
    const date = new Date();
    const [mes, setMes] = useState<number>(date.getMonth());
    const [ano, setAno] = useState<number>(date.getFullYear());
    const [url, setUrl] = useState<string>(`financeiro_valores/reembolsos/?limit=15&offset=0&mes=${mes ?? 0}&ano=${ano ?? 0}`);
    const reembolsos = useGetReembolsos(url);
    const reembolsosResults = reembolsos.isSuccess && reembolsos.data && 'results' in reembolsos.data ? reembolsos.data.results : [];

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
          setUrl(`financeiro_valores/reembolsos/?limit=15&offset=0&mes=${mes ?? 0}&ano=${ano ?? 0}`);
        }, 500);  // Delay de 500ms para evitar muitas requisições enquanto digita
        
        return () => {
          clearTimeout(delayDebounce);
        };
      }, [mes, ano]);

    return (
        <div className={`card ${styles.card} shadow`}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <div className={`d-flex gap-2 ${styles.reembolsosActions}`}>
                    {reembolsos.data && reembolsos.data.previous ? 
                    <button type='button' className='btn btn-primary' onClick={() => reembolsos.data.previous && setUrl(reembolsos.data.previous)}><ArrowBigLeftDash/></button>
                        : 
                    <button type='button' className='btn btn-primary' disabled={true}><ArrowBigLeftDash/></button>}
        
                    {reembolsos.data && reembolsos.data.next ?
                    <button type='button' className='btn btn-primary' onClick={() => reembolsos.data.next && setUrl(reembolsos.data.next)}><ArrowBigRightDash/></button>
                        :
                    <button type='button' className='btn btn-primary' disabled={true}><ArrowBigRightDash/></button>}
                    <select className="form-select w-25" value={mes} onChange={(e) => setMes(parseInt(e.target.value))}>
                        <option value="" disabled>Mês</option>
                        <option value="1">Janeiro</option>
                        <option value="2">Fevereiro</option>
                        <option value="3">Março</option>
                        <option value="4">Abril</option>
                        <option value="5">Maio</option>
                        <option value="6">Junho</option>
                        <option value="7">Julho</option>
                        <option value="8">Agosto</option>
                        <option value="9">Setembro</option>
                        <option value="10">Outubro</option>
                        <option value="11">Novembro</option>
                        <option value="12">Dezembro</option>
                    </select>
                    <input type="number" className="form-control w-25" placeholder="Ano" value={ano} onChange={(e) => setAno(parseInt(e.target.value))}/>
                    <button type='button' className="btn btn-secondary"><Plus/> Adicionar Reembolso</button>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableHeader>Nome</TableHeader>
                        <TableHeader>Descrição</TableHeader>
                        <TableHeader>Valor</TableHeader>
                        <TableHeader>Mês</TableHeader>
                        <TableHeader>Ano</TableHeader>
                        <TableHeader>Ações</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reembolsosResults.length > 0 && reembolsosResults.map(reembolso => (
                        <TableRow key={reembolso.id}>
                            <TableData>{reembolso.nome_razao_social}</TableData>
                            <TableData>{reembolso.descricao}</TableData>
                            <TableData>{reembolso.valor.toFixed(2).toString().replace('.',',')}</TableData>
                            <TableData>{reembolso.mes}</TableData>
                            <TableData>{reembolso.ano}</TableData>
                            <TableData>
                                <div className='d-flex gap-2 justify-content-center'>
                                    <button className='btn btn-warning btn-sm p-1 d-flex justify-content-center align-items-center'
                                    onClick={() => {}}>
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
                {!reembolsosResults.length && 
                    <h6 className='text-center align-self-center'>Nenhum reembolso encontrado <p className='mt-2'><AlertTriangle/></p></h6>
                }  
            </div>
        </div>
    );
}

export default CardReembolsos;