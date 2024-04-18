import { useSearch } from '../search-provider';
import search_results from './search_results.module.scss';

interface SearchResult {
    id: number;
    nome: string;
}

function SearchResult({ id, nome }: SearchResult) {
    const { setSearch } = useSearch();
    return (
        <div className={`w-100 px-2 ${search_results.SearchResultWrapper}`} key={id} onClick={() => setSearch(nome)}>
            <p className={`m-0 p-1 text-muted user-select-none ${search_results.SearchResult}`}>{nome}</p>
        </div>
    );
}

interface SearchResultsProps {
    results: SearchResult[];
}

function SearchResultList({ results }: SearchResultsProps) {
    return (
        <div className={`${search_results.SearchResultList}`}>
            {results.map((result) => (
                <SearchResult key={result.id} id={result.id} nome={result.nome} />
            ))}
        </div>
    );
}

export { SearchResultList };
