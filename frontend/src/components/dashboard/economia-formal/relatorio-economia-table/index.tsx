import { useGetEconomiaFormal } from '@/api/http/dashboard';
import { Search } from '../../search';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/loading-screen';
import { EconomiaFormalTable } from '../table';
import { useSearch } from '../../search/search-provider';

function RelatorioEconomiaFormalTable() {
    const { selected, month, ano } = useSearch();

    const [economiaUrl, setEconomiaUrl] = useState<string>(
        `dashboard/economia_formal/?nome_razao_social=&ano=${ano ?? ''}`,
    );

    const {
        data: economia,
        isLoading: isEconomiaLoading,
        isError: isEconomiaError,
        isSuccess: isEconomiaSuccess,
    } = useGetEconomiaFormal(economiaUrl);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setEconomiaUrl(`dashboard/economia_formal/?nome_razao_social=&mes=${month ?? ''}&ano=${ano ?? ''}`);
        }, 500); // Delay de 500ms para evitar muitas requisições enquanto digita

        return () => {
            clearTimeout(delayDebounce);
        };
    }, [selected, month, ano]);

    return (
        <div className='d-flex flex-column w-100 h-100'>
            <Search monthFilter yearFilter />
            {isEconomiaLoading && <LoadingScreen />}
            {isEconomiaError && <EconomiaFormalTable />}
            {isEconomiaSuccess && economia && <EconomiaFormalTable data={economia} />}
        </div>
    );
}

export { RelatorioEconomiaFormalTable };
