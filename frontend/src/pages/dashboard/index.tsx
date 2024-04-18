import { ProvisaoDireitoTrabalhista } from '@/components/dashboard/provisao-direito-trabalhista';
import { ProvisaoDireitoTrabalhistaProvider } from '@/components/dashboard/provisao-direito-trabalhista/provisao-direito-trabalhista-provider';

function Dashboard() {
    return (
        <div className='d-flex flex-column gap-4 px-3 pb-3 shadow rounded mb-2'>
            <h1>Dashboard</h1>
            <div className='d-flex gap-4'>
                <ProvisaoDireitoTrabalhistaProvider>
                    <ProvisaoDireitoTrabalhista />
                </ProvisaoDireitoTrabalhistaProvider>
            </div>
        </div>
    );
}

export default Dashboard;
