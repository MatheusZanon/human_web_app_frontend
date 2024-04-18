import { LineChartCard } from '../line-chart';
import { Search } from '@/components/dashboard/search';
import { SearchProvider } from '../search/search-provider';
import { useProvisaoDireitoTrabalhista } from './provisao-direito-trabalhista-provider';
import { useEffect, useState } from 'react';
import { useGetProvisaoTrabalhista } from '@/api/http/dashboard';

function ProvisaoDireitoTrabalhista() {
    const { selected } = useProvisaoDireitoTrabalhista();
    const [url, setUrl] = useState<string>(`dashboard/provisoes_direitos_trabalhistas/?nome_razao_social=${selected}`);

    useEffect(() => {
        setUrl(`dashboard/provisoes_direitos_trabalhistas/?nome_razao_social=${selected}`);
    }, [selected]);

    const { data: provisoes, isLoading: provisoesLoading, isSuccess: provisoesSuccess, isError: provisoesError, error } = useGetProvisaoTrabalhista(url);
    return (
        <div className='w-100 p-2 rounded shadow'>
            <h3>Provisão Direito Trabalhista (34.87%)</h3>
            <div className='d-flex flex-column gap-2'>
                <SearchProvider>
                    <Search />
                </SearchProvider>
                {provisoesLoading && <p>Loading...</p>}
                {provisoesSuccess && <LineChartCard data={provisoes || []} dataKeyX={provisoes ? 'mes' : ''} />}
                {provisoesError && <p>{error.message}</p>}
            </div>
        </div>
    );
}

export { ProvisaoDireitoTrabalhista };
