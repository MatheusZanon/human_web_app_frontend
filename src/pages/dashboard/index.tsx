import { EconomiaLiquida } from '@/components/dashboard/economia-liquida';
import { Taxas } from '@/components/dashboard/taxas';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import Forbidden from '../layout/forbidden';

function Dashboard() {
    const { hasRole } = useAuthenticatedUser();

    if (!hasRole('ADMIN')) {
        return <Forbidden />;
    }
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
