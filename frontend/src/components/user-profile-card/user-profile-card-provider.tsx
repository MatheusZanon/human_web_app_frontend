import { User } from '@/utils/types/user';
import { createContext, useContext, useEffect, useState } from 'react';

interface UserProfileCardContextType {
    user: User | undefined;
    editMode: boolean;
    handleEditMode: () => void;
    setUser: (user: User | undefined) => void;
}

const UserProfileCardContext = createContext<UserProfileCardContextType>({
    user: undefined,
    editMode: false,
    handleEditMode: () => {},
    setUser: () => {},
});

const UserProfileCardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>();
    const [editMode, setEditMode] = useState(false);

    const handleEditMode = () => {
        setEditMode(!editMode);
    };

    useEffect(() => {
        // Desabilita o scroll quando o modal estiver aberto
        if (typeof window != 'undefined' && window.document && editMode === true) {
            document.body.style.overflow = 'hidden';
        }

        // Habilita o scroll quando o modal estiver fechado
        if (typeof window != 'undefined' && window.document && editMode === false) {
            document.body.style.overflow = 'auto';
        }
    }, [editMode]);

    return (
        <UserProfileCardContext.Provider
            value={{
                user,
                setUser,
                editMode,
                handleEditMode,
            }}
        >
            {children}
        </UserProfileCardContext.Provider>
    );
};

const useUserProfileCard = () => {
    const context = useContext(UserProfileCardContext);

    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }

    return context;
};

export { UserProfileCardProvider, useUserProfileCard };
