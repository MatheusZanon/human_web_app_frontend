import styles from './reembolsos-card.module.scss';
import { Table, TableBody, TableData, TableHeader, TableRow, TableHead  } from "@/components/table";
import { useGetReembolsos } from '@/api/http/financeiro_valores';

function CardReembolsos({ ...props }) {
    const reembolsos = useGetReembolsos();
    return (
        <div className={`card ${styles.card}`}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableHeader>ID</TableHeader>
                        <TableHeader>Nome</TableHeader>
                        <TableHeader>Descrição</TableHeader>
                        <TableHeader>Valor</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reembolsos.isSuccess && reembolsos.data.length > 0 && reembolsos.data.map(reembolso => (
                        <TableRow key={reembolso.id}>
                            <TableData>{reembolso.id}</TableData>
                            <TableData>{reembolso.nome_razao_social}</TableData>
                            <TableData>{reembolso.descricao}</TableData>
                            <TableData>{reembolso.valor.toFixed(2).toString().replace('.',',')}</TableData>
                        </TableRow>
                         ))}   
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default CardReembolsos;