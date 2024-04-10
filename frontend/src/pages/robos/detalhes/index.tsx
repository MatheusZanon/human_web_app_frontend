import {
    useRoboById,
    useRoboParametrosById,
    useGetRoboRotinasById,
    useExecutarRobo,
    useDeleteParametro,
} from '@/api/http/robos';
import { RoboParametrosType } from '@/api/http';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import { useState } from 'react';
import { CriarRoboParametro } from '../criar_robo_parametro';
import { fromNowDays } from '@/libs';
import { CriarRoboRotina } from '../criar_robo_rotina';
import { Search, X } from 'lucide-react';
import { toast } from 'react-toastify';

function RoboDetalhes() {
    const { roboId } = useParams();
    const { register, getValues } = useForm<RoboParametrosType>();
    const [showCreateParametroModal, setShowCreateParametroModal] = useState(false);
    const [showCreateRotinaModal, setShowCreateRotinaModal] = useState(false);

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

    const { mutate: executarRobo } = useExecutarRobo({ roboId: roboId ? roboId : '' });

    const timeout =
        failureCount >= 3
            ? {
                  name: 'Timeout',
                  message: failureReason?.message,
                  type: failureReason?.name,
              }
            : null;

    const { hasPermission } = useAuthenticatedUser();
    const {
        mutate: deleteParametro,
        isSuccess: isDeleteParametroSuccess,
        isError: isDeleteParametroError,
        error,
    } = useDeleteParametro({
        roboId: roboId ? roboId : '',
    });

    const handleDeleteParametro = (event: MouseEvent, parametroId: number) => {
        event.preventDefault();
        deleteParametro(parametroId);

        if (isDeleteParametroSuccess) {
            toast.success('Parâmetro excluído com sucesso!', {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }

        if (isDeleteParametroError) {
            toast.error(`Erro ao excluir parametro rotina! ${error?.response?.data}`, {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    };

    return (
        <>
            {(isRoboParametrosLoading || isRoboDetalhesLoading) && <div>Loading...</div>}
            {(isRoboDetalhesSuccess || isRoboParametrosSuccess) && (
                <>
                    <div className='px-3 pb-3 shadow rounded'>
                        <h1>Robo - {roboDetalhes?.nome}</h1>
                        <div className='d-flex gap-2'>
                            {hasPermission('Can add parametros') && (
                                <>
                                    <button
                                        className='btn btn-primary'
                                        onClick={() => setShowCreateParametroModal(true)}
                                    >
                                        Criar Parâmetro
                                    </button>
                                    <div
                                        className={`modal ${showCreateParametroModal ? 'd-block' : 'd-none'}`}
                                        id='modalTeste'
                                    >
                                        <div className='modal-dialog modal-dialog-centered'>
                                            <div className='modal-content'>
                                                <div className='modal-header'>
                                                    <h5 className='modal-title'>{'Criar Parâmetro'}</h5>
                                                    <button
                                                        type='button'
                                                        className='btn-close'
                                                        data-bs-dismiss='modal'
                                                        aria-label='Close'
                                                        onClick={() => setShowCreateParametroModal(false)}
                                                    ></button>
                                                </div>
                                                <div className='modal-body'>
                                                    <CriarRoboParametro roboId={roboId ? roboId : ''} />
                                                </div>
                                                <div className='modal-footer'>
                                                    <button
                                                        type='button'
                                                        className='btn'
                                                        data-bs-dismiss='modal'
                                                        onClick={() => setShowCreateParametroModal(false)}
                                                    >
                                                        Fechar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {hasPermission('Can add rotinas') && (
                                <>
                                    <button
                                        className='btn btn-secondary'
                                        onClick={() => setShowCreateRotinaModal(true)}
                                    >
                                        Criar Rotina
                                    </button>
                                    <div
                                        className={`modal ${showCreateRotinaModal ? 'd-block' : 'd-none'}`}
                                        id='modalTeste'
                                    >
                                        <div className='modal-dialog modal-dialog-centered'>
                                            <div className='modal-content'>
                                                <div className='modal-header'>
                                                    <h5 className='modal-title'>{'Criar Rotina'}</h5>
                                                    <button
                                                        type='button'
                                                        className='btn-close'
                                                        data-bs-dismiss='modal'
                                                        aria-label='Close'
                                                        onClick={() => setShowCreateRotinaModal(false)}
                                                    ></button>
                                                </div>
                                                <div className='modal-body'>
                                                    <CriarRoboRotina roboId={roboId ? roboId : ''} />
                                                </div>
                                                <div className='modal-footer'>
                                                    <button
                                                        type='button'
                                                        className='btn'
                                                        data-bs-dismiss='modal'
                                                        onClick={() => setShowCreateRotinaModal(false)}
                                                    >
                                                        Fechar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className='d-flex gap-2 w-100'>
                            <div className='w-50'>
                                {roboParametros && roboParametros.length > 0 ? (
                                    <>
                                        <h2>Parametros</h2>
                                        <form className='d-flex flex-column gap-2'>
                                            {roboParametros.map((parametro) => (
                                                <div key={parametro.id} className='d-flex'>
                                                    <div className='flex-grow-1'>
                                                        <label
                                                            className='form-label d-flex justify-content-between'
                                                            htmlFor={`parametro_${parametro.id}`}
                                                        >
                                                            <span className='flex-grow-1'>
                                                                {parametro.parametro_info.nome}
                                                            </span>
                                                            <div className='d-flex gap-2'>
                                                                <button
                                                                    className='btn py-0 px-2'
                                                                    key={`update-${parametro.id}`}
                                                                >
                                                                    <Search size={18} />
                                                                </button>

                                                                <button
                                                                    className='btn py-0 px-2'
                                                                    key={`delete-${parametro.id}`}
                                                                    onClick={(event) =>
                                                                        handleDeleteParametro(event, parametro.id)
                                                                    }
                                                                >
                                                                    <X size={18} />
                                                                </button>
                                                            </div>
                                                        </label>
                                                        {parametro.parametro_info.tipo.toLowerCase().trim() ===
                                                            'date' && (
                                                            <input
                                                                type='date'
                                                                id={`parametro_${parametro.id}`}
                                                                defaultValue={parametro.valor}
                                                                {...register(parametro.parametro_info.nome)}
                                                                className={`form-control`}
                                                            />
                                                        )}
                                                        {parametro.parametro_info.tipo.toLowerCase().trim() ===
                                                            'integer' && (
                                                            <input
                                                                type='number'
                                                                id={`parametro_${parametro.id}`}
                                                                defaultValue={parametro.valor}
                                                                {...register(parametro.parametro_info.nome)}
                                                                className={`form-control`}
                                                            />
                                                        )}
                                                        {parametro.parametro_info.tipo.toLowerCase().trim() ===
                                                            'float' && (
                                                            <input
                                                                type='number'
                                                                id={`parametro_${parametro.id}`}
                                                                defaultValue={parametro.valor}
                                                                {...register(parametro.parametro_info.nome)}
                                                                className={`form-control`}
                                                            />
                                                        )}
                                                        {parametro.parametro_info.tipo.toLowerCase().trim() ===
                                                            'boolean' && (
                                                            <input
                                                                type='checkbox'
                                                                id={`parametro_${parametro.id}`}
                                                                defaultValue={parametro.valor}
                                                                {...register(parametro.parametro_info.nome)}
                                                                className={`form-check-input`}
                                                            />
                                                        )}
                                                        {parametro.parametro_info.tipo.toLowerCase().trim() ===
                                                            'text' && (
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
                                            ))}
                                            {isRoboRotinasSuccess && (
                                                <div>
                                                    <label className='form-label'>Rotina</label>
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
                                            )}
                                            <div className='d-flex gap-2 mt-2'>
                                                {hasPermission('Can change robos') && (
                                                    <>
                                                        <button
                                                            className='btn btn-primary'
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                executarRobo(getValues());
                                                            }}
                                                        >
                                                            Executar
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        <p className='text-muted my-4'>Nenhum parametro encontrado</p>
                                        {roboRotinas && roboRotinas.length > 0 && (
                                            <>
                                                <form>
                                                    <div>
                                                        <label className='form-label'>Rotina</label>
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
                                                        {hasPermission('Can change robos') && (
                                                            <>
                                                                <button
                                                                    className='btn btn-primary'
                                                                    onClick={(event) => {
                                                                        event.preventDefault();
                                                                        executarRobo(getValues());
                                                                    }}
                                                                >
                                                                    Executar
                                                                </button>
                                                            </>
                                                        )}
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
                                            <>{fromNowDays(new Date(roboDetalhes?.ultima_execucao || 0))} dias</>
                                        ) : (
                                            <>Hoje</>
                                        )}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
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
