import { useGetAllUsers } from '@/api/http/user';
import { TabelaFuncionarios } from '@/components/tabela-funcionarios';

function Funcionarios() {
    const users = useGetAllUsers();

    if (users.isSuccess && users.data.length > 0) {
        return (
            <div className='px-3 pb-3 shadow rounded mb-2'>
                <h1 className='my-3'>Funcionários</h1>
                <TabelaFuncionarios data={users.data} />
            </div>
        );
    } else {
        return <div>Não há funcionarios!</div>;
    }
}

export default Funcionarios;