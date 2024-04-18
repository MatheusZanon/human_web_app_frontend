import { SearchBar } from './search-bar';
import { SearchResultList } from './search-results';
import { useProvisaoDireitoTrabalhista } from '../provisao-direito-trabalhista/provisao-direito-trabalhista-provider';
import { useSearch } from './search-provider';
import { useGetClientesFinanceiro } from '@/api/http/dashboard';

const Search: React.FC = () => {
    const { search } = useSearch();
    const { selected, setSelected } = useProvisaoDireitoTrabalhista();
    const { data: empresas } = useGetClientesFinanceiro();

    const filteredSearch = empresas?.filter((emp) => emp.nome_razao_social.toLowerCase().includes(search.toLowerCase()));

    setSelected(empresas?.find((emp) => emp.nome_razao_social.toLocaleLowerCase() === search.toLocaleLowerCase())?.nome_razao_social ?? '');

    return (
        <div className='w-100'>
            <SearchBar />
            {!selected && (
                <SearchResultList
                    results={filteredSearch?.map((emp) => ({ id: emp.id, nome: emp.nome_razao_social })) ?? []}
                />
            )}
        </div>
    );
};

export { Search };
