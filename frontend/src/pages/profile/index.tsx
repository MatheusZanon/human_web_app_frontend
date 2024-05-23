import { Content } from '@/components/layout/content';
import ProfileCard from '@/components/profile-card';
import { useProfileCard } from '@/components/profile-card/profile-card-provider';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import { formatCellphone, formatCpf, formatRg } from '@/libs';
import { useEffect } from 'react';

function Profile() {
    const { authenticatedUser } = useAuthenticatedUser();

    const { setUser } = useProfileCard();

    useEffect(() => {
        if (authenticatedUser) {
            setUser(authenticatedUser);
        }
    }, [authenticatedUser, setUser]);

    return (
        <Content title='Profile'>
            <div className='row'>
                <ProfileCard />
            </div>
            <div className='row py-2'>
                <div className='col'>
                    <h2>Meus dados</h2>
                    <div className='row'>
                        <div className='col'>
                            <p>Nome: {`${authenticatedUser?.first_name} ${authenticatedUser?.last_name}`}</p>
                            <p>
                                Cargo:{' '}
                                {authenticatedUser?.groups && authenticatedUser.groups.length > 0
                                    ? authenticatedUser.groups.map((role, index) =>
                                          index !== authenticatedUser.groups.length - 1
                                              ? `${role.replace('_', ' ')}, `
                                              : `${role.replace('_', ' ')}`,
                                      )
                                    : 'Sem Cargo'}
                            </p>
                        </div>
                        <div className='col'>
                            <p>CPF: {formatCpf(authenticatedUser?.cpf || '00000000000')}</p>
                            <p>RG: {formatRg(authenticatedUser?.rg || '00000000000')}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <h3>Contato</h3>
                        <p>Email: {authenticatedUser?.email}</p>
                        <p>
                            Telefone:{' '}
                            <span className={`${authenticatedUser?.telefone_celular ? '' : 'text-muted'}`}>
                                {authenticatedUser?.telefone_celular
                                    ? formatCellphone(authenticatedUser.telefone_celular)
                                    : formatCellphone('00000000000')}
                            </span>
                        </p>
                    </div>
                    <div className='row'>
                        <h3>Endereço</h3>
                        <p>Estado: Rio de Janeiro</p>
                        <p>Cidade: Rio de Janeiro</p>
                        <p>Endereço: Rua Human, 0</p>
                        <p>CEP: 00000-000</p>
                        <p>Complemento: Complemento</p>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default Profile;
