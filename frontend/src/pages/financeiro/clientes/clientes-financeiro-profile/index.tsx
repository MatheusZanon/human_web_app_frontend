import { useParams } from 'react-router-dom';
import { useGetClienteById } from '@/api/http/clientes_financeiro';
import { Content } from '@/components/layout/content';
import { formatCellphone, formatCnpj, formatCpf } from '@/libs';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import { UpdateClienteModal } from '@/components/update-cliente-modal';
import { useClienteProfileCard } from '@/components/update-cliente-modal/cliente-profile-card-provider';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import styles from './clientes-financeiro-profile.module.scss';

function ClienteFinanceiroProfile() {
    const { clienteId } = useParams();
    const clientId = parseInt(clienteId ? clienteId : '0');
    const { data: cliente, error: clienteError } = useGetClienteById({ clienteId: clientId });
    const { hasRole } = useAuthenticatedUser();
    const { setCliente } = useClienteProfileCard();

    useEffect(() => {
        if (cliente) {
            setCliente(cliente);
        }
    }, [cliente, setCliente]);

    if (clienteError) {
        toast.error(clienteError.message);
    }

    return (
        <>
            <Content title='Perfil do Cliente'>
                <div className='row'>
                    {(hasRole('ADMIN') || hasRole('TI')) && (
                        <div className='d-flex align-items-center mb-2'>
                            <UpdateClienteModal />
                        </div>
                    )}
                    <div className='col-xl-3 col-xxl-4 col-lg-4'>
                        <div className='row'>
                            <div className='col-lg-12 mb-3'>
                                <div className='card overflow-hidden shadow'>
                                    <div className='text-center p-3 overlay-box'>
                                        <h4 className='mb-1'>{cliente?.nome_razao_social}</h4>
                                        {cliente?.cnpj ? (
                                            <p className='text-gray mb-0'>{formatCnpj(cliente.cnpj)}</p>
                                        ) : null}
                                        {cliente?.cpf ? (
                                            <p className='text-gray mb-0'>{formatCpf(cliente?.cpf)}</p>
                                        ) : null}
                                    </div>
                                    <ul className='list-group list-group-flush'>
                                        <li className='list-group-item d-flex justify-content-between'>
                                            <strong className='text-muted'>Região</strong>{' '}
                                            <span className='mb-0'>{cliente?.regiao}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-lg-12 mb-3'>
                                <div className={`card overflow-hidden shadow ${styles.contatos_card}`}>
                                    <div className='card-header'>
                                        <h3 className='card-title m-0'>Contatos</h3>
                                    </div>
                                    <div className='card-body pb-0'>
                                        <ul className='list-group list-group-flush'>
                                            <li className='list-group-item d-flex flex-wrap px-0 justify-content-between'>
                                                <strong>Email:</strong>
                                                <span className={`mb-0 ${styles.email}`}>{cliente?.email}</span>
                                            </li>
                                            <li className='list-group-item d-flex flex-wrap px-0 justify-content-between'>
                                                <strong>Telefone:</strong>
                                                <span className={`${cliente?.telefone_celular ? '' : 'text-muted'}`}>
                                                    {cliente?.telefone_celular
                                                        ? formatCellphone(cliente.telefone_celular)
                                                        : formatCellphone('00000000000')}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-9 col-xxl-8 col-lg-8'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='card mb-3 shadow'>
                                    <div className='card-body'>
                                        <div className='profile-tab'>
                                            <div className='custom-tab-1'>
                                                <h3>Dados Adicionais</h3>
                                            </div>
                                            <div className='tab-content'>
                                                <strong>Razão Social</strong>
                                                <p>{cliente?.nome_razao_social ? cliente.nome_razao_social : ''}</p>
                                                <strong>Nome Fantasia:</strong>
                                                <p>{cliente?.nome_fantasia ? cliente.nome_fantasia : ''}</p>
                                                {cliente?.cnpj ? (
                                                    <>
                                                        <strong>CNPJ</strong>
                                                        <p>{formatCnpj(cliente.cnpj)}</p>
                                                    </>
                                                ) : null}
                                                {cliente?.cpf ? (
                                                    <>
                                                        <strong>CPF</strong>
                                                        <p>{formatCpf(cliente?.cpf)}</p>
                                                    </>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    );
}

export default ClienteFinanceiroProfile;
