import { useEffect, useState } from "react";
import { useSearch } from "../../search/search-provider";
import { useGetEconomiaLiquida } from "@/api/http/dashboard";
import LoadingScreen from "@/components/loading-screen";
import { PieChartCard } from "../../pie-chart";

function RelatorioEconomiaLiquidaRegional() {
    const { month, ano } = useSearch();

    const [economiaUrl, setEconomiaUrl] = useState<string>(`dashboard/economia_liquida/total?mes=${month ?? ''}&ano=${ano ?? ''}&regional=true`);

    const {
        data: economia,
        isLoading: isEconomiaLoading,
        isError: isEconomiaError,
        isSuccess: isEconomiaSuccess,
    } = useGetEconomiaLiquida(economiaUrl);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setEconomiaUrl(`dashboard/economia_liquida/total?mes=${month ?? ''}&ano=${ano ?? ''}&regional=true`);
        }, 500); // Delay de 500ms para evitar muitas requisições enquanto digita

        return () => {
            clearTimeout(delayDebounce);
        };
    }, [month, ano]);
    return (
        <div className='d-flex flex-column w-100 h-100'>
            {isEconomiaLoading && <LoadingScreen />}
            {isEconomiaError && <PieChartCard />}
            {isEconomiaSuccess && economia && (
                <PieChartCard data={economia} dataKey={"economia_liquida"} labelBy="regiao" title="Por Região" />
            )}
        </div>
    );
}

export { RelatorioEconomiaLiquidaRegional };
