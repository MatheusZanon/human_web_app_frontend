import { LineChartCard } from '../line-chart';
import { Search } from '@/components/dashboard/search';
import { useSearch } from '../search/search-provider';
import { useEffect, useState } from 'react';
import { useGetProvisaoTrabalhista3487 } from '@/api/http/dashboard';

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
    const { data: provisoes0926 } = useGetProvisaoTrabalhista3487(url0926);

    /**
     * Mescla dois arrays de objetos JSON usando uma chave comum.
     * Se um objeto no segundo array tiver uma chave que já existe no primeiro array, adiciona um sufixo '2' para evitar conflito.
     * @param array1 - Primeiro array de objetos
     * @param array2 - Segundo array de objetos
     * @param key - Chave comum usada para combinar objetos
     * @returns Array de objetos mesclados
     */
    function mergeJsonArrays<T extends Record<string, any>, U extends keyof T>(array1: T[], array2: T[], key: U): T[] {
        // Criar um mapa para armazenar os objetos do primeiro array com base na chave
        const map = new Map<T[U], T>();

        // Adicionar objetos do primeiro array ao mapa usando a chave
        array1.forEach((obj) => {
            map.set(obj[key], { ...obj }); // Usa uma cópia para garantir que o objeto original não seja modificado
        });

        // Iterar sobre o segundo array
        array2.forEach((obj) => {
            const keyValue = obj[key];
            if (map.has(keyValue)) {
                const existingObj = map.get(keyValue);

                if (existingObj) {
                    // Adicionar campos do segundo array ao objeto existente
                    Object.keys(obj).forEach((subKey) => {
                        if (subKey !== key) {
                            const newKey = `${subKey}2`; // Adicionar sufixo '2' para evitar conflitos
                            existingObj[newKey as U] = obj[subKey];
                        }
                    });
                }
            } else {
                // Se a chave não existir, adicionar ao mapa
                map.set(keyValue, { ...obj }); // Usa uma cópia para evitar efeitos colaterais
            }
        });

        // Retornar todos os valores do mapa como um array
        return Array.from(map.values());
    }

    /**
     * Substitui as chaves de um array de objetos JSON com base em uma lista de chaves antiga e uma lista de chaves novas.
     * @template T O tipo do array de objetos JSON.
     * @template U O tipo das chaves.
     * @param data O array de objetos JSON.
     * @param oldKeys A lista de chaves antiga.
     * @param newKeys A lista de chaves novas.
     * @returns O array de objetos JSON com as chaves substituídas.
     */
    function replaceKeys<T extends Record<U, unknown>, U extends keyof T>(
        data: T[],
        oldKeys: U[],
        newKeys: string[],
    ): T[] {
        // Iterar sobre cada objeto do array
        return data.map((obj) => {
            // Criar um novo objeto vazio
            const newObj: Partial<Record<U, unknown>> = {}; // Usar Partial<Record<U, unknown>> para garantir que as chaves sejam opcionais
            // Iterar sobre cada chave do objeto
            Object.entries(obj).forEach(([key, value]) => {
                // Checar se a chave é uma das chaves antigas que serão substituídas
                const index = oldKeys.indexOf(key as U); // Converte a chave antiga para o tipo correto
                // Se a chave estiver na lista de chaves antigas que serão substituídas transformar na chave nova
                if (index !== -1) {
                    newObj[newKeys[index] as U] = value; // Converte a chave nova para o tipo correto
                } else {
                    // Se a chave não estiver na lista de chaves antigas que serão substituídas, adicionar a chave ao novo objeto
                    newObj[key as U] = value; // Converte a chave antiga para o tipo correto
                }
            });
            return newObj as T; // Converte o novo objeto para o tipo correto
        });
    }

    let provisoes: object[] = [];

    if (provisoes3487 && provisoes0926) {
        provisoes = mergeJsonArrays(provisoes0926, provisoes3487, 'mes');
        provisoes = replaceKeys(provisoes, ['valor', 'valor2'], ['09.26%', '34.87%']);
    }
    return (
        <div className='w-100 p-2 rounded shadow'>
            <h3>Provisão Direito Trabalhista</h3>
            <div className='d-flex flex-column gap-2'>
                <div className='d-flex gap-2'>
                    <Search companyFilter yearFilter />
                </div>
                <div className='d-flex gap-2 w-100'>
                    <LineChartCard data={provisoes || []} dataKeyX='mes' />
                </div>
            </div>
        </div>
    );
}

export { ProvisaoDireitoTrabalhista };
