import { useGetEconomiaLiquida } from '@/api/http/dashboard';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/loading-screen';
import { EconomiaLiquidaTable } from '../table';
import { useSearch } from '../../search/search-provider';

function RelatorioEconomiaLiquidaTable() {
    const { selected, month, ano } = useSearch();

    const [economiaUrl, setEconomiaUrl] = useState<string>(
        `dashboard/economia_liquida/?nome_razao_social=&ano=${ano ?? ''}`,
    );

    const {
        data: economia,
        isLoading: isEconomiaLoading,
        isError: isEconomiaError,
        isSuccess: isEconomiaSuccess,
    } = useGetEconomiaLiquida(economiaUrl);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setEconomiaUrl(`dashboard/economia_liquida/?nome_razao_social=&mes=${month ?? ''}&ano=${ano ?? ''}`);
        }, 500); // Delay de 500ms para evitar muitas requisições enquanto digita

        return () => {
            clearTimeout(delayDebounce);
        };
    }, [selected, month, ano]);

    return (
        <div className='d-flex flex-column w-100 h-100'>
            {isEconomiaLoading && <LoadingScreen />}
            {isEconomiaError && <EconomiaLiquidaTable />}
            {isEconomiaSuccess && economia && <EconomiaLiquidaTable data={economia} />}
        </div>
    );
}

export { RelatorioEconomiaLiquidaTable };
