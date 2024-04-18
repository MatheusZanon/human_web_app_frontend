import { createContext, useContext, useState } from 'react';

interface ProvisaoDireitoTrabalhistaContextType {
    selected: string;
    setSelected: (value: string) => void;
}

const ProvisaoDireitoTrabalhistaContext = createContext<ProvisaoDireitoTrabalhistaContextType>({
    selected: '',
    setSelected: () => {},
});

const ProvisaoDireitoTrabalhistaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selected, setSelected] = useState<string>('');

    return (
        <ProvisaoDireitoTrabalhistaContext.Provider value={{ selected, setSelected }}>
            {children}
        </ProvisaoDireitoTrabalhistaContext.Provider>
    );
};

const useProvisaoDireitoTrabalhista = () => {
    const context = useContext(ProvisaoDireitoTrabalhistaContext);

    if (context === undefined) {
        throw new Error('useProvisaoDireitoTrabalhista must be used within a ProvisaoDireitoTrabalhistaProvider');
    }

    return context;
};

export { ProvisaoDireitoTrabalhistaProvider, useProvisaoDireitoTrabalhista };
