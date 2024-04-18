import { createContext, useContext, useState } from 'react';

interface SearchContextType {
    search: string;
    setSearch: (search: string) => void;
}

const SearchContext = createContext<SearchContextType>({ search: '', setSearch: () => {} });

const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [search, setSearch] = useState<string>('');

    return <SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>;
};

const useSearch = () => {
    const context = useContext(SearchContext);

    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }

    return context;
};

export { SearchProvider, useSearch };
