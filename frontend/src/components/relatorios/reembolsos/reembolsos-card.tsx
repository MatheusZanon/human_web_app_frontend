import { useEffect, useMemo, useState } from 'react';
import { useDeleteReembolso, useGetReembolsos, usePostReembolso, usePutReembolso } from '@/api/http/financeiro_valores';
import { Table, TableBody, TableData, TableHeader, TableRow, TableHead } from '@/components/table';
import { ArrowBigLeftDash, ArrowBigRightDash, Pencil, Trash2, AlertTriangle, Plus } from 'lucide-react';
import styles from './reembolsos-card.module.scss';
import {
    BaseModalBody,
    BaseModalCloseButton,
    BaseModalContent,
    BaseModalFooter,
    BaseModalHeader,
    BaseModalProvider,
    BaseModalRoot,
    BaseModalTitle,
    BaseModalTrigger,
} from '@/components/baseModal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSearch } from '@/components/dashboard/search/search-provider';
import { Search } from '@/components/dashboard/search';
import { toast } from 'react-toastify';
import { CriarReembolsoType, criarReembolsoSchema } from '@/utils/types/criar_reembolso';
import { AtualizarReembolsoType, atualizarReembolsoSchema } from '@/utils/types/atualizar_reembolso';
import AlertMessage from '@/components/alert-message';

