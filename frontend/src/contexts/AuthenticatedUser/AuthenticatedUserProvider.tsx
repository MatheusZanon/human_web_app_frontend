import { useContext, useState, useEffect } from 'react';
import { User } from '@/utils/types/user';
import { createContext } from 'react';
import { useGetUser } from '@/api/http/user';
import LoadingScreen from '@/components/loading-screen';

type AuthenticatedUserProviderState = {
    authenticatedUser: User | null;
    defineUser: (User: User | null) => void;
    hasRole: (role: string) => boolean;
};

const initialState: AuthenticatedUserProviderState = {
    authenticatedUser: null,
    defineUser: () => null,
    hasRole: () => false,
};

const authenticatedUserContext = createContext<AuthenticatedUserProviderState>(initialState);

function AuthenticatedUserProvider({ children }: { children: React.ReactNode }) {
    const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);
    const authUser = useGetUser();
    const defineUser = (User: User | null) => setAuthenticatedUser(User);
    const hasRole = (role: string) => !!authenticatedUser?.groups.includes(role);

    const value = {
        authenticatedUser,
        defineUser,
        hasRole,
    };

    useEffect(() => {
        if (authUser.isSuccess && authUser.data) {
            authUser.data.profile_header =
                'https://images.unsplash.com/photo-1715942163364-5aa9e6d66bb4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
            authUser.data.profile_picture =
                'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
            defineUser(authUser.data);
        }
    }, [authUser.data, authUser.isSuccess]);

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
