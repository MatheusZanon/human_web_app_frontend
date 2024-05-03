import { AreaChartCard } from '@/components/dashboard/area-chart';
import { BarChartCard } from '@/components/dashboard/bar-chart';
import { EconomiaLiquida } from '@/components/dashboard/economia-liquida';
import { Taxas } from '@/components/dashboard/taxas';

function Dashboard() {
    return (
        <div className='d-flex flex-column gap-4 px-3 pb-3 shadow rounded mb-2'>
            <h1>Dashboard</h1>
            <div className='d-flex gap-4'>
                <Taxas />
            </div>
            <div className='d-flex gap-4'>
                <EconomiaLiquida />
            </div>
        </div>
    );
}

export default Dashboard;
