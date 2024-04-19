import { createContext, useContext, useState } from 'react';

interface ProvisaoDireitoTrabalhistaContextType {
    selected: string;
    setSelected: (value: string) => void;
    ano: number;
    setAno: (value: number) => void;
}

const ProvisaoDireitoTrabalhistaContext = createContext<ProvisaoDireitoTrabalhistaContextType>({
    selected: '',
    setSelected: () => {},
    ano: 0,
    setAno: () => {},
});

const ProvisaoDireitoTrabalhistaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selected, setSelected] = useState<string>('');
    const [ano, setAno] = useState<number>(0);

    return (
        <ProvisaoDireitoTrabalhistaContext.Provider value={{ selected, setSelected, ano, setAno }}>
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
