import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    const [user_name, setUserName] = useState('');
    const [user_email, setUserEmail] = useState('');
    const [user_password, setUserPassword] = useState('');
    const [telefone, setTelefone] = useState('');
    const [setor, setSetor] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:5000/solicitacao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_name, user_email, user_password, telefone, setor}),
            });

            if (response.ok) {
                console.log('Solicitação de cadastro criada com sucesso!');
                // Aqui você pode redirecionar para a próxima página ou realizar outras ações após o cadastro
            } else {
                console.error('Erro na criação da solicitação de cadastro!.');
                // Aqui você pode exibir uma mensagem de erro para o usuário
            }
        } catch (error) {
            console.error('Erro ao realizar solicitação:', error);
        }
    };

    const handleTelefoneChange = (event) => {
        // Lógica para formatar o número de telefone conforme necessário
        // Neste exemplo, apenas permite números e adiciona um espaço a cada 4 dígitos
        const inputTelefone = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        
        // Lógica para formatar o número no formato (99) 99999-9999
        //let formattedTelefone = inputTelefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    
        let formattedTelefone = '';

        for (let i = 0; i < inputTelefone.length; i++) {
        //if (i > 0 && i % 4 === 0) {
        //    formattedTelefone += ' ';
        //}
        formattedTelefone += inputTelefone[i];
        }

        setTelefone(formattedTelefone);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleRegister();
    };
    
    return (
        <div className="container">
            <div className="divform">
                <p>LOGO</p>
                <form className='form' onSubmit={handleSubmit}>
                    <label htmlFor="user_name" className="form-label">Nome de Usuário</label>
                    <input id="user_name" className="form-input" placeholder="Nome de Usuário" 
                        value={user_name} onChange={(e) => setUserName(e.target.value)}
                    />

                    <label htmlFor="user_email" className="form-label">Email</label>
                    <input id="user_email" className="form-input" type="email" placeholder="Email" 
                        value={user_email} onChange={(e) => setUserEmail(e.target.value)}
                    />

                    <label htmlFor="user_password" className="form-label">Senha</label>
                    <input id="user_password" className="form-input" type="password" placeholder="Senha" 
                        value={user_password} onChange={(e) => setUserPassword(e.target.value)}
                    />

                    <label htmlFor="telefone" className="form-label" >Telefone:</label>
                        <input 
                            className="form-input"
                            type="text"
                            id="telefone"
                            name="telefone"
                            placeholder="Digite seu telefone"
                            value={telefone}
                            onChange={handleTelefoneChange}
                        />

                    <div className="form-role">
                        <label className="checkbox-label">Setor:</label>
                        
                        <label htmlFor="role1" className="checkbox-label">Financeiro</label>
                        <input id="role1" type="checkbox" className="form-checkbox" 
                            checked={setor === 'financeiro'} onChange={() => setSetor('financeiro')}
                        />
                        <label htmlFor="role2" className="checkbox-label">RH</label>
                        <input id="role2" type="checkbox" className="form-checkbox" 
                            checked={setor === 'rh'} onChange={() => setSetor('rh')}
                        />
                    </div>

                    <button type="submit" className="form-button">Cadastrar</button>
                </form>

                <p className="account-link">
                    Já possui uma conta? <Link to="/">Entrar</Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterForm;