import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { api } from '@/utils/axios';
import LoadingScreen from '@/components/loading-screen';

interface RequireAuthProps {
    children: React.ReactNode; // Define o tipo dos filhos como React.ReactNode
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await api.get('session/verify/',  {withCredentials: true});
                if (response.status == 200) {
                    console.log(response)
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.log(error);
                api.post('session/logout/', { withCredentials: true });
                setIsAuthenticated(false);
            } finally {
                setIsChecking(false);
            }
        };
        verifyToken();
    }, [location.pathname]);

    if (isChecking) {
        return <div><LoadingScreen /></div>;
    }

    if (!isAuthenticated) {
        return <Navigate to='/' state={{ from: location }} replace />;
    } else {
        return <>{children}</>; // Renderiza os filhos se o usuário estiver autenticado
    }

};

export default RequireAuth;