function CardReembolsos({ ...props }) {
    const date = new Date();
    const [mes, setMes] = useState<number>(date.getMonth());
    const [ano, setAno] = useState<number>(date.getFullYear());
    const [url, setUrl] = useState<string>(
        `financeiro_valores/reembolsos/?limit=15&offset=0&mes=${mes ?? 0}&ano=${ano ?? 0}`,
    );
    const reembolsos = useGetReembolsos(url);
    const reembolsosResults =
        reembolsos.isSuccess && reembolsos.data && 'results' in reembolsos.data ? reembolsos.data.results : [];

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setUrl(`financeiro_valores/reembolsos/?limit=15&offset=0&mes=${mes ?? 0}&ano=${ano ?? 0}`);
        }, 500); // Delay de 500ms para evitar muitas requisições enquanto digita

        return () => {
            clearTimeout(delayDebounce);
        };
    }, [mes, ano]);

    const { selected, setSelected } = useSearch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<CriarReembolsoType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        resolver: zodResolver(criarReembolsoSchema),
    });

    useMemo(() => {
        setValue('nome_razao_social', selected);
    }, [selected, setValue]);

    const { mutate: postReembolso, isPending: isPostReembolsoPending, error: postReembolsoError } = usePostReembolso();

    const onSubmit = (data: CriarReembolsoType) => {
        postReembolso(data);

        if (isPostReembolsoPending && !postReembolsoError) {
            toast.info('Criando reembolso...', {
                position: 'bottom-right',
                autoClose: 3000,
            });
        }

        if (postReembolsoError) {
            toast.error(`Ocorreu um erro ao criar o reembolso: ${postReembolsoError.response?.data}`, {
                position: 'bottom-right',
                autoClose: 3000,
            });
        }

        if (!isPostReembolsoPending && !postReembolsoError) {
            toast.success('Reembolso criado!', {
                position: 'bottom-right',
                autoClose: 3000,
            });
            setSelected('');
        }
    };

    const {
        register: atualizarReembolsoRegister,
        handleSubmit: atualizarReembolsoHandleSubmit,
        formState: { errors: atualizarReembolsoErrors },
        setValue: atualizarReembolsoSetValue,
    } = useForm<AtualizarReembolsoType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        resolver: zodResolver(atualizarReembolsoSchema),
    });

    const { mutate: putReembolso, isPending: isPutReembolsoPending, error: putReembolsoError } = usePutReembolso();

    const atualizarReembolsoOnSubmit = (data: AtualizarReembolsoType) => {
        putReembolso(data);

        if (isPutReembolsoPending && !putReembolsoError) {
            toast.info('Atualizando reembolso...', {
                position: 'bottom-right',
                autoClose: 3000,
            });
        }

        if (putReembolsoError) {
            toast.error(`Ocorreu um erro ao atualizar o reembolso: ${putReembolsoError.response?.data}`, {
                position: 'bottom-right',
                autoClose: 3000,
            });
        }

        if (!isPutReembolsoPending && !putReembolsoError) {
            toast.success('Reembolso atualizado!', {
                position: 'bottom-right',
                autoClose: 3000,
            });
        }
    };

    const {
        mutate: deleteReembolso,
        isPending: isDeleteReembolsoPending,
        error: deleteReembolsoError,
    } = useDeleteReembolso();

    const excluirReembolsoHandleSubmit = (reembolsoId: number) => {
        deleteReembolso({ id: reembolsoId });

        if (isDeleteReembolsoPending && !deleteReembolsoError) {
            toast.info('Excluindo reembolso...', {
                position: 'bottom-right',
                autoClose: 3000,
            });
        }

        if (deleteReembolsoError) {
            toast.error(`Ocorreu um erro ao excluir o reembolso: ${deleteReembolsoError.response?.data}`, {
                position: 'bottom-right',
                autoClose: 3000,
            });
        }

        if (!isDeleteReembolsoPending && !deleteReembolsoError) {
            toast.success('Reembolso excluído!', {
                position: 'bottom-right',
                autoClose: 3000,
            });
        }
    };

    return (
        <div className={`card ${styles.card} shadow`}>
            <div className='card-body'>
                <h5 className='card-title'>{props.title}</h5>
                <div className={`d-flex gap-2 ${styles.reembolsosActions}`}>
                    {reembolsos.data && reembolsos.data.previous ? (
                        <button
                            type='button'
                            className='btn btn-primary'
                            onClick={() => reembolsos.data.previous && setUrl(reembolsos.data.previous)}
                        >
                            <ArrowBigLeftDash />
                        </button>
                    ) : (
                        <button type='button' className='btn btn-primary' disabled={true}>
                            <ArrowBigLeftDash />
                        </button>
                    )}

                    {reembolsos.data && reembolsos.data.next ? (
                        <button
                            type='button'
                            className='btn btn-primary'
                            onClick={() => reembolsos.data.next && setUrl(reembolsos.data.next)}
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
                    <BaseModalProvider>
                        <BaseModalTrigger variant='secondary'>
                            <Plus /> Adicionar Reembolso
                        </BaseModalTrigger>
                        <BaseModalRoot>
                            <BaseModalContent>
                                <BaseModalHeader>
                                    <BaseModalTitle>Adicionar Reembolso</BaseModalTitle>
                                </BaseModalHeader>
                                <BaseModalBody>
                                    <form className='d-flex flex-column gap-2'>
                                        <div className='w-100'>
                                            <label htmlFor='empresa' className='form-label'>
                                                Empresa
                                            </label>
                                            <Search companyFilter />
                                            {errors.nome_razao_social && (
                                                <span className='text-danger'>{errors.nome_razao_social.message}</span>
                                            )}
                                        </div>
                                        <div className='w-100'>
                                            <label htmlFor='descricao' className='form-label'>
                                                Descrição
                                            </label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder='Descrição'
                                                {...register('descricao')}
                                            />
                                            {errors.descricao && (
                                                <span className='text-danger'>{errors.descricao.message}</span>
                                            )}
                                        </div>
                                        <div className='w-100'>
                                            <label htmlFor='valor' className='form-label'>
                                                Valor
                                            </label>
                                            <input
                                                type='number'
                                                className='form-control'
                                                placeholder='Valor'
                                                {...register('valor')}
                                            />
                                            {errors.valor && (
                                                <span className='text-danger'>{errors.valor.message}</span>
                                            )}
                                        </div>
                                        <div className='w-100'>
                                            <label htmlFor='mes' className='form-label'>
                                                Mes
                                            </label>
                                            <select className='form-select' {...register('mes')}>
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
                                            {errors.mes && <span className='text-danger'>{errors.mes.message}</span>}
                                        </div>
                                        <div className='w-100'>
                                            <label htmlFor='ano' className='form-label'>
                                                Ano
                                            </label>
                                            <input
                                                type='number'
                                                className='form-control'
                                                placeholder='Ano'
                                                {...register('ano')}
                                            />
                                            {errors.ano && <span className='text-danger'>{errors.ano.message}</span>}
                                        </div>
                                    </form>
                                </BaseModalBody>
                                <BaseModalFooter>
                                    <button type='button' className='btn btn-primary' onClick={handleSubmit(onSubmit)}>
                                        Adicionar
                                    </button>
                                </BaseModalFooter>
                            </BaseModalContent>
                        </BaseModalRoot>
                    </BaseModalProvider>
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
                        {reembolsosResults.length > 0 &&
                            reembolsosResults.map((reembolso) => (
                                <TableRow key={reembolso.id}>
                                    <TableData>{reembolso.nome_razao_social}</TableData>
                                    <TableData>{reembolso.descricao}</TableData>
                                    <TableData>{reembolso.valor.toFixed(2).toString().replace('.', ',')}</TableData>
                                    <TableData>{reembolso.mes}</TableData>
                                    <TableData>{reembolso.ano}</TableData>
                                    <TableData>
                                        <div className='d-flex gap-2'>
                                            <BaseModalProvider
                                                onOpenCallback={() => atualizarReembolsoSetValue('id', reembolso.id)}
                                            >
                                                <BaseModalTrigger variant='warning' size='sm'>
                                                    <Pencil size={16} />
                                                </BaseModalTrigger>
                                                <BaseModalRoot>
                                                    <BaseModalContent>
                                                        <BaseModalHeader>
                                                            <BaseModalTitle>{`Editar Reembolso`}</BaseModalTitle>
                                                        </BaseModalHeader>
                                                        <BaseModalBody>
                                                            <form className='w-100'>
                                                                <div className='w-100'>
                                                                    <label htmlFor='descricao' className='form-label'>
                                                                        Descrição
                                                                    </label>
                                                                    <input
                                                                        type='text'
                                                                        className='form-control'
                                                                        placeholder='Descrição'
                                                                        {...atualizarReembolsoRegister('descricao')}
                                                                        defaultValue={reembolso.descricao}
                                                                    />
                                                                    {atualizarReembolsoErrors.descricao && (
                                                                        <span className='text-danger'>
                                                                            {atualizarReembolsoErrors.descricao.message}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className='w-100'>
                                                                    <label htmlFor='valor' className='form-label'>
                                                                        Valor
                                                                    </label>
                                                                    <input
                                                                        type='number'
                                                                        className='form-control'
                                                                        placeholder='Valor'
                                                                        {...atualizarReembolsoRegister('valor')}
                                                                        defaultValue={reembolso.valor}
                                                                    />
                                                                    {atualizarReembolsoErrors.valor && (
                                                                        <span className='text-danger'>
                                                                            {atualizarReembolsoErrors.valor.message}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className='w-100'>
                                                                    <label htmlFor='mes' className='form-label'>
                                                                        Mes
                                                                    </label>
                                                                    <input
                                                                        type='number'
                                                                        className='form-control'
                                                                        placeholder='Mes'
                                                                        {...atualizarReembolsoRegister('mes')}
                                                                        defaultValue={reembolso.mes}
                                                                    />
                                                                    {atualizarReembolsoErrors.mes && (
                                                                        <span className='text-danger'>
                                                                            {atualizarReembolsoErrors.mes.message}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className='w-100'>
                                                                    <label htmlFor='ano' className='form-label'>
                                                                        Ano
                                                                    </label>
                                                                    <input
                                                                        type='number'
                                                                        className='form-control'
                                                                        placeholder='Ano'
                                                                        {...atualizarReembolsoRegister('ano')}
                                                                        defaultValue={reembolso.ano}
                                                                    />
                                                                    {atualizarReembolsoErrors.ano && (
                                                                        <span className='text-danger'>
                                                                            {atualizarReembolsoErrors.ano.message}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </form>
                                                        </BaseModalBody>
                                                        <BaseModalFooter>
                                                            <div className='w-100'>
                                                                <button
                                                                    type='button'
                                                                    onClick={atualizarReembolsoHandleSubmit(
                                                                        atualizarReembolsoOnSubmit,
                                                                    )}
                                                                    className='btn btn-primary'
                                                                >
                                                                    Salvar
                                                                </button>
                                                            </div>
                                                        </BaseModalFooter>
                                                    </BaseModalContent>
                                                </BaseModalRoot>
                                            </BaseModalProvider>
                                            <BaseModalProvider>
                                                <BaseModalTrigger variant='danger' size='sm'>
                                                    <Trash2 size={16} />
                                                </BaseModalTrigger>
                                                <BaseModalRoot>
                                                    <BaseModalContent>
                                                        <BaseModalHeader>
                                                            <BaseModalTitle>
                                                                <AlertTriangle size={20} />
                                                                {`Excluir Reembolso`}
                                                            </BaseModalTitle>
                                                        </BaseModalHeader>
                                                        <BaseModalBody>
                                                            <div className='w-100'>
                                                                <p>{`Tem certeza que deseja excluir o reembolso "${reembolso.descricao}" do cliente ${reembolso.nome_razao_social} de ${reembolso.mes}/${reembolso.ano}?`}</p>
                                                                <div className='d-flex gap-2'>
                                                                    <button
                                                                        className='btn btn-danger'
                                                                        type='button'
                                                                        onClick={() =>
                                                                            excluirReembolsoHandleSubmit(reembolso.id)
                                                                        }
                                                                    >
                                                                        Sim
                                                                    </button>
                                                                    <BaseModalCloseButton variant='primary'>
                                                                        Não
                                                                    </BaseModalCloseButton>
                                                                </div>
                                                            </div>
                                                        </BaseModalBody>
                                                    </BaseModalContent>
                                                </BaseModalRoot>
                                            </BaseModalProvider>
                                        </div>
                                    </TableData>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                {!reembolsosResults.length && 
                    <AlertMessage message="Nenhum reembolso encontrado!"/>
                }  
            </div>
        </div>
    );
}

export default CardReembolsos;
