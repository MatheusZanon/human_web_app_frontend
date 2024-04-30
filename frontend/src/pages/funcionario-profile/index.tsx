import { useGetUserById } from '@/api/http';
import ProfileCard from '@/components/profile-card';
import { useParams } from 'react-router-dom';
import LoadingScreen from '@/components/loading-screen';
import { Content } from '@/components/layout/content';
import { formatCpf } from '@/libs';

function FuncionarioProfile() {
    const { funcionarioId } = useParams();
    const userId = parseInt(funcionarioId ? funcionarioId : '');
    const { data: user, isLoading, isSuccess } = useGetUserById({ userId: userId });

    return (
        <>
            {isLoading && <LoadingScreen />}
            {isSuccess && !user && <p>Funcionário não encontrado</p>}
            {isSuccess && user && (
                <Content title='Profile'>
                    <ProfileCard
                        id={user?.id}
                        name={`${user?.first_name} ${user?.last_name}` || ''}
                        roles={user?.groups || []}
                        email={user?.email || ''}
                    />
                    <div className='d-flex flex-column gap-4'>
                        <div className='d-flex flex-column gap-2'>
                            <h5>Informações Pessoais</h5>
                            <div className='d-flex flex-column gap-1'>
                                <div className='d-flex'>
                                    <p className='m-0 pe-2 fw-bold'>Nome:</p>
                                    <span className='fw-normal'>{`${user?.first_name} ${user?.last_name}`}</span>
                                </div>
                                <div className='d-flex gap-4'>
                                    <div className='d-flex'>
                                        <p className='m-0 pe-2 fw-bold'>CPF:</p>
                                        <span className='fw-normal'>{formatCpf(`${user?.cpf}`)}</span>
                                    </div>
                                    <div className='d-flex'>
                                        <p className='m-0 pe-2 fw-bold'>RG:</p>
                                        <span className='fw-normal'>{`${user?.rg ?? 'Não informado.'}`}</span>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <p className='m-0 pe-2 fw-bold'>Cargo:</p>
                                    <span className='fw-normal'>
                                        {user?.groups.map((group) => group.replace('_', ' ')).join(', ')}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex flex-column gap-2'>
                            <h5>Contatos</h5>
                            <div className='d-flex flex-column gap-1'>
                                <div className='d-flex'>
                                    <p className='m-0 pe-2 fw-bold'>Email:</p>
                                    <span className='fw-normal'>{user?.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
            )}
        </>
    );
}

export default FuncionarioProfile;
