import { SearchBar } from './search-bar';
import { SearchResultList } from './search-results';
import { useSearch } from './search-provider';
import { useGetAnos, useGetClientesFinanceiro } from '@/api/http/dashboard';
import styles from './search.module.scss';
import { useEffect } from 'react';

const Search: React.FC<{ companyFilter?: boolean; monthFilter?: boolean; yearFilter?: boolean }> = ({
    companyFilter,
    monthFilter,
    yearFilter,
}) => {
    const { search, selected, setSelected, setMonth, month, ano, setAno } = useSearch();
    const { data: empresas } = useGetClientesFinanceiro();
    const { data: anos } = useGetAnos();

    // Use useEffect para definir o valor de "selected" fora do ciclo de renderização
    useEffect(() => {
        const newSelected = empresas?.find(
            (emp) => emp.nome_razao_social.toLocaleLowerCase() === search.toLocaleLowerCase()
        )?.nome_razao_social;

        setSelected(newSelected ?? '');
    }, [search, empresas, setSelected]); // Re-renderize se "search" ou "empresas" mudarem

    const filteredSearch = empresas?.filter((emp) =>
        emp.nome_razao_social.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div className={`w-100 ${styles.searchWrapper}`}>
            <div className='d-flex align-items-center gap-2 mb-2 w-100'>
                {companyFilter && <SearchBar />}
                <div
                    className={`d-flex flex-shrink-1 ${yearFilter && monthFilter ? 'w-50' : yearFilter && !monthFilter ? 'w-25' : !yearFilter && monthFilter ? 'w-25' : 'w-100'} gap-2`}
                >
                    {monthFilter && (
                        <select
                            name='Mes'
                            id='selectMes'
                            className='form-select'
                            value={month}
                            onChange={(e) => setMonth(Number(e.target.value))}
                        >
                            <option value={1}>Janeiro</option>
                            <option value={2}>Fevereiro</option>
                            <option value={3}>Março</option>
                            <option value={4}>Abril</option>
                            <option value={5}>Maio</option>
                            <option value={6}>Junho</option>
                            <option value={7}>Julho</option>
                            <option value={8}>Agosto</option>
                            <option value={9}>Setembro</option>
                            <option value={10}>Outubro</option>
                            <option value={11}>Novembro</option>
                            <option value={12}>Dezembro</option>
                        </select>
                    )}
                    {yearFilter && (
                        <select
                            name='Ano'
                            id='selectAno'
                            className='form-select'
                            value={ano}
                            onChange={(e) => setAno(Number(e.target.value))}
                        >
                            {anos?.map((ano) => <option key={ano.ano} value={ano.ano}>{ano.ano}</option>)}
                        </select>
                    )}
                </div>
            </div>
            {!selected && companyFilter && (
                <SearchResultList
                    results={filteredSearch?.map((emp) => ({ id: emp.id, nome: emp.nome_razao_social })) ?? []}
                />
            )}
        </div>
    );
};

export { Search };
