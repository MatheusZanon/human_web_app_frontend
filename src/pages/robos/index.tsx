import RoboCard from '@/components/robos/robo-card';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import { CriarRoboCard } from '@/components/robos/criar-robo';
import { useGetCategorias, useRobos } from '@/api/http/robos';
import { DeletarRoboCard } from '@/components/robos/deletar-robo';
import LoadingScreen from '@/components/loading-screen';
import { Content } from '@/components/layout/content';
import { useState } from 'react';

function Robos() {
    const [categoria, setCategoria] = useState('');
    const { data: categorias, isLoading: isCategoriasLoading, isSuccess: isCategoriasSuccess } = useGetCategorias();
    const robos = useRobos(categoria);

    const { hasRole } = useAuthenticatedUser();

    return (
        <>
            <Content title='Robôs'>
                {(hasRole('TI') || hasRole('ADMIN')) && (
                    <div className='d-flex gap-2 mb-2'>
                        <div>
                            <select
                                name='filtrar-robos'
                                value={categoria}
                                className='form-select'
                                onChange={(event) => setCategoria(event.target.value)}
                            >
                                <option value=''>Todos</option>
                                {isCategoriasSuccess && categorias && !isCategoriasLoading && (
                                    <>
                                        {categorias.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </>
                                )}
                            </select>
                        </div>
                        {hasRole('TI') && <CriarRoboCard />}
                        {hasRole('TI') && <DeletarRoboCard robos={robos.data || []} />}
                    </div>
                )}
                <div className='d-flex gap-2 flex-wrap'>
                    {robos.isLoading && (
                        <div>
                            <LoadingScreen />
                        </div>
                    )}
                    {robos.isSuccess && robos.data.length === 0 && (
                        <div>Não existe nenhum robô para ser executado.</div>
                    )}
                    {robos.isSuccess &&
                        robos.data.length > 0 &&
                        robos.data.map((robo) => (
                            <RoboCard
                                key={robo.id}
                                id={robo.id.toString()}
                                title={robo.nome}
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
