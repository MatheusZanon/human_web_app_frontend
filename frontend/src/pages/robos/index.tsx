import Card from '@/components/robo-card';
import logo from '@/assets/react.svg';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import { CriarRoboCard } from '@/components/criar-robo';
import { useRobos } from '@/api/http';
import { DeletarRoboCard } from '@/components/deletar-robo';
function Robos() {
    const robos = useRobos();

    const { hasPermission } = useAuthenticatedUser();

    if (hasPermission('Can view robos')) {
        return (
            <>
                <div className='px-3 pb-3 shadow rounded'>
                    <h1 className='my-2'>Robôs</h1>
                    <div className='d-flex gap-2 mb-2'>
                        {hasPermission('Can add robos') && <CriarRoboCard />}
                        {hasPermission('Can delete robos') && <DeletarRoboCard robos={robos.data || []} />}
                    </div>
                    <div className='d-flex gap-2 flex-wrap'>
                        {robos.isLoading && <div>Loading...</div>}
                        {robos.isSuccess && robos.data.length === 0 && <div>No data</div>}
                        {robos.isSuccess &&
                            robos.data.map((robo) => (
                                <Card
                                    key={robo.id}
                                    id={robo.id.toString()}
                                    title={robo.nome}
                                    image={logo}
                                    text={robo.descricao}
                                    categoria={robo.categoria}
                                    details_link={'robos/' + robo.id}
                                    btn={'Executar'}
                                    executions={robo.execucoes}
                                    last_execution={robo.ultima_execucao}
                                />
                            ))}
                    </div>
                </div>
            </>
        );
    } else {
        <div>Não tem permissão necessária</div>;
    }
}

export default Robos;
