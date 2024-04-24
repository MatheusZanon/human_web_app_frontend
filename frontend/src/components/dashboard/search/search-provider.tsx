import { createContext, useContext, useState } from 'react';

interface SearchContextType {
    search: string;
    setSearch: (search: string) => void;
    searchOpen: boolean;
    setSearchOpen: (open: boolean) => void;
    selected: string;
    setSelected: (selected: string) => void;
    month: number | undefined;
    setMonth: (month: number) => void;
    ano: number | undefined;
    setAno: (ano: number) => void;
}

const SearchContext = createContext<SearchContextType>({
    search: '',
    setSearch: () => {},
    searchOpen: false,
    setSearchOpen: () => {},
    selected: '',
    setSelected: () => {},
    month: undefined,
    setMonth: () => {},
    ano: undefined,
    setAno: () => {},
});

const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [search, setSearch] = useState<string>('');
    const [searchOpen, setSearchOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>('');
    const [month, setMonth] = useState<number | undefined>();
    const [ano, setAno] = useState<number | undefined>();

    return (
        <SearchContext.Provider
            value={{
                search,
                setSearch,
                searchOpen,
                setSearchOpen,
                selected,
                setSelected,
                month,
                setMonth,
                ano,
                setAno,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

const useSearch = () => {
    const context = useContext(SearchContext);

    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }

    return context;
};

export { SearchProvider, useSearch };
