import { useRobos } from '@/api';
import Card from '@/components/card';
import logo from '@/assets/react.svg';
import { useSeedRobos, useDeleteRobos } from '@/api';
function Dashboard() {
  const robos = useRobos();

  const { mutate: seedRobos } = useSeedRobos();
  const { mutate: deleteRobos } = useDeleteRobos();

  return (
    <>
      <div className='px-3 pb-3 shadow rounded'>
        <h1 className='my-2'>Robôs</h1>
        <div className='d-flex gap-2'>
          <button  className='btn btn-primary' onClick={() => seedRobos()}>Seed Robos</button>
          <button  className='btn btn-danger' onClick={() => deleteRobos()}>Seed Robos</button>
        </div>
        <div className='d-flex gap-2 flex-wrap'>
          {robos.isSuccess &&
            robos.data.map((robo) => (
              <Card
                key={robo.id}
                title={robo.nome}
                image={logo}
                text={robo.descricao}
                categoria={robo.categoria}
                details_link={'/robos/' + robo.id}
                btn={'Executar'}
                executions={robo.execucoes}
                last_execution={robo.ultima_execucao}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
