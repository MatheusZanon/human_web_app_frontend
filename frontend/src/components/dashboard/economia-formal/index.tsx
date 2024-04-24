import { useGetEconomiaFormal } from '@/api/http/dashboard';
import { useSearch } from '../search/search-provider';
import { EconomiaFormalTable } from './table';
import { Search } from '../search';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/loading-screen';
import { BarChartCard } from '../bar-chart';

function EconomiaFormal() {
    const { selected, month, ano } = useSearch();
    const [economiaUrl, setEconomiaUrl] = useState<string>(`dashboard/economia_formal/?nome_razao_social=&ano=${ano ?? ''}`);
    const {
        data: economia,
        isLoading: isEconomiaLoading,
        isError: isEconomiaError,
        isSuccess: isEconomiaSuccess,
    } = useGetEconomiaFormal(economiaUrl);

    const [economiaEmpresaUrl, setEconomiaEmpresaUrl] = useState<string>(
        `dashboard/economia_formal/?nome_razao_social=${selected}&ano=${ano ?? ''}`,
    );

    const {
        data: economiaEmpresa,
        isLoading: isEconomiaEmpresaLoading,
        isError: isEconomiaEmpresaError,
        isSuccess: isEconomiaEmpresaSuccess,
    } = useGetEconomiaFormal(economiaEmpresaUrl);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setEconomiaUrl(`dashboard/economia_formal/?nome_razao_social=&mes=${month ?? ''}&ano=${ano ?? ''}`);
            setEconomiaEmpresaUrl(`dashboard/economia_formal/?nome_razao_social=${selected}&ano=${ano ?? ''}`);
        }, 500); // Delay de 500ms para evitar muitas requisições enquanto digita

        return () => {
            clearTimeout(delayDebounce);
        };
    }, [selected, month, ano]);

    return (
        <div className='d-flex flex-column gap-4 w-100'>
            <h3>Economia Formal</h3>
            <Search monthFilter yearFilter />
            <div className='d-flex gap-4'>
                {isEconomiaLoading && <LoadingScreen />}
                {isEconomiaError && <EconomiaFormalTable />}
                {isEconomiaSuccess && economia && <EconomiaFormalTable data={economia} />}
                <div className='d-flex flex-column w-100 h-100'>
                    <Search companyFilter />
                    {isEconomiaEmpresaLoading && <LoadingScreen />}
                    {isEconomiaEmpresaError && <BarChartCard data={[]} />}
                    {isEconomiaEmpresaSuccess && economiaEmpresa && (
                        <BarChartCard
                            data={economiaEmpresa}
                            dataKeyX='mes'
                            barKeys={['economia_formal']}
                            xAxisAsMonths
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export { EconomiaFormal };
