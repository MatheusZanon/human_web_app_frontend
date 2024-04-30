import RoboCard from '@/components/robos/robo-card';
import logo from '@/assets/react.svg';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import { CriarRoboCard } from '@/components/robos/criar-robo';
import { useRobos } from '@/api/http';
import { DeletarRoboCard } from '@/components/robos/deletar-robo';
import LoadingScreen from '@/components/loading-screen';
import { Content } from '@/components/layout/content';

function Robos() {
    const robos = useRobos();

    const { hasRole } = useAuthenticatedUser();

    return (
        <>
            <Content title='Robôs'>
                <div className='d-flex gap-2 mb-2'>
                    {(hasRole('TI') || hasRole('ADMIN')) && (
                        <div>
                            <select name='filtrar-robos' className='form-select'>
                                <option value='todos'>Todos</option>
                                <option value='financeiro'>Financeiro</option>
                                <option value='rh'>RH</option>
                            </select>
                        </div>
                    )}
                    {hasRole('TI') && <CriarRoboCard />}
                    {hasRole('TI') && <DeletarRoboCard robos={robos.data || []} />}
                </div>
                <div className='d-flex gap-2 flex-wrap'>
                    {robos.isLoading && (
                        <div>
                            <LoadingScreen />
                        </div>
                    )}
                    {robos.isSuccess && robos.data.length === 0 && <div>No data</div>}
                    {robos.isSuccess &&
                        robos.data.map((robo) => (
                            <RoboCard
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
            </Content>
        </>
    );
}

export default Robos;
