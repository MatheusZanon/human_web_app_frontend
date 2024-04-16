import { useContext, useState, useEffect, useMemo } from 'react';
import { User } from '@/utils/types/user';
import { createContext } from 'react';
import { useGetUser } from '@/api/http';

type AuthenticatedUserProviderState = {
    authenticatedUser: User | null;
    defineUser: (User: User | null) => void;
    hasRole: (role: string) => boolean;
    hasPermission: (permission: string) => boolean;
};

const initialState: AuthenticatedUserProviderState = {
    authenticatedUser: null,
    defineUser: () => null,
    hasRole: () => false,
    hasPermission: () => false,
};

const authenticatedUserContext = createContext<AuthenticatedUserProviderState>(initialState);

function AuthenticatedUserProvider({ children } : { children: React.ReactNode }) {
    const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);
    const authUser = useGetUser();
    const defineUser = (User: User | null) => setAuthenticatedUser(User);
    const hasRole = (role: string) => !!authenticatedUser?.groups.includes(role);
    const hasPermission = (permission: string) => !!authenticatedUser?.permissions.includes(permission);
    const value = useMemo(() => ({
        authenticatedUser,
        defineUser,
        hasRole,
        hasPermission,
    }), [authenticatedUser]);

    useEffect(() => {
        if (authUser.isSuccess && authUser.data) {
            defineUser(authUser.data);
        }
    }, [authUser.data, authUser.isSuccess]);
    
    return (
        <authenticatedUserContext.Provider value={value}>
            {children}
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
