import { SearchProvider } from '../search/search-provider';
import { RelatorioEconomiaFormalTable } from './relatorio-economia-table';
import { RelatorioEconomiaFormalMensal } from './relatorio-economia-anual';

function EconomiaFormal() {
    return (
        <div className='d-flex flex-column gap-4 w-100'>
            <h3>Economia Formal (Manaus)</h3>
            <div className='d-flex gap-4'>
                <SearchProvider>
                    <RelatorioEconomiaFormalTable />
                </SearchProvider>
                <SearchProvider>
                    <RelatorioEconomiaFormalMensal />
                </SearchProvider>
            </div>
        </div>
    );
}

export { EconomiaFormal };
