import { useGetAllUsers } from '@/api/http/user';
import { Content } from '@/components/layout/content';
import { TabelaFuncionarios } from '@/components/tabela-funcionarios';

function Funcionarios() {
    const users = useGetAllUsers();

    if (users.isSuccess && users.data.length > 0) {
        return (
            <Content title="Funcionários">
                <TabelaFuncionarios data={users.data} />
            </Content>
        );
    } else {
        return <div>Não há funcionarios!</div>;
    }
}

export default Funcionarios;
