import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

interface RequireAuthProps {
    children: React.ReactNode; // Define o tipo dos filhos como React.ReactNode
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const location = useLocation();
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const verifyToken = async () => {
            if (!accessToken) {
                setIsAuthenticated(false);
                setIsChecking(false);
                return;
            }
            try {
                const response = await axios.get('http://localhost:8000/api/token/verify/', { 
                    headers: { Authorization: `Bearer ${accessToken}` }}); 
                if (response.status == 200) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                localStorage.removeItem('accessToken'); // Remove o token inválido
            } finally {
                setIsChecking(false);
            }
        };
        verifyToken();
    }, [location.pathname]);

    if (isChecking) {
        return <div>Carregando...</div>; // Ou algum componente de loading
      }
    
      if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
      }

    return <>{children}</>; // Renderiza os filhos se o usuário estiver autenticado
};

export default RequireAuth;