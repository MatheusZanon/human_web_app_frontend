import { createContext, useContext, useState } from 'react';

interface SearchContextType {
    search: string;
    setSearch: (search: string) => void;
    searchOpen: boolean;
    setSearchOpen: (open: boolean) => void;
    selected: string;
    setSelected: (selected: string) => void;
    month: number;
    setMonth: (month: number) => void;
    ano: number;
    setAno: (ano: number) => void;
}

const SearchContext = createContext<SearchContextType>({ search: '', setSearch: () => {}, searchOpen: false, setSearchOpen: () => {}, selected: '', setSelected: () => {}, month: 0, setMonth: () => {}, ano: 0, setAno: () => {} });

const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [search, setSearch] = useState<string>('');
    const [searchOpen, setSearchOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>('');
    const [month, setMonth] = useState<number>(0);
    const [ano, setAno] = useState<number>(0);

    return <SearchContext.Provider value={{ search, setSearch, searchOpen, setSearchOpen, selected, setSelected, month, setMonth, ano, setAno }}>{children}</SearchContext.Provider>;
};

const useSearch = () => {
    const context = useContext(SearchContext);

    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }

    return context;
};

export { SearchProvider, useSearch };
