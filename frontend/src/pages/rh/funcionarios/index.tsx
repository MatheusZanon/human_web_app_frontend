import { useGetActiveUsers } from '@/api/http/user';
import AlertMessage from '@/components/alert-message';
import { Content } from '@/components/layout/content';
import { TabelaFuncionarios } from '@/components/tabela-funcionarios';

function Funcionarios() {
    const users = useGetActiveUsers();

    if (users.isSuccess && users.data.length > 0) {
        return (
            <Content title="Funcionários">
                <TabelaFuncionarios data={users.data} />
            </Content>
        );
    } else {
        return (
            <Content title="">
                <AlertMessage message="Funcionários não encontrados!"/>
            </Content>
        );
    }
}

export default Funcionarios;
