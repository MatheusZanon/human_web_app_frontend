import { SearchProvider } from '../search/search-provider';
import { RelatorioEconomiaLiquidaTable } from './relatorio-economia-table';
import { RelatorioEconomiaLiquidaMensal } from './relatorio-economia-anual';
import { RelatorioEconomiaLiquidaRegional } from './relatorio-economia-regional';
import { Search } from '../search';

function EconomiaLiquida() {
    return (
        <div className='d-flex flex-column gap-4 w-100'>
            <h3>Economia Liquida</h3>
            <div className='d-flex flex-column gap-4'>
                <SearchProvider>
                    <Search monthFilter yearFilter />
                    <div className='d-flex'>
                        <RelatorioEconomiaLiquidaTable />
                        <div className='d-flex flex-column w-100'>
                            <RelatorioEconomiaLiquidaRegional />
                            <RelatorioEconomiaLiquidaMensal />
                        </div>
                    </div>
                </SearchProvider>
            </div>
        </div>
    );
}

export { EconomiaLiquida };
