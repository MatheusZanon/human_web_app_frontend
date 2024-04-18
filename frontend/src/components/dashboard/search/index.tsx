import { SearchBar } from './search-bar';
import { SearchResultList } from './search-results';
import { useProvisaoDireitoTrabalhista } from '../provisao-direito-trabalhista/provisao-direito-trabalhista-provider';
import { useSearch } from './search-provider';

const Search: React.FC = () => {
    const { search } = useSearch();
    const { selected, setSelected } = useProvisaoDireitoTrabalhista();

    const empresas = [
        {
            id: 1,
            nome_razao_social: 'Teste',
        },
        {
            id: 2,
            nome_razao_social: 'Teste 2',
        },
        {
            id: 3,
            nome_razao_social: 'emp 3',
        },
        {
            id: 4,
            nome_razao_social: 'emp 4',
        },
        {
            id: 5,
            nome_razao_social: 'empresa 5',
        },
        {
            id: 6,
            nome_razao_social: 'empr 6',
        },
    ];

    const filteredSearch = empresas.filter((emp) => emp.nome_razao_social.toLowerCase().includes(search.toLowerCase()));

    setSelected(empresas.find((emp) => emp.nome_razao_social.toLocaleLowerCase() === search.toLocaleLowerCase())?.nome_razao_social ?? '');

    return (
        <div className='w-100'>
            <SearchBar />
            {!selected && (
                <SearchResultList
                    results={filteredSearch.map((emp) => ({ id: emp.id, nome: emp.nome_razao_social }))}
                />
            )}
        </div>
    );
};

export { Search };
