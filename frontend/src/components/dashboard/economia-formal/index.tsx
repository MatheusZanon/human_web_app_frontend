import { useGetEconomiaFormal } from '@/api/http/dashboard';
import { useSearch } from '../search/search-provider';
import { EconomiaFormalTable } from './table';
import { Search } from '../search';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/loading-screen';
import { BarChartCard } from '../bar-chart';
import { error } from 'console';

function EconomiaFormal() {
    const { selected, month, ano } = useSearch();
    const [economiaUrl, setEconomiaUrl] = useState<string>(`dashboard/economia_formal/?nome_razao_social=&ano=${ano}`);
    const {
        data: economia,
        isLoading: isEconomiaLoading,
        isError: isEconomiaError,
        error: economiaError,
        isSuccess: isEconomiaSuccess,
    } = useGetEconomiaFormal(economiaUrl);

    const [economiaEmpresaUrl, setEconomiaEmpresaUrl] = useState<string>(
        `dashboard/economia_formal/?nome_razao_social=${selected}&ano=${ano}`,
    );

    const {
        data: economiaEmpresa,
        isLoading: isEconomiaEmpresaLoading,
        isError: isEconomiaEmpresaError,
        error: economiaEmpresaError,
        isSuccess: isEconomiaEmpresaSuccess,
    } = useGetEconomiaFormal(economiaEmpresaUrl);

    useEffect(() => {
        setEconomiaUrl(`dashboard/economia_formal/?nome_razao_social=&ano=${ano}`);
        setEconomiaEmpresaUrl(`dashboard/economia_formal/?nome_razao_social=${selected}&ano=${ano}`);
    }, [selected, ano]);

    return (
        <div className='d-flex flex-column gap-4 w-100'>
            <Search monthFilter yearFilter />
            <div className='d-flex gap-2 w-100'>
                {isEconomiaLoading && <LoadingScreen />}
                {isEconomiaError && <p>{economiaError.message}</p>}
                {isEconomiaSuccess && economia && <EconomiaFormalTable data={economia} />}
                <div className='d-flex flex-column w-100'>
                    <Search companyFilter />
                    {isEconomiaEmpresaLoading && <LoadingScreen />}
                    {isEconomiaEmpresaError && <p>{economiaEmpresaError.message}</p>}
                    {isEconomiaEmpresaSuccess && economiaEmpresa && <BarChartCard data={economiaEmpresa} />}
                </div>
            </div>
        </div>
    );
}

export { EconomiaFormal };
