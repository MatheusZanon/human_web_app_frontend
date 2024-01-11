import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    const [user_name, setUserName] = useState('');
    const [user_email, setUserEmail] = useState('');
    const [user_password, setUserPassword] = useState('');
    const [role, setRole] = useState('');
    const [hierarchy, setHierarchy] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:5000/funcionarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_name, user_email, user_password, role, hierarchy }),
            });

            if (response.ok) {
                console.log('Cadastro bem-sucedido!');
                // Aqui você pode redirecionar para a próxima página ou realizar outras ações após o cadastro
            } else {
                console.error('Erro no cadastro.');
                // Aqui você pode exibir uma mensagem de erro para o usuário
            }
        } catch (error) {
            console.error('Erro ao realizar cadastro:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleRegister();
    }
    
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

                    <div className="form-role">
                        <label className="checkbox-label">Função:</label>
                        
                        <label htmlFor="role1" className="checkbox-label">Financeiro</label>
                        <input id="role1" type="checkbox" className="form-checkbox" 
                            checked={role === 'financeiro'} onChange={() => setRole('financeiro')}
                        />
                        <label htmlFor="role2" className="checkbox-label">RH</label>
                        <input id="role2" type="checkbox" className="form-checkbox" 
                            checked={role === 'rh'} onChange={() => setRole('rh')}
                        />
                    </div>

                    <div className="form-hierarchy">
                        <label className="checkbox-label">Hierarquia:</label>
                        
                        <label htmlFor="hierarchy1" className="checkbox-label">Hierarquia 1</label>
                        <input id="hierarchy1" type="checkbox" className="form-checkbox" 
                            checked={hierarchy === 'hierarchy1'} onChange={() => setHierarchy('hierarchy1')}
                        />
                        <label htmlFor="hierarchy2" className="checkbox-label">Hierarquia 2</label>
                        <input id="hierarchy2" type="checkbox" className="form-checkbox" 
                            checked={hierarchy === 'hierarchy2'} onChange={() => setHierarchy('hierarchy2')}
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