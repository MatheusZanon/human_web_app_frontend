import { useEffect, useState } from 'react';
import styles from './vales-sst-card.module.scss';
import { Table, TableBody, TableData, TableHeader, TableRow, TableHead } from '@/components/table';
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';
import { useGetValesSST, usePutValesSST } from '@/api/http/financeiro_valores';
import { FinanceiroValesSST } from '@/utils/types/dashboard/financeiro_vales_sst';
import ValesSSTModal from './vales-sst-modal';
import { toast } from 'react-toastify';
import AlertMessage from '@/components/alert-message';

function CardValesSST({ ...props }) {
    const date = new Date();
    const [mes, setMes] = useState<number>(date.getMonth());
    const [ano, setAno] = useState<number>(date.getFullYear());
    const [url, setUrl] = useState<string>(
        `financeiro_valores/vales_sst/?limit=15&offset=0&mes=${mes ?? 0}&ano=${ano ?? 0}`,
    );
    const valesSST = useGetValesSST(url);
    const valesSSTResults =
        valesSST.isSuccess && valesSST.data && 'results' in valesSST.data ? valesSST.data.results : [];
    const {
        mutate: updateValeSST,
        isPending: isUpdatePending,
        error: updateError,
        isSuccess: isUpdateSuccess,
    } = usePutValesSST();

    const updateVale = async (vale: FinanceiroValesSST) => {
        updateValeSST(vale);
    };

    useEffect(() => {
        if (isUpdatePending) {
            toast.info('Atualizando vale', {
                position: 'bottom-right',
                autoClose: 5000,
            });
            return;
        }
    }, [isUpdatePending]);

    useEffect(() => {
        if (updateError) {
            toast.dismiss();
            toast.error('Erro ao atualizar vale', {
                position: 'bottom-right',
                autoClose: 5000,
            });
        }
    }, [updateError]);

    useEffect(() => {
        if (isUpdateSuccess) {
            toast.dismiss();
            toast.success('Vale atualizado com sucesso', {
                position: 'bottom-right',
                autoClose: 5000,
            });
        }
    }, [isUpdateSuccess]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setUrl(`financeiro_valores/vales_sst/?limit=15&offset=0&mes=${mes ?? 0}&ano=${ano ?? 0}`);
        }, 500); // Delay de 500ms para evitar muitas requisições enquanto digita

        return () => {
            clearTimeout(delayDebounce);
        };
    }, [mes, ano]);

    return (
        <div className={`card ${styles.card} shadow`}>
            <div className='card-body'>
                <h5 className='card-title'>{props.title}</h5>
                <div className='d-flex gap-2'>
                    {valesSST.data && valesSST.data.previous ? (
                        <button
                            type='button'
                            className='btn btn-primary'
                            onClick={() => valesSST.data.previous && setUrl(valesSST.data.previous)}
                        >
                            <ArrowBigLeftDash />
                        </button>
                    ) : (
                        <button type='button' className='btn btn-primary' disabled={true}>
                            <ArrowBigLeftDash />
                        </button>
                    )}

                    {valesSST.data && valesSST.data.next ? (
                        <button
                            type='button'
                            className='btn btn-primary'
                            onClick={() => valesSST.data.next && setUrl(valesSST.data.next)}
                        >
                            <ArrowBigRightDash />
                        </button>
                    ) : (
                        <button type='button' className='btn btn-primary' disabled={true}>
                            <ArrowBigRightDash />
                        </button>
                    )}
                    <select className='form-select w-25' value={mes} onChange={(e) => setMes(parseInt(e.target.value))}>
                        <option value='' disabled>
                            Mês
                        </option>
                        <option value='1'>Janeiro</option>
                        <option value='2'>Fevereiro</option>
                        <option value='3'>Março</option>
                        <option value='4'>Abril</option>
                        <option value='5'>Maio</option>
                        <option value='6'>Junho</option>
                        <option value='7'>Julho</option>
                        <option value='8'>Agosto</option>
                        <option value='9'>Setembro</option>
                        <option value='10'>Outubro</option>
                        <option value='11'>Novembro</option>
                        <option value='12'>Dezembro</option>
                    </select>
                    <input
                        type='number'
                        className='form-control w-25'
                        placeholder='Ano'
                        value={ano}
                        onChange={(e) => setAno(parseInt(e.target.value))}
                    />
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Nome</TableHeader>
                            <TableHeader>Vale Transporte</TableHeader>
                            <TableHeader>Assinatura Eletrônica</TableHeader>
                            <TableHeader>Vale Refeição</TableHeader>
                            <TableHeader>Ponto Eletrônico</TableHeader>
                            <TableHeader>Saúde/Segurança do Trabalho</TableHeader>
                            <TableHeader>Mês</TableHeader>
                            <TableHeader>Ano</TableHeader>
                            <TableHeader>Ações</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {valesSSTResults.length > 0 &&
                            valesSSTResults.map((vale) => (
                                <TableRow key={vale.id}>
                                    <TableData>{vale.nome_razao_social}</TableData>
                                    <TableData>
                                        {vale.vale_transporte.toFixed(2).toString().replace('.', ',')}
                                    </TableData>
                                    <TableData>
                                        {vale.assinat_eletronica.toFixed(2).toString().replace('.', ',')}
                                    </TableData>
                                    <TableData>{vale.vale_refeicao.toFixed(2).toString().replace('.', ',')}</TableData>
                                    <TableData>
                                        {vale.mensal_ponto_elet.toFixed(2).toString().replace('.', ',')}
                                    </TableData>
                                    <TableData>
                                        {vale.saude_seguranca_trabalho.toFixed(2).toString().replace('.', ',')}
                                    </TableData>
                                    <TableData>{(vale.mes = mes)}</TableData>
                                    <TableData>{(vale.ano = ano)}</TableData>
                                    <TableData>
                                        <div className='d-flex gap-2 justify-content-center'>
                                            <ValesSSTModal vale={vale} onUpdate={updateVale} />
                                        </div>
                                    </TableData>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                {!valesSSTResults.length && <AlertMessage message='Nenhum registro de vale encontrado!' />}
            </div>
        </div>
    );
}

export default CardValesSST;
