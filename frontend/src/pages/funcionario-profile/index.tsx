import { useGetUserById } from '@/api/http';
import ProfileCard from '@/components/profile-card';
import { useParams } from 'react-router-dom';
import LoadingScreen from '@/components/loading-screen';
import { Content } from '@/components/layout/content';

function FuncionarioProfile() {
    const { funcionarioId } = useParams();
    const userId = parseInt(funcionarioId ? funcionarioId : '');
    const { data: user, isLoading, isSuccess } = useGetUserById({ userId: userId });

    return (
        <>
            {isLoading && <LoadingScreen/>}
            {isSuccess && !user && <p>Funcionário não encontrado</p>}
            {isSuccess && user && (
                <Content title="Profile">
                    <ProfileCard
                        name={`${user?.first_name} ${user?.last_name}` || ''}
                        roles={user?.groups || []}
                        email={user?.email || ''}
                    />
                    <p>profile {user.id}</p>
                </Content>
            )}
        </>
    );
}

export default FuncionarioProfile;
