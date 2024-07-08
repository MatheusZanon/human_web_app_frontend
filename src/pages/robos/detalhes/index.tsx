import {
    useRoboById,
    useRoboParametrosById,
    useGetRoboRotinasById,
    useExecutarRobo,
    useDeleteParametro,
    useDeleteRotina,
} from '@/api/http/robos';
import { RoboParametrosType } from '@/api/http/robos';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import { fromNowDays } from '@/libs';
import { Pencil, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { CriarRoboParametroModal } from '@/components/robos/criar-robo-parametro';
import { CriarRoboRotinaModal } from '@/components/robos/criar-robo-rotina';
import { AlterarRoboParametro } from '@/components/robos/alterar-robo-parametro';
import { AlterarRoboRotina } from '@/components/robos/alterar-robo-rotinas';
import LoadingScreen from '@/components/loading-screen';
import { Content } from '@/components/layout/content';
import { BaseModalProvider, BaseModalTrigger } from '@/components/baseModal';
import { useEffect, useMemo, useState } from 'react';
import { RoboParametros } from '@/utils/types/robos/robo_parametros';
import RoboRotina from '@/utils/types/robos/robo_rotinas';
import { useGetClientesFinanceiro } from '@/api/http/dashboard';
import UploadDropzone from '@/components/upload-dropzone';
import { Search } from '@/components/dashboard/search';
import { CriarRoboOptionModal } from '@/components/robos/criar-robo-parametro/select/criar-option';
import { useSearch } from '@/components/dashboard/search/search-provider';

function RoboDetalhes() {
    const { roboId } = useParams();
    const { register, getValues, setValue, watch } = useForm<RoboParametrosType>();
    const { selected } = useSearch();

    useEffect(() => {
        setValue('Centro de Custo', selected);
    }, [selected, setValue]);

    const {
        data: roboParametros,
        isLoading: isRoboParametrosLoading,
        isSuccess: isRoboParametrosSuccess,
        isStale: isRoboParametrosStale,
        failureReason,
        failureCount,
    } = useRoboParametrosById({ roboId: roboId ? roboId : '' });

    const {
        data: roboDetalhes,
        isLoading: isRoboDetalhesLoading,
        isSuccess: isRoboDetalhesSuccess,
        isStale: isRoboDetalhesStale,
    } = useRoboById({ roboId: roboId ? roboId : '' });

    const { data: roboRotinas, isSuccess: isRoboRotinasSuccess } = useGetRoboRotinasById({
        roboId: roboId ? roboId : '',
    });

    const initialFolderId = import.meta.env.VITE_FOLDER_ID;
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');

    const configuraMes = (data: string) => {
        setMes(data);
    };
    const configuraAno = (data: string) => {
        setAno(data);
    };

    useMemo(() => {
        if (roboParametros) {
            roboParametros.map((parametro) => {
                setValue(parametro.parametro_info.nome, parametro?.valor);
                if (roboDetalhes?.nome === 'Organiza Extrato') {
                    if (parametro.parametro_info.nome === 'mes') {
                        configuraMes(parametro?.valor);
                    }
                    if (parametro.parametro_info.nome === 'ano') {
                        configuraAno(parametro?.valor);
                    }
                }
            });
        }
    }, [roboParametros, setValue, roboDetalhes]);

    const { mutate: executarRobo, isPending: isPendingExecutarRobo } = useExecutarRobo({
        roboId: roboId ? roboId : '',
    });

    const timeout =
        failureCount >= 3
            ? {
                  name: 'Timeout',
                  message: failureReason?.message,
                  type: failureReason?.name,
              }
            : null;

    const { hasRole } = useAuthenticatedUser();
    const {
        mutate: deleteParametro,
        isPending: isDeleteParametroPending,
        isSuccess: isDeleteParametroSuccess,
        isError: isDeleteParametroError,
        error,
    } = useDeleteParametro({
        roboId: roboId ? roboId : '',
    });
    const {
        mutate: deleteRotina,
        isPending: isDeleteRotinaPending,
        isSuccess: isDeleteRotinaSuccess,
        isError: isDeleteRotinaError,
    } = useDeleteRotina({
        roboId: roboId ? roboId : '',
    });

    const { data: clientesFinanceiro, isSuccess: isGetClientesFinanceiroSuccess } = useGetClientesFinanceiro();

    const handleDeleteParametro = (parametroId: number) => {
        deleteParametro(parametroId);
    };

    useEffect(() => {
        if (isDeleteParametroSuccess) {
            toast.success('Parâmetro excluído com sucesso!', {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    }, [isDeleteParametroSuccess]);

    useEffect(() => {
        if (isDeleteParametroError) {
            toast.error(`Erro ao excluir parâmetro! ${error?.response?.data}`, {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    }, [isDeleteParametroError, error]);

    const handleDeleteRotina = (rotinaId: number) => {
        deleteRotina(rotinaId);
    };

    useEffect(() => {
        if (isDeleteRotinaSuccess) {
            toast.success('Rotina excluída com sucesso!', {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    }, [isDeleteRotinaSuccess]);

    useEffect(() => {
        if (isDeleteRotinaError) {
            toast.error(`Erro ao excluir rotina! ${error?.response?.data}`, {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    }, [isDeleteRotinaError, error]);

    const [alterarParametro, setAlterarParametro] = useState<RoboParametros | undefined>(undefined);
    const [alterarRotina, setAlterarRotina] = useState<RoboRotina | undefined>(undefined);

    const rotinaForm = watch('rotina');
    useMemo(() => {
        setAlterarRotina(roboRotinas?.find((rotina) => rotina.nome === rotinaForm));
    }, [roboRotinas, rotinaForm]);

    return (
        <>
            {(isRoboParametrosLoading || isRoboDetalhesLoading) && (
                <div>
                    <LoadingScreen />
                </div>
            )}
            {(isRoboDetalhesSuccess || isRoboParametrosSuccess) && (
                <>
                    <Content title={`Robo - ${roboDetalhes?.nome}`}>
                        <BaseModalProvider>
                            <div className='d-flex gap-2'>
                                {hasRole('TI') && (
                                    <>
                                        <CriarRoboParametroModal roboId={roboId ? roboId : ''} />
                                        <CriarRoboRotinaModal roboId={roboId ? roboId : ''} />
                                        <CriarRoboOptionModal roboId={roboId ? roboId : ''} />
                                    </>
                                )}
                            </div>
                            <div className='d-flex gap-2 w-100'>
                                <div className='w-50'>
                                    {roboParametros && roboParametros.length > 0 ? (
                                        <>
                                            <h2>Parametros</h2>
                                            <form className='d-flex flex-column gap-2'>
                                                {roboParametros.map((parametro) => {
                                                    const isRelatoriosDemissionais = roboDetalhes?.nome === 'Relatórios Demissionais';
                                                    const isDispensaComJustaCausa = watch('rotina') === '2. Dispensa com Justa Causa';
                                                    const isSpecificBooleanParametro = ['trct', 'trct complementar', 'homologação', 'relatório de médias'].includes(parametro.parametro_info.nome.toLowerCase());
                                            
                                                    const showField = 
                                                        !isRelatoriosDemissionais ||
                                                        (isRelatoriosDemissionais && isSpecificBooleanParametro) ||
                                                        (isRelatoriosDemissionais && isDispensaComJustaCausa) ||
                                                        (!isRelatoriosDemissionais && isDispensaComJustaCausa) ||
                                                        (isRelatoriosDemissionais && parametro.parametro_info.tipo.toLowerCase() !== 'boolean' && parametro.parametro_info.nome.toLowerCase() !== 'descrição dos fatos');

                                                    return (
                                                        showField && (
                                                            <div key={parametro.id}>
                                                                <div className='flex-grow-1'>
                                                                    <label
                                                                        className='form-label d-flex justify-content-between'
                                                                        htmlFor={`parametro_${parametro.id}`}
                                                                    >
                                                                        <span className='flex-grow-1'>
                                                                            {parametro.parametro_info.nome}
                                                                        </span>
                                                                        <div className={`d-flex gap-2`}>
                                                                            {hasRole('TI') && (
                                                                                <>
                                                                                    <BaseModalTrigger
                                                                                        modalKey='alterar-robo-parametro'
                                                                                        onMouseEnter={() =>
                                                                                            setAlterarParametro(
                                                                                                parametro,
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <Pencil size={18} />
                                                                                    </BaseModalTrigger>
                                                                                    <button
                                                                                        className='btn py-0 px-2'
                                                                                        key={`delete-${parametro.id}`}
                                                                                        type='button'
                                                                                        onClick={() =>
                                                                                            handleDeleteParametro(
                                                                                                parseInt(parametro.id),
                                                                                            )
                                                                                        }
                                                                                        disabled={
                                                                                            isDeleteParametroPending
                                                                                        }
                                                                                        aria-disabled={
                                                                                            isDeleteParametroPending
                                                                                        }
                                                                                    >
                                                                                        <X size={18} />
                                                                                    </button>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </label>
                                                                    {parametro.parametro_info.tipo
                                                                        .toLowerCase()
                                                                        .trim() === 'centro_de_custo' && (
                                                                        <Search companyFilter />
                                                                    )}
                                                                    {parametro.parametro_info.tipo
                                                                        .toLowerCase()
                                                                        .trim() === 'select' && (
                                                                        <select
                                                                            className='form-select'
                                                                            {...register(parametro.parametro_info.nome)}
                                                                        >
                                                                            <option>Selecione</option>
                                                                            {parametro.parametro_info.options!.map(
                                                                                (option) => (
                                                                                    <option
                                                                                        key={option.id}
                                                                                        value={option.nome}
                                                                                    >
                                                                                        {option.nome}
                                                                                    </option>
                                                                                ),
                                                                            )}
                                                                        </select>
                                                                    )}
                                                                    {parametro.parametro_info.tipo
                                                                        .toLowerCase()
                                                                        .trim() === 'date' && (
                                                                        <input
                                                                            type='date'
                                                                            id={`parametro_${parametro.id}`}
                                                                            defaultValue={parametro.valor}
                                                                            {...register(parametro.parametro_info.nome)}
                                                                            className={`form-control`}
                                                                        />
                                                                    )}
                                                                    {parametro.parametro_info.tipo
                                                                        .toLowerCase()
                                                                        .trim() === 'integer' && (
                                                                        <input
                                                                            type='number'
                                                                            id={`parametro_${parametro.id}`}
                                                                            {...register(parametro.parametro_info.nome)}
                                                                            onChange={(e) => {
                                                                                setValue(
                                                                                    parametro.parametro_info.nome,
                                                                                    e.target.value,
                                                                                ),
                                                                                    roboDetalhes?.nome ===
                                                                                        'Organiza Extrato' &&
                                                                                        parametro.parametro_info
                                                                                            .nome === 'mes' &&
                                                                                        configuraMes(e.target.value);
                                                                                roboDetalhes?.nome ===
                                                                                    'Organiza Extrato' &&
                                                                                    parametro.parametro_info.nome ===
                                                                                        'ano' &&
                                                                                    configuraAno(e.target.value);
                                                                            }}
                                                                            className={`form-control`}
                                                                        />
                                                                    )}
                                                                    {parametro.parametro_info.tipo
                                                                        .toLowerCase()
                                                                        .trim() === 'float' && (
                                                                        <input
                                                                            type='number'
                                                                            id={`parametro_${parametro.id}`}
                                                                            defaultValue={parametro.valor}
                                                                            {...register(parametro.parametro_info.nome)}
                                                                            className={`form-control`}
                                                                        />
                                                                    )}
                                                                    {parametro.parametro_info.tipo
                                                                        .toLowerCase()
                                                                        .trim() === 'boolean' && (
                                                                        <input
                                                                            type='checkbox'
                                                                            id={`parametro_${parametro.id}`}
                                                                            defaultValue={parametro.valor}
                                                                            {...register(parametro.parametro_info.nome)}
                                                                            className={`form-check-input`}
                                                                        />
                                                                    )}
                                                                    {parametro.parametro_info.tipo
                                                                        .toLowerCase()
                                                                        .trim() === 'text' && (
                                                                        <input
                                                                            type='text'
                                                                            id={`parametro_${parametro.id}`}
                                                                            defaultValue={parametro.valor}
                                                                            {...register(parametro.parametro_info.nome)}
                                                                            className={`form-control`}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    );
                                                })}
                                                {isRoboRotinasSuccess && roboRotinas.length > 0 && (
                                                    <>
                                                        <div>
                                                            <label className='form-label d-flex justify-content-between'>
                                                                <span className='flex-grow-1'>Rotina</span>
                                                                <div className={`d-flex gap-2`}>
                                                                    {hasRole('TI') && (
                                                                        <>
                                                                            {roboRotinas.filter(
                                                                                (rotina) =>
                                                                                    rotina.nome === watch('rotina'),
                                                                            )[0] && (
                                                                                <>
                                                                                    <BaseModalTrigger modalKey='alterar-robo-rotina'>
                                                                                        <Pencil size={18} />
                                                                                    </BaseModalTrigger>

                                                                                    <button
                                                                                        className='btn py-0 px-2'
                                                                                        key={`delete-rotina`}
                                                                                        type='button'
                                                                                        onClick={() =>
                                                                                            handleDeleteRotina(
                                                                                                roboRotinas.filter(
                                                                                                    (rotina) =>
                                                                                                        rotina.nome ===
                                                                                                        getValues(
                                                                                                            'rotina',
                                                                                                        ),
                                                                                                )[0].id,
                                                                                            )
                                                                                        }
                                                                                        disabled={isDeleteRotinaPending}
                                                                                        aria-disabled={
                                                                                            isDeleteRotinaPending
                                                                                        }
                                                                                    >
                                                                                        <X size={18} />
                                                                                    </button>
                                                                                </>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </label>
                                                            <select
                                                                id='rotinas'
                                                                className='form-select'
                                                                defaultValue=''
                                                                {...register('rotina')}
                                                            >
                                                                <option value=''>Selecione uma rotina</option>
                                                                {roboRotinas.map((rotina) => (
                                                                    <option key={rotina.id} value={rotina.nome}>
                                                                        {rotina.nome}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        {watch('rotina') &&
                                                            watch('rotina') === '5. Refazer Processo' &&
                                                            isGetClientesFinanceiroSuccess && (
                                                                <>
                                                                    <div
                                                                        className='d-flex flex-column gap-1 overflow-y-auto mb-4'
                                                                        style={{ maxHeight: '200px' }}
                                                                    >
                                                                        {clientesFinanceiro.map((cliente) => (
                                                                            <div key={cliente.id}>
                                                                                <div className='form-check'>
                                                                                    <input
                                                                                        className='form-check-input'
                                                                                        type='checkbox'
                                                                                        id={`cliente_${cliente.id}`}
                                                                                        value={cliente.id}
                                                                                        {...register('clientes')}
                                                                                    />
                                                                                    <label
                                                                                        className='form-check-label'
                                                                                        htmlFor={`cliente_${cliente.id}`}
                                                                                    >
                                                                                        {cliente.nome_razao_social}
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <label className='form-label d-flex justify-content-between'>
                                                                        <span className='flex-grow-1'>
                                                                            Carregar Extratos a Refazer
                                                                        </span>
                                                                    </label>
                                                                    <UploadDropzone
                                                                        url={`google_drive/upload_extrato_robo/?mes=${mes}&ano=${ano}`}
                                                                        parents={initialFolderId}
                                                                        onUploadComplete={() => {}}
                                                                    />
                                                                </>
                                                            )}
                                                    </>
                                                )}
                                                <div className='d-flex gap-2 mt-2'>
                                                    <button
                                                        className='btn btn-primary'
                                                        type='button'
                                                        onClick={() => {
                                                            executarRobo(getValues());
                                                        }}
                                                        disabled={isPendingExecutarRobo}
                                                        aria-disabled={isPendingExecutarRobo}
                                                    >
                                                        Executar
                                                    </button>
                                                </div>
                                            </form>
                                        </>
                                    ) : (
                                        <>
                                            <p className='text-muted my-4'>Nenhum parametro encontrado</p>
                                            {roboRotinas && roboRotinas.length === 0 && (
                                                <p className='text-muted my-4'>Nenhuma rotina encontrada</p>
                                            )}
                                            {roboRotinas && roboRotinas.length > 0 && (
                                                <>
                                                    <form>
                                                        <div>
                                                            <label className='form-label d-flex justify-content-between'>
                                                                <span className='flex-grow-1'>Rotina</span>
                                                                <div className={`d-flex gap-2`}>
                                                                    {hasRole('TI') && (
                                                                        <>
                                                                            {roboRotinas.filter(
                                                                                (rotina) =>
                                                                                    rotina.nome === watch('rotina'),
                                                                            )[0] && (
                                                                                <>
                                                                                    <BaseModalTrigger modalKey='alterar-robo-rotina'>
                                                                                        <Pencil size={18} />
                                                                                    </BaseModalTrigger>

                                                                                    <button
                                                                                        className='btn py-0 px-2'
                                                                                        key={`delete-rotina`}
                                                                                        type='button'
                                                                                        onClick={() =>
                                                                                            handleDeleteRotina(
                                                                                                roboRotinas.filter(
                                                                                                    (rotina) =>
                                                                                                        rotina.nome ===
                                                                                                        getValues(
                                                                                                            'rotina',
                                                                                                        ),
                                                                                                )[0].id,
                                                                                            )
                                                                                        }
                                                                                        disabled={isDeleteRotinaPending}
                                                                                        aria-disabled={
                                                                                            isDeleteRotinaPending
                                                                                        }
                                                                                    >
                                                                                        <X size={18} />
                                                                                    </button>
                                                                                </>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </label>
                                                            <select
                                                                id='rotinas'
                                                                className='form-select'
                                                                defaultValue=''
                                                                {...register('rotina')}
                                                            >
                                                                <option value=''>Selecione uma rotina</option>
                                                                {roboRotinas.map((rotina) => (
                                                                    <option key={rotina.id} value={rotina.nome}>
                                                                        {rotina.nome}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className='d-flex gap-2 mt-2'>
                                                            <button
                                                                className='btn btn-primary'
                                                                onClick={(event) => {
                                                                    event.preventDefault();
                                                                    executarRobo(getValues());
                                                                }}
                                                            >
                                                                Executar
                                                            </button>
                                                        </div>
                                                    </form>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div className='w-50'>
                                    <h2>Informações</h2>
                                    <p className='text-muted fw-bold'>
                                        Descricão: <span className='fw-normal'>{roboDetalhes?.descricao}</span>
                                    </p>
                                    <p className='text-muted fw-bold'>
                                        Categoria: <span className='fw-normal'>{roboDetalhes?.categoria}</span>
                                    </p>
                                    <p className='text-muted fw-bold'>
                                        Execucões: <span className='fw-normal'>{roboDetalhes?.execucoes}</span>
                                    </p>
                                    <p className='text-muted fw-bold'>
                                        Ultima execução:{' '}
                                        <span className='fw-normal'>
                                            {fromNowDays(new Date(roboDetalhes?.ultima_execucao || 0)) != 0 ? (
                                                <>
                                                    {fromNowDays(new Date(roboDetalhes?.ultima_execucao || 0))}{' '}
                                                    {fromNowDays(new Date(roboDetalhes?.ultima_execucao || 0)) === 1
                                                        ? 'dia'
                                                        : 'dias'}
                                                </>
                                            ) : (
                                                <>Hoje</>
                                            )}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            {isRoboRotinasSuccess && alterarRotina && (
                                <AlterarRoboRotina
                                    modalKey='alterar-robo-rotina'
                                    roboId={roboId ? roboId : ''}
                                    rotina={alterarRotina}
                                />
                            )}
                            {isRoboParametrosSuccess && alterarParametro && (
                                <AlterarRoboParametro
                                    modalKey='alterar-robo-parametro'
                                    roboId={roboId ? roboId : ''}
                                    parametro={alterarParametro}
                                />
                            )}
                        </BaseModalProvider>
                    </Content>
                </>
            )}
            {isRoboDetalhesStale && isRoboParametrosStale && timeout && (
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='w-50 text-center mt-5 mb-5 p-5 rounded shadow'>
                        {timeout.name.toLowerCase() === 'timeout' ? (
                            <h3>O servidor demorou demais para responder, tente novamente mais tarde</h3>
                        ) : (
                            <>
                                <h3>Ocorreu um erro interno tente novamente mais tarde</h3>
                                <p>{timeout.name}</p>
                                <p>{timeout.message}</p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default RoboDetalhes;
