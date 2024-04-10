import styles from './vales-sst.module.scss';
import { Table, TableBody, TableData, TableHeader, TableRow, TableHead  } from "@/components/table";
import { useGetValesSST } from '@/api/http/financeiro_valores';

function CardValesSST({ ...props }) {
    const valesSST = useGetValesSST();
    return (
        <div className={`card ${styles.card}`}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableHeader>ID</TableHeader>
                        <TableHeader>Nome</TableHeader>
                        <TableHeader>Vale Transporte</TableHeader>
                        <TableHeader>Assinatura Eletrônica</TableHeader>
                        <TableHeader>Vale Refeição</TableHeader>
                        <TableHeader>Ponto Eletrônico</TableHeader>
                        <TableHeader>Saúde/Segurança do Trabalho</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {valesSST.isSuccess && valesSST.data.length > 0 && valesSST.data.map(vale => (
                            <TableRow key={vale.id}>
                            <TableData>{vale.id}</TableData>
                            <TableData>{vale.nome_razao_social}</TableData>
                            <TableData>{vale.vale_transporte.toFixed(2).toString().replace('.',',')}</TableData>
                            <TableData>{vale.assinat_eletronica.toFixed(2).toString().replace('.',',')}</TableData>
                            <TableData>{vale.vale_refeicao.toFixed(2).toString().replace('.',',')}</TableData>
                            <TableData>{vale.mensal_ponto_elet.toFixed(2).toString().replace('.',',')}</TableData>
                            <TableData>{vale.saude_seguranca_trabalho.toFixed(2).toString().replace('.',',')}</TableData>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default CardValesSST;