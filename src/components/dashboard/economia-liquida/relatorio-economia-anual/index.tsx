import LoadingScreen from '@/components/loading-screen';
import { BarChartCard } from '../../bar-chart';
import { useSearch } from '../../search/search-provider';
import { useEffect, useState } from 'react';
import { useGetEconomiaLiquida } from '@/api/http/dashboard';

function RelatorioEconomiaLiquidaMensal() {
    const { ano } = useSearch();

    const [economiaUrl, setEconomiaUrl] = useState<string>(`dashboard/economia_liquida/total?ano=${ano ?? ''}`);

    const {
        data: economia,
        isLoading: isEconomiaLoading,
        isError: isEconomiaError,
        isSuccess: isEconomiaSuccess,
    } = useGetEconomiaLiquida(economiaUrl);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setEconomiaUrl(`dashboard/economia_liquida/total?ano=${ano ?? ''}`);
        }, 500); // Delay de 500ms para evitar muitas requisições enquanto digita

        return () => {
            clearTimeout(delayDebounce);
        };
    }, [ano]);
    return (
        <div className='d-flex flex-column w-100 h-100'>
            {isEconomiaLoading && <LoadingScreen />}
            {isEconomiaError && <BarChartCard />}
            {isEconomiaSuccess && economia && (
                <BarChartCard data={economia} dataKeyX='mes' barKeys={['economia_liquida']} title='Anual' xAxisAsMonths />
            )}
        </div>
    );
}

export { RelatorioEconomiaLiquidaMensal };
