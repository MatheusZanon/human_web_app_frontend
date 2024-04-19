import { SearchIcon } from 'lucide-react';
import { useSearch } from '../search-provider';

function SearchBar() {
    const { search, setSearch } = useSearch();

    const handleSearch = (search: string) => {
        setSearch(search);
    };

    return (
        <div className='d-flex align-items-center gap-2 w-100'>
            <SearchIcon size={18} className='text-muted' />
            <input
                type='text'
                className={`form-control`}
                placeholder='Search'
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    );
}

export { SearchBar };
