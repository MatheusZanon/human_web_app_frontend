import { useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { User } from '@/utils/types/user';
import { createContext } from 'react';
import { useGetUser } from '@/api/http/user';
import LoadingScreen from '@/components/loading-screen';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/utils/queryClient';

type AuthenticatedUserProviderState = {
    authenticatedUser: User | null;
    defineUser: (User: User | null) => void;
    hasRole: (role: string) => boolean;
    handleLogout: () => void;
};

const initialState: AuthenticatedUserProviderState = {
    authenticatedUser: null,
    defineUser: () => null,
    hasRole: () => false,
    handleLogout: () => null,
};

const authenticatedUserContext = createContext<AuthenticatedUserProviderState>(initialState);

function AuthenticatedUserProvider({ children }: { children: React.ReactNode }) {
    const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);
    const [authCheckComplete, setAuthCheckComplete] = useState(false);
    const authUser = useGetUser();
    const navigate = useNavigate();

    const defineUser = useCallback((user: User | null) => {
        setAuthenticatedUser(user);
        setAuthCheckComplete(true);
    }, []);

    const hasRole = useCallback((role: string) => !!authenticatedUser?.groups.includes(role), [authenticatedUser]);

    const handleLogout = useCallback(() => {
        setAuthenticatedUser(null);
        sessionStorage.setItem('redirected', 'false');
        queryClient.invalidateQueries({ queryKey: ['user'] });
    }, []);

    const value = useMemo(
        () => ({
            authenticatedUser,
            defineUser,
            hasRole,
            handleLogout,
        }),
        [authenticatedUser, defineUser, hasRole, handleLogout],
    );

    useEffect(() => {
        if (authUser.isSuccess && authUser.data) {
            authUser.data.profile_header =
                'https://images.unsplash.com/photo-1715942163364-5aa9e6d66bb4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
            authUser.data.profile_picture =
                'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
            defineUser(authUser.data);
        }
    }, [authUser, defineUser]);

    useEffect(() => {
        if (authCheckComplete) {
            const redirected = JSON.parse(sessionStorage.getItem('redirected') || 'false') === true;
            if (!redirected) {
                if (authUser?.data?.groups.includes('ADMIN')) {
                    navigate('/main/dashboard');
                } else {
                    navigate('/main/robos'); // Página padrão para outros cargos
                }
                sessionStorage.setItem('redirected', 'true');
            }
        }
    }, [authCheckComplete, authenticatedUser, authUser, navigate]);

    return (
        <authenticatedUserContext.Provider value={value}>
            {authenticatedUser ? children : <LoadingScreen />}
        </authenticatedUserContext.Provider>
    );
}

function useAuthenticatedUser() {
    const context = useContext(authenticatedUserContext);

    if (context === undefined) {
        throw new Error('useAuthenticatedUser must be used within a AuthenticatedUserProvider');
    }

    return context;
}

export { useAuthenticatedUser, AuthenticatedUserProvider };
