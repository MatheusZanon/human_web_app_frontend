import { useRoboById } from '@/api';
import { useExecutarRobo } from '@/api';
import { RoboParametrosType } from '@/api/http';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

function RoboDetalhes() {
  const { roboId } = useParams();
  const { register, getValues } = useForm<RoboParametrosType>();

  const {
    data: robo,
    isLoading,
    isSuccess,
    failureReason,
    failureCount,
  } = useRoboById({ roboId: roboId ? roboId : '' });

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
    <div>
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <>
          <h1>Robo - {robo?.nome}</h1>
          <div className='d-flex gap-2 w-100'>
            <div className='w-50'>
              <h2>Parametros</h2>
              <form>
                {robo?.parametros?.map((parametro) => (
                  <div key={parametro.id}>
                    <label className='form-label'>{parametro.parametro_info.nome}</label>
                    <input
                      type={parametro.parametro_info.tipo.toLowerCase()}
                      defaultValue={
                        parametro.parametro_info.tipo.toLowerCase() === 'date'
                          ? parametro.valor
                          : parametro?.valor
                      }
                      {...register(parametro.parametro_info.nome)}
                      className='form-control'
                    />
                  </div>
                ))}
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
            </div>
            <div className='w-50'>
              <h2>Informações</h2>
              <p className='text-muted fw-bold'>
                Descricão: <span className='fw-normal'>{robo?.descricao}</span>
              </p>
              <p className='text-muted fw-bold'>
                Categoria: <span className='fw-normal'>{robo?.categoria}</span>
              </p>
              <p className='text-muted fw-bold'>
                Execucões: <span className='fw-normal'>{robo?.execucoes}</span>
              </p>
              <p className='text-muted fw-bold'>
                Ultima execução: <span className='fw-normal'>{robo?.ultima_execucao}</span>
              </p>
            </div>
          </div>
        </>
      )}
      {failureCount >= 3 && <pre>{JSON.stringify(timeout, null, 2)}</pre>}
    </div>
  );
}

export default RoboDetalhes;
