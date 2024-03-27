import { useRoboById, useRoboParametrosById, useRoboRotinasById } from '@/api';
import { useExecutarRobo } from '@/api';
import { RoboParametrosType } from '@/api/http';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

function RoboDetalhes() {
    const { roboId } = useParams();
    const { register, getValues } = useForm<RoboParametrosType>();

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

    const { data: roboRotinas, isSuccess: isRoboRotinasSuccess } = useRoboRotinasById({ roboId: roboId ? roboId : '' });

    const { mutate: executarRobo } = useExecutarRobo({ roboId: roboId ? roboId : '' });

    const timeout =
        failureCount >= 3
            ? {
                  name: 'Timeout',
                  message: failureReason?.message,
                  type: failureReason?.name,
              }
            : null;

    return (
        <>
            {isRoboParametrosLoading || (isRoboDetalhesLoading && <div>Loading...</div>)}
            {isRoboDetalhesSuccess && isRoboParametrosSuccess && (
                <>
                    <h1>Robo - {roboDetalhes?.nome}</h1>
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
                                                    type={parametro.parametro_info.tipo.toLowerCase()}
                                                    defaultValue={parametro.valor}
                                                    {...register(parametro.parametro_info.nome)}
                                                    className='form-control'
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
                                Ultima execução: <span className='fw-normal'>{roboDetalhes?.ultima_execucao}</span>
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
