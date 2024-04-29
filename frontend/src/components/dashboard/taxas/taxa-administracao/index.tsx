import { useEffect, useState } from 'react';
import { LineChartCard } from '../../line-chart';
import { useSearch } from '../../search/search-provider';
import { useGetTaxaAdministracao } from '@/api/http/dashboard';
import LoadingScreen from '@/components/loading-screen';

function TaxaAdministracao() {
    const { selected, ano } = useSearch();
    const [urlTaxaAdministracao, setUrlTaxaAdministracao] = useState<string>(
        `dashboard/taxa_administracao/?nome_razao_social=${selected}&ano=${ano ?? ''}`,
    );

    useEffect(() => {
        setUrlTaxaAdministracao(`dashboard/taxa_administracao/?nome_razao_social=${selected}&ano=${ano ?? ''}`);
    }, [selected, ano]);

    const {
        data: taxa_administracao,
        isLoading: isLoadingTaxaAdministracao,
        isSuccess: isSuccessTaxaAdministracao,
        isError: isErrorTaxaAdministracao,
    } = useGetTaxaAdministracao(urlTaxaAdministracao);

    return (
        <>
            {isLoadingTaxaAdministracao && <LoadingScreen />}
            {isErrorTaxaAdministracao && <LineChartCard title='Taxa Administração' />}
            {isSuccessTaxaAdministracao && (
                <LineChartCard
                    data={taxa_administracao}
                    dataKeyX='mes'
                    labelBy='taxa_administracao'
                    title='Taxa Administração'
                    syncId='1'
                />
            )}
        </>
    );
}

export { TaxaAdministracao };
