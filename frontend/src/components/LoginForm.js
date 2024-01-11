import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [user_email, setEmail] = useState('');
    const [user_password, setPassword] = useState('');

    const fazerLogin = async () => {
        try {
          const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_email, user_password }),
          });
    
          if (response.ok) {
            console.log('Login bem-sucedido!');
            // Aqui você pode redirecionar para a próxima página ou realizar outras ações após o login
          } else {
            console.error('Credenciais inválidas.');
            // Aqui você pode exibir uma mensagem de erro para o usuário
          }
        } catch (error) {
          console.error('Erro ao realizar login:', error);
        }
      };

    const handleSubmit = (event) => {
      event.preventDefault();
    }
    
      return (
      <div className="container">
        <div className="divform">

          <p>
            LOGO
          </p>

          <form className='form' onSubmit={handleSubmit}>
            <label htmlFor="user_email" className="form-label">Email</label>
            <input id="user_email" className="form-input" placeholder="Email" 
              value={user_email} onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="user_password" className="form-label">Senha</label>
            <input id="user_password" className="form-input" type="password" placeholder="Senha" 
              value={user_password} onChange={(e) => setPassword(e.target.value)}
            />

            <div className="form-remember">
              <input id="remember" type="checkbox" className="form-checkbox" />
              <label htmlFor="remember" className="checkbox-label">Lembrar de mim</label>
            </div>

            <button type="submit" className="form-button" onClick={fazerLogin}>Login</button>
          </form>

          <p className="account-link">
              Ainda não possui uma conta? <Link to="/registerform">Solicitar Cadastro</Link>
            </p>

        </div>
      </div>
      );
}

export default LoginForm;