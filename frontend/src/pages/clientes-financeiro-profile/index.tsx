import { useParams } from 'react-router-dom';
import { useGetClienteById } from '@/api/http/clientes_financeiro';
import { Content } from '@/components/layout/content';
import { formatCellphone, formatCnpj, formatCpf } from '@/libs';

function ClienteFinanceiroProfile() {
    const { clienteId } = useParams();
    const clientId = parseInt(clienteId ? clienteId : '0');
    const cliente = useGetClienteById({ clienteId: clientId });

    return (
        <>
            <Content title='Perfil do Cliente'>
                <div className='row'>
                    <div className='col-xl-3 col-xxl-4 col-lg-4'>
                        <div className='row'>
                            <div className='col-lg-12 mb-3'>
                                <div className='card overflow-hidden shadow'>
                                    <div className='text-center p-3 overlay-box'>
                                        <h4 className='mb-1'>{cliente?.data?.nome_razao_social}</h4>
                                        {cliente?.data?.cnpj ? (
                                            <p className='text-gray mb-0'>{formatCnpj(cliente.data.cnpj)}</p>
                                        ) : null}
                                        {cliente?.data?.cpf ? (
                                            <p className='text-gray mb-0'>{formatCpf(cliente?.data?.cpf)}</p>
                                        ) : null}
                                    </div>
                                    <ul className='list-group list-group-flush'>
                                        <li className='list-group-item d-flex justify-content-between'>
                                            <strong className='text-muted'>Região</strong>{' '}
                                            <span className='mb-0'>{cliente?.data?.regiao}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-lg-12 mb-3'>
                                <div className='card overflow-hidden shadow'>
                                    <div className='card-header'>
                                        <h3 className='card-title m-0'>Contatos</h3>
                                    </div>
                                    <div className='card-body pb-0'>
                                        <ul className='list-group list-group-flush'>
                                            <li className='list-group-item d-flex flex-wrap px-0 justify-content-between'>
                                                <strong>Email:</strong>
                                                <span className='mb-0'>{cliente?.data?.email}</span>
                                            </li>
                                            <li className='list-group-item d-flex flex-wrap px-0 justify-content-between'>
                                                <strong>Telefone:</strong>
                                                <span className='mb-0'>
                                                    {cliente?.data?.telefone_celular
                                                        ? formatCellphone(cliente.data.telefone_celular)
                                                        : ''}
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
                                                <p>
                                                    {cliente?.data?.nome_razao_social
                                                        ? cliente.data.nome_razao_social
                                                        : ''}
                                                </p>
                                                <strong>Nome Fantasia:</strong>
                                                <p>{cliente?.data?.nome_fantasia ? cliente.data.nome_fantasia : ''}</p>
                                                {cliente?.data?.cnpj ? (
                                                    <>
                                                        <strong>CNPJ</strong>
                                                        <p>{formatCnpj(cliente.data.cnpj)}</p>
                                                    </>
                                                ) : null}
                                                {cliente?.data?.cpf ? (
                                                    <>
                                                        <strong>CPF</strong>
                                                        <p>{formatCpf(cliente?.data?.cpf)}</p>
                                                    </>
                                                ) : null}
                                                <h5>Endereços</h5>
                                                <p>Av. Cardoso Moreira - Centro, Itaperuna</p>
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
