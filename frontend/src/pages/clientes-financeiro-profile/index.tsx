import React, { Fragment, useReducer } from 'react';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {useGetClienteById} from '@/api/http/clientes_financeiro';
import { Content } from '@/components/layout/content';

function ClienteFinanceiroProfile() {
    const { clienteId } = useParams();
    const clientId = parseInt(clienteId ? clienteId : '0');
    const cliente = useGetClienteById({ clienteId: clientId });

    return (
        <>
            <Content title="Perfil do Cliente">
                <div className="row">
                    <div className="col-xl-3 col-xxl-4 col-lg-4">
                        <div className="row">
                            <div className="col-lg-12 mb-3">
                                <div className="card overflow-hidden shadow">
                                    <div className="text-center p-3 overlay-box">
                                        <div className="profile-photo">
                                            <img src='' width="100" className="img-fluid rounded-circle" alt="" />
                                        </div>
                                        <h4 className="mt-3 mb-1 text-black">{cliente?.data?.nome_razao_social}</h4>
                                        <p className="text-gray mb-0">{cliente?.data?.cnpj ? cliente?.data?.cnpj : cliente?.data?.cpf }</p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between">
                                            <strong className="text-muted">Região</strong> <span className="mb-0">{cliente?.data?.regiao}</span>
                                            </li>            
                                    </ul>
                                    <div className="card-footer text-center border-0 mt-0">								
                                        <Link to={"#"} className="btn btn-primary  px-4">Message</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 mb-3">
                                <div className="card overflow-hidden shadow">
                                    <div className="card-header">
                                        <h3 className="card-title">Email</h3>
                                    </div>
                                    <div className="card-body pb-0">
                                        <h6>{cliente?.data?.email}</h6>
                                        <ul className="list-group list-group-flush">
                                                <li className="list-group-item d-flex px-0 justify-content-between" key={1}>
                                                    <strong>Titulo</strong>
                                                    <span className="mb-0">Subtitulo</span>
                                                </li>                                    
                                        </ul>
                                    </div>
                                    <div className="card-footer pt-0 pb-0 text-center">
                                        <div className="row">
                                                <div className={`col-4 pt-3 pb-3 border-end`} key={1}>
                                                    <h3 className="mb-1 text-primary">Task</h3>
                                                    <span>Titulo</span>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 mb-3">
                                <div className="card shadow">
                                    <div className="card-header d-block">
                                        <h4 className="card-title">Endereço</h4>
                                    </div>
                                    <div className="card-body">
                                        <p className="mb-0">Av. Cardoso Moreira - Centro, Itaperuna</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-xxl-8 col-lg-8">
                        <div className="row">
                            <div className="col-12">
                                <div className="card mb-3 shadow">
                                    <div className="card-body">
                                        <div className="profile-tab">
                                            <div className="custom-tab-1">
                                                <h3>Dados Adicionais</h3>
                                            </div>
                                            <div className="tab-content">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    );  
}

export default ClienteFinanceiroProfile;