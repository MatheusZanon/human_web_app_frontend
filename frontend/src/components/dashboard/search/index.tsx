import { SearchBar } from './search-bar';
import { SearchResultList } from './search-results';
import { useProvisaoDireitoTrabalhista } from '../provisao-direito-trabalhista/provisao-direito-trabalhista-provider';
import { useSearch } from './search-provider';
import { useGetAnos, useGetClientesFinanceiro } from '@/api/http/dashboard';
import styles from './search.module.scss';

const Search: React.FC = () => {
    const { search } = useSearch();
    const { selected, setSelected, setAno } = useProvisaoDireitoTrabalhista();
    const { data: empresas } = useGetClientesFinanceiro();
    const { data: anos } = useGetAnos();

    const filteredSearch = empresas?.filter((emp) =>
        emp.nome_razao_social.toLowerCase().includes(search.toLowerCase()),
    );

    setSelected(
        empresas?.find((emp) => emp.nome_razao_social.toLocaleLowerCase() === search.toLocaleLowerCase())
            ?.nome_razao_social ?? '',
    );

    return (
        <div className={`w-100 ${styles.searchWrapper}`}>
            <div className='d-flex align-items-center gap-2 mb-2 w-100'>
                <SearchBar />
                <div className='d-flex flex-shrink-1 w-25'>
                    <select name='Ano' id='selectAno' className='form-select' onChange={(e) => setAno(Number(e.target.value))}>
                        <option value={0}>Ano</option>
                        {anos?.map((ano) => <option value={ano.ano}>{ano.ano}</option>)}
                    </select>
                </div>
            </div>
            {!selected && (
                <SearchResultList
                    results={filteredSearch?.map((emp) => ({ id: emp.id, nome: emp.nome_razao_social })) ?? []}
                />
            )}
        </div>
    );
};

export { Search };
