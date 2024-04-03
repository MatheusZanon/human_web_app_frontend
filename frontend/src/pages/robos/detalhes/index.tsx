import { useRoboById, useRoboParametrosById, useGetRoboRotinasById, useExecutarRobo } from '@/api/http/robos';
import { RoboParametrosType } from '@/api/http';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import { useState } from 'react';
import { CriarRoboParametro } from '../criar_robo_parametro';
import { fromNowDays } from '@/libs';
import { CriarRoboRotina } from '../criar_robo_rotina';

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

    return (
        <>
            {isRoboParametrosLoading || (isRoboDetalhesLoading && <div>Loading...</div>)}
            {isRoboDetalhesSuccess && isRoboParametrosSuccess && (
                <>
                    <h1>Robo - {roboDetalhes?.nome}</h1>
                    <div className='d-flex gap-2'>
                        {hasPermission('Can add parametros') && (
                            <>
                                <button className='btn btn-primary' onClick={() => setShowCreateParametroModal(true)}>
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
                                <button className='btn btn-secondary' onClick={() => setShowCreateRotinaModal(true)}>
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
                                            <div key={parametro.id}>
                                                <label className='form-label'>{parametro.parametro_info.nome}</label>
                                                <input
                                                    type={
                                                        parametro.parametro_info.tipo.toLowerCase().trim() === 'integer'
                                                            ? 'number'
                                                            : parametro.parametro_info.tipo.toLowerCase().trim() ===
                                                                'float'
                                                              ? 'number'
                                                              : parametro.parametro_info.tipo.toLowerCase().trim() ===
                                                                  'boolean'
                                                                ? 'checkbox'
                                                                : 'text'
                                                    }
                                                    defaultValue={parametro.valor}
                                                    {...register(parametro.parametro_info.nome)}
                                                    className={`${parametro.parametro_info.tipo.toLowerCase().trim() !== 'boolean' ? 'form-control' : 'form-check-input'}`}
                                                />
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
                                                    <button className='btn btn-warning' onClick={() => {}}>
                                                        Modificar
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <div className='d-flex justify-content-center align-items-center w-100 h-100'>
                                    <h3 className='text-center'>O robo não tem parâmetros</h3>
                                    {timeout && <div>{timeout.message}</div>}
                                </div>
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
                                    {fromNowDays(new Date(roboDetalhes?.ultima_execucao)) != 0 ? (
                                        <>{fromNowDays(new Date(roboDetalhes?.ultima_execucao))} dias</>
                                    ) : (
                                        <>Hoje</>
                                    )}
                                </span>
                            </p>
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
