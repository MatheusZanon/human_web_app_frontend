import LoadingScreen from '@/components/loading-screen';
import { Search } from '../../search';
import { BarChartCard } from '../../bar-chart';
import { useSearch } from '../../search/search-provider';
import { useEffect, useState } from 'react';
import { useGetEconomiaFormal } from '@/api/http/dashboard';

function RelatorioEconomiaFormalMensal() {
    const { selected, month, ano } = useSearch();

    const [economiaUrl, setEconomiaUrl] = useState<string>(
        `dashboard/economia_formal/?nome_razao_social=${selected}&ano=${ano ?? ''}`,
    );

    const {
        data: economia,
        isLoading: isEconomiaLoading,
        isError: isEconomiaError,
        isSuccess: isEconomiaSuccess,
    } = useGetEconomiaFormal(economiaUrl);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setEconomiaUrl(`dashboard/economia_formal/total?ano=${ano ?? ''}`);
        }, 500); // Delay de 500ms para evitar muitas requisições enquanto digita

        return () => {
            clearTimeout(delayDebounce);
        };
    }, [selected, month, ano]);
    return (
        <div className='d-flex flex-column w-100 h-100'>
            <Search yearFilter />
            {isEconomiaLoading && <LoadingScreen />}
            {isEconomiaError && <BarChartCard data={[]} />}
            {isEconomiaSuccess && economia && (
                <BarChartCard data={economia} dataKeyX='mes' barKeys={['economia_formal']} xAxisAsMonths />
            )}
        </div>
    );
}

export { RelatorioEconomiaFormalMensal };
