import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '@/utils/axios';
import LoadingScreen from '@/components/loading-screen';
import LogoutModal from '@/components/user-alert-logout-modal';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';

interface RequireAuthProps {
    children: React.ReactNode; // Define o tipo dos filhos como React.ReactNode
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const { handleLogout } = useAuthenticatedUser();

    const handleModalClose = () => {
        setIsModalOpen(false);
        api.post('session/logout/').then(() => {
            setIsAuthenticated(false);
        });
        handleLogout();
        sessionStorage.setItem('redirected', 'false');
        navigate('/');
    };

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await api.get('session/verify/', { withCredentials: true });
                if (response.status == 200) {
                    setIsAuthenticated(true);
                }
            } catch (error: any) {
                setIsModalOpen(true);
            } finally {
                setIsChecking(false);
            }
        };
        verifyToken();
    }, [location.pathname]);

    if (isChecking) {
        return (
            <div>
                <LoadingScreen />
            </div>
        );
    }

    return (
        <>
            {isAuthenticated ? children : null}
            {isModalOpen && <LogoutModal isOpen={isModalOpen} onClose={handleModalClose} />}
        </>
    );
};

export default RequireAuth;
