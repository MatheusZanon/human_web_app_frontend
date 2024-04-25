import { EconomiaFormal } from '@/components/dashboard/economia-formal';
import { ProvisaoDireitoTrabalhista } from '@/components/dashboard/provisao-direito-trabalhista';
import { SearchProvider } from '@/components/dashboard/search/search-provider';

function Dashboard() {
    return (
        <div className='d-flex flex-column gap-4 px-3 pb-3 shadow rounded mb-2'>
            <h1>Dashboard</h1>
            <div className='d-flex gap-4'>
                <SearchProvider>
                    <ProvisaoDireitoTrabalhista />
                </SearchProvider>
            </div>
            <div className='d-flex gap-4'>
                <EconomiaFormal />
            </div>
        </div>
    );
}

export default Dashboard;
