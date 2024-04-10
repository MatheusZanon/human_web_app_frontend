import Card from '@/components/robo-card';
import logo from '@/assets/react.svg';
import Parametros from './robo_parametros';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import { useState } from 'react';
import { CriarRobo } from './criar_robo';
import { useRobos } from '@/api/http';
import { DeletarRobo } from './deletar_robo';
function Robos() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const robos = useRobos();

    const { hasPermission } = useAuthenticatedUser();

    if (hasPermission('Can view robos')) {
        return (
            <>
                <div className='px-3 pb-3 shadow rounded mb-2'>
                    <h1 className='my-3'>Robôs</h1>
                    <div className='d-flex gap-2 mb-2'>
                        {hasPermission('Can add robos') && (
                            <>
                                <button className='btn btn-primary' onClick={() => setShowCreateModal(true)}>
                                    Criar Robo
                                </button>
                                <div className={`modal ${showCreateModal ? 'd-block' : 'd-none'}`} id='modalTeste'>
                                    <div className='modal-dialog modal-dialog-centered'>
                                        <div className='modal-content'>
                                            <div className='modal-header'>
                                                <h5 className='modal-title'>{'Criar Robo'}</h5>
                                                <button
                                                    type='button'
                                                    className='btn-close'
                                                    data-bs-dismiss='modal'
                                                    aria-label='Close'
                                                    onClick={() => setShowCreateModal(false)}
                                                ></button>
                                            </div>
                                            <div className='modal-body'>
                                                <CriarRobo />
                                            </div>
                                            <div className='modal-footer'>
                                                <button
                                                    type='button'
                                                    className='btn'
                                                    data-bs-dismiss='modal'
                                                    onClick={() => setShowCreateModal(false)}
                                                >
                                                    Fechar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {hasPermission('Can delete robos') && (
                            <>
                                <button className='btn btn-danger' onClick={() => setShowDeleteModal(true)}>
                                    Deletar Robo
                                </button>
                                <div className={`modal ${showDeleteModal ? 'd-block' : 'd-none'}`} id='modalTeste'>
                                    <div className='modal-dialog modal-dialog-centered'>
                                        <div className='modal-content'>
                                            <div className='modal-header'>
                                                <h5 className='modal-title'>{'Deletar Robo'}</h5>
                                                <button
                                                    type='button'
                                                    className='btn-close'
                                                    data-bs-dismiss='modal'
                                                    aria-label='Close'
                                                    onClick={() => setShowDeleteModal(false)}
                                                ></button>
                                            </div>
                                            <div className='modal-body'>
                                                {robos.isSuccess && robos.data.length === 0 && <div>No data</div>}
                                                {robos.isSuccess && robos.data.length > 0 && (
                                                    <DeletarRobo Robos={robos.data} />
                                                )}
                                            </div>
                                            <div className='modal-footer'>
                                                <button
                                                    type='button'
                                                    className='btn'
                                                    data-bs-dismiss='modal'
                                                    onClick={() => setShowDeleteModal(false)}
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
    } else {
        <div>Não tem permissão necessária</div>;
    }
}

export default Robos;
