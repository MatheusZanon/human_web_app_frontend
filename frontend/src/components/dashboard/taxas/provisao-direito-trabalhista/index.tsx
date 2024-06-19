import { useEffect, useState } from 'react';
import { LineChartCard } from '../../line-chart';
import { useSearch } from '../../search/search-provider';
import { useGetProvisaoTrabalhista0926, useGetProvisaoTrabalhista3487 } from '@/api/http/dashboard';
import { mergeJsonArrays, replaceKeys } from '@/libs';

function ProvisaoDireitoTrabalhista() {
    const { selected, ano } = useSearch();
    const [url3487, setUrl3487] = useState<string>(
        `dashboard/provisoes_direitos_trabalhistas_3487/?nome_razao_social=${selected}&ano=${ano ?? ''}`,
    );
    const [url0926, setUrl0926] = useState<string>(
        `dashboard/provisoes_direitos_trabalhistas_0926/?nome_razao_social=${selected}&ano=${ano ?? ''}`,
    );

    useEffect(() => {
        setUrl3487(`dashboard/provisoes_direitos_trabalhistas_3487/?nome_razao_social=${selected}&ano=${ano ?? ''}`);
        setUrl0926(`dashboard/provisoes_direitos_trabalhistas_0926/?nome_razao_social=${selected}&ano=${ano ?? ''}`);
    }, [selected, ano]);

    const { data: provisoes3487 } = useGetProvisaoTrabalhista3487(url3487);
    const { data: provisoes0926 } = useGetProvisaoTrabalhista0926(url0926);

    let provisoes: object[] = [];

    if (provisoes3487 && provisoes0926) {
        provisoes = mergeJsonArrays(provisoes0926, provisoes3487, 'mes');
        // @ts-expect-error O tipo se mantem e adiciona o valor2 em chaves repetidas porem não manteve a tipagem correta no merge do json FIXME
        provisoes = replaceKeys(provisoes, ['valor', 'valor2'], ['09.26%', '34.87%']);
    }

    return (
        <LineChartCard
            data={provisoes.length > 0 ? provisoes : undefined}
            // @ts-expect-error O tipo se mantem
            dataKeyX={provisoes ? 'mes' : undefined}
            title='Provisão Direito Trabalhista'
            syncId='1'
        />
    );
}

export { ProvisaoDireitoTrabalhista };
