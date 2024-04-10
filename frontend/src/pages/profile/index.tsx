import ProfileCard from '@/components/profile-card';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';

function Profile() {
    const { authenticatedUser } = useAuthenticatedUser();

    return (
        <div className='px-3 pb-3 shadow rounded'>
            <h1>Perfil</h1>
            <div className='row'>
                <ProfileCard profilePicture='' name={authenticatedUser?.username || ''} roles={authenticatedUser?.groups || []} email={authenticatedUser?.email || ''} />
            </div>
            <div className='row py-2'>
                <div className='col'>
                    <h2>Meus dados</h2>
                    <div className='row'>
                        <div className='col'>
                            <p>Nome: {authenticatedUser?.username}</p>
                            <p>Cargo: Desenvolvedor</p>
                            <p>Setor: TI</p>
                        </div>
                        <div className='col'>
                            <p>CPF: 000.000.000-00</p>
                            <p>RG: 00.000.000-0</p>
                        </div>
                    </div>
                    <div className='row'>
                        <h3>Contato</h3>
                        <p>Email: {authenticatedUser?.email}</p>
                        <p>Telefone: (00) 0 0000-0000</p>
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
                <div className='col'>
                    <form className='d-flex flex-column gap-2'>
                        <div className='row'>
                            <div className='col'>
                                <label htmlFor='email' className='form-label'>
                                    Nome
                                </label>
                                <input type='email' className='form-control' id='email' />
                            </div>
                            <div className='col'>
                                <label htmlFor='email' className='form-label'>
                                    Setor
                                </label>
                                <input type='email' className='form-control' id='email' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <label htmlFor='email' className='form-label'>
                                    Email
                                </label>
                                <input type='email' className='form-control' id='email' />
                            </div>
                            <div className='col'>
                                <label htmlFor='email' className='form-label'>
                                    Senha
                                </label>
                                <input type='email' className='form-control' id='email' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <label htmlFor='email' className='form-label'>
                                    CEP
                                </label>
                                <input type='email' className='form-control' id='email' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <label htmlFor='email' className='form-label'>
                                    Cidade
                                </label>
                                <input type='email' className='form-control' id='email' />
                            </div>
                            <div className='col'>
                                <label htmlFor='email' className='form-label'>
                                    Estado
                                </label>
                                <input type='email' className='form-control' id='email' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <label htmlFor='email' className='form-label'>
                                    Endereço
                                </label>
                                <input type='email' className='form-control' id='email' />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
    /*
    if (user.isError) {
        return <div>Nenhum usuário encontrado!</div>;
    } else if (user.isSuccess) {
        return (
            <div className='px-3 pb-3 shadow rounded'>
                <h1>Perfil</h1>
                <div className='row'>
                    <ProfileCard />
                </div>
                <div className='row py-2'>
                    <div className='col'>
                        <h2>Meus dados</h2>
                        <div className='row'>
                            <div className='col'>
                                <p>Nome: {user.data.username}</p>
                                <p>Cargo: Desenvolvedor</p>
                                <p>Setor: TI</p>
                            </div>
                            <div className='col'>
                                <p>CPF: 000.000.000-00</p>
                                <p>RG: 00.000.000-0</p>
                            </div>
                        </div>
                        <div className='row'>
                            <h3>Contato</h3>
                            <p>Email: {user.data.email}</p>
                            <p>Telefone: (00) 0 0000-0000</p>
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
                    <div className='col'>
                        <form className='d-flex flex-column gap-2'>
                            <div className='row'>
                                <div className='col'>
                                    <label htmlFor='email' className='form-label'>
                                        Nome
                                    </label>
                                    <input type='email' className='form-control' id='email' />
                                </div>
                                <div className='col'>
                                    <label htmlFor='email' className='form-label'>
                                        Setor
                                    </label>
                                    <input type='email' className='form-control' id='email' />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <label htmlFor='email' className='form-label'>
                                        Email
                                    </label>
                                    <input type='email' className='form-control' id='email' />
                                </div>
                                <div className='col'>
                                    <label htmlFor='email' className='form-label'>
                                        Senha
                                    </label>
                                    <input type='email' className='form-control' id='email' />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <label htmlFor='email' className='form-label'>
                                        CEP
                                    </label>
                                    <input type='email' className='form-control' id='email' />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <label htmlFor='email' className='form-label'>
                                        Cidade
                                    </label>
                                    <input type='email' className='form-control' id='email' />
                                </div>
                                <div className='col'>
                                    <label htmlFor='email' className='form-label'>
                                        Estado
                                    </label>
                                    <input type='email' className='form-control' id='email' />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <label htmlFor='email' className='form-label'>
                                        Endereço
                                    </label>
                                    <input type='email' className='form-control' id='email' />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }*/
}

export default Profile;
