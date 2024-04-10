import { useGetUserById } from '@/api/http';
import ProfileCard from '@/components/profile-card';
import { useParams } from 'react-router-dom';

function FuncionarioProfile() {
    const { funcionarioId } = useParams();
    const userId = parseInt(funcionarioId ? funcionarioId : '');
    const { data: user, isLoading, isSuccess } = useGetUserById({ userId: userId });

    return (
        <>
            {isLoading && <p>Carregando...</p>}
            {isSuccess && !user && <p>Funcionário não encontrado</p>}
            {isSuccess && user && (
                <div>
                    <ProfileCard
                        name={`${user?.first_name} ${user?.last_name}` || ''}
                        roles={user?.groups || []}
                        email={user?.email || ''}
                    />
                    <p>profile {user.id}</p>
                </div>
            )}
        </>
    );
}

export default FuncionarioProfile;
