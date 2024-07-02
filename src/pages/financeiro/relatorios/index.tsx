import CardValesSST from '@/components/relatorios/vales-sst/vales-sst-card';
import CardReembolsos from '@/components/relatorios/reembolsos/reembolsos-card';
import { Content } from '@/components/layout/content';
import { SearchProvider } from '@/components/dashboard/search/search-provider';

function Relatorios() {
    return (
        <Content title='Relatorios'>
            <div className='d-flex gap-3 flex-wrap'>
                <CardValesSST title='Vales e SST' />
                <SearchProvider>
                    <CardReembolsos title='Reembolsos' />
                </SearchProvider>
            </div>
        </Content>
    );
}

export default Relatorios;
