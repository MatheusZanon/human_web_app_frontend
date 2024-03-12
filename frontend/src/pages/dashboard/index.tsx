import { useRobos } from '@/api';
import Card from '@/components/card';
function Dashboard() {
  const robos = useRobos();

  return (
    <>
      <div className='px-3 pb-3 shadow rounded'>
        <h1 className='my-2'>Robôs</h1>
        <div className='d-flex gap-2 flex-wrap'>
          {robos.isSuccess &&
            robos.data.map((robo) => (
              <Card
                key={robo.id}
                title={robo.name}
                image={robo.image}
                text={robo.description}
                details_link={robo.details_link}
                btn={robo.btn}
                executions={robo.executions}
                last_execution={robo.last_execution}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
