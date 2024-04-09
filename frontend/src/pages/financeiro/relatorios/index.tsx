import CardValesSST from "@/components/relatorios-card/vales-sst";
import CardReembolsos from "@/components/relatorios-card/reembolsos";


function Relatorios() {
  return (
    <div className="px-3 pb-3 shadow rounded mb-2">
      <h1 className="my-3">Relatorios</h1>
      <div className='d-flex gap-3 flex-wrap'>
        <CardValesSST title="Vales e SST"/>
        <CardReembolsos title="Reembolsos"/>
      </div>
    </div>
);
}

export default Relatorios;
