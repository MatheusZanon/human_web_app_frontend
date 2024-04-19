import CardValesSST from "@/components/relatorios-card/vales-sst";
import CardReembolsos from "@/components/relatorios-card/reembolsos";
import { Content } from "@/components/layout/content";


function Relatorios() {
  return (
    <Content title="Relatorios">
      <div className='d-flex gap-3 flex-wrap'>
        <CardValesSST title="Vales e SST"/>
        <CardReembolsos title="Reembolsos"/>
      </div>
    </Content>
);
}

export default Relatorios;
