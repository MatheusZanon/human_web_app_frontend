import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { api } from '@/utils/axios';
import LoadingScreen from '@/components/loading-screen';
import Modal from '@/components/user-alert-logout-modal';
import { AlertCircle } from 'lucide-react';

interface RequireAuthProps {
    children: React.ReactNode; // Define o tipo dos filhos como React.ReactNode
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
        api.post('session/logout/').then(() => 
            setIsAuthenticated(false)
        );
    };

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await api.get('session/verify/',  {withCredentials: true});
                if (response.status == 200) {
                    setIsAuthenticated(true);
                } else {
                    throw new Error('Token Expired');
                }
            } catch (error) {
                setIsModalOpen(true);
            } finally {
                setIsChecking(false);
            }
        };
        verifyToken();
    }, [location.pathname]);

    if (isChecking) {
        return <div><LoadingScreen /></div>;
    }

    if (!isAuthenticated && !isModalOpen) {
        return <Navigate to='/' state={{ from: location }} replace />;
    }

    return (
        <>
            {isAuthenticated ? children : null}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                    <div className='alert alert-danger'>
                        <h4 className='mb-0'>Seu token de acesso expirou.</h4> 
                        <h4>Por favor, faça login novamente.</h4>
                        <AlertCircle color='red'/>
                    </div>
                </Modal>
            )}
        </>
    );

};

export default RequireAuth;
