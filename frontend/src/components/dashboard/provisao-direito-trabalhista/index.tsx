import { LineChartCard } from '../line-chart';
import { Search } from '@/components/dashboard/search';
import { SearchProvider } from '../search/search-provider';

function ProvisaoDireitoTrabalhista() {
    return (
        <div className='w-100 p-2 rounded shadow'>
            <h3>Provisão Direito Trabalhista (34.87%)</h3>
            <div className='d-flex flex-column gap-2'>
                <SearchProvider>
                    <Search />
                </SearchProvider>
                <LineChartCard data={[]} />
            </div>
        </div>
    );
}

export { ProvisaoDireitoTrabalhista };
