import { EconomiaLiquida } from '@/components/dashboard/economia-liquida';
import { Taxas } from '@/components/dashboard/taxas';
import { useAuthenticatedUser } from '@/contexts/AuthenticatedUser/AuthenticatedUserProvider';
import { Link } from 'react-router-dom';

function Dashboard() {
    const { hasRole } = useAuthenticatedUser();

    if (!hasRole('admin')) {
        return (
            <div className='d-flex flex-column align-items-center justify-content-center container min-vh-100'>
                <div className='d-block text-center w-50 h-50 overflow-hidden' style={{ maxHeight: '500px' }}></div>
                <div className='text-center'>
                    <h1>Acesso não autorizado.</h1>
                    <Link to='/main' className='btn btn-primary'>
                        Ir para página inicial
                    </Link>
                </div>
            </div>
        );
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
