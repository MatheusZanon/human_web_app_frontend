import { Cliente } from '@/utils/types/cliente';
import { createContext, useContext, useEffect, useState } from 'react';

interface ClienteProfileCardContextType {
    cliente: Cliente | undefined;
    editMode: boolean;
    handleEditMode: () => void;
    setCliente: (cliente: Cliente | undefined) => void;
}

const ClienteProfileCardContext = createContext<ClienteProfileCardContextType>({
    cliente: undefined,
    editMode: false,
    handleEditMode: () => {},
    setCliente: () => {},
});

const ClienteProfileCardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cliente, setCliente] = useState<Cliente>();
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
        <ClienteProfileCardContext.Provider
            value={{
                cliente,
                setCliente,
                editMode,
                handleEditMode,
            }}
        >
            {children}
        </ClienteProfileCardContext.Provider>
    );
};

const useClienteProfileCard = () => {
    const context = useContext(ClienteProfileCardContext);

    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }

    return context;
};

export { ClienteProfileCardProvider, useClienteProfileCard };
