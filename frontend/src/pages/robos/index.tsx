import Card from '@/components/card';
import logo from '@/assets/react.svg';
import { useRobos, useSeedRobos, useDeleteRobos } from '@/api/http/robos';
import Parametros from './robo_parametros';
function Robos() {
  const robos = useRobos();

  const { mutate: seedRobos } = useSeedRobos();
  const { mutate: deleteRobos } = useDeleteRobos();

  return (
    <>
      <div className='px-3 pb-3 shadow rounded'>
        <h1 className='my-2'>Robôs</h1>
        <div className='d-flex gap-2'>
          <button className='btn btn-primary' onClick={() => seedRobos()}>
            Seed Robos
          </button>
          <button className='btn btn-danger' onClick={() => deleteRobos()}>
            Delete Robos
          </button>
        </div>
        <div className='d-flex gap-2 flex-wrap'>
          {robos.isLoading && <div>Loading...</div>}
          {robos.isSuccess && robos.data.length === 0 && <div>No data</div>}
          {robos.isSuccess &&
            robos.data.map((robo) => (
              <Card
                key={robo.id}
                title={robo.nome}
                image={logo}
                text={robo.descricao}
                categoria={robo.categoria}
                details_link={'robos/' + robo.id}
                btn={'Executar'}
                executions={robo.execucoes}
                last_execution={robo.ultima_execucao}
              >
                <Parametros id={robo.id.toString()} />
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}

export default Robos;
