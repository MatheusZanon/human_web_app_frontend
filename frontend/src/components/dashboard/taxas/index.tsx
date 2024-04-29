import { Search } from '@/components/dashboard/search';
import { SearchProvider } from '../search/search-provider';
import { TaxaAdministracao } from './taxa-administracao';
import { ProvisaoDireitoTrabalhista } from './provisao-direito-trabalhista';

function Taxas() {
    return (
        <div className='w-100 p-2 rounded shadow'>
            <h3>Taxas</h3>
            <div className='d-flex flex-column gap-2'>
                <SearchProvider>
                    <Search companyFilter yearFilter />
                    <div className='d-flex gap-4'>
                        <ProvisaoDireitoTrabalhista />
                        <TaxaAdministracao />
                    </div>
                </SearchProvider>
            </div>
        </div>
    );
}

export { Taxas };
