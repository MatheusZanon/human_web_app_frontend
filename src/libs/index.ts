import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import * as ptBR from 'dayjs/locale/pt-br';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.locale(ptBR);

// Função auxiliar para validar CPF
export const isValidCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

    const cpfDigits = cpf.split('').map((el) => +el);
    const rest = (count: number): number =>
        ((cpfDigits.slice(0, count - 12).reduce((soma, el, index) => soma + el * (count - index), 0) * 10) % 11) % 10;

    return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
};

// Função auxiliar para validar CNPJ
export const isValidCNPJ = (cnpj: string): boolean => {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14 || !!cnpj.match(/(\d)\1{13}/)) return false;

    const cnpjDigits = cnpj.split('').map((el) => +el);
    const calculateCheckDigit = (digits: number[], base: number): number => {
        const factors = base === 13 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const sum = digits.slice(0, base - 1).reduce((acc, el, index) => acc + el * factors[index], 0);
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstCheckDigit = calculateCheckDigit(cnpjDigits, 13);
    const secondCheckDigit = calculateCheckDigit(cnpjDigits, 14);

    return firstCheckDigit === cnpjDigits[12] && secondCheckDigit === cnpjDigits[13];
};

export function toUnixTimestamp(date: Date) {
    return dayjs(date).unix();
}

export function fromUnixTimestamp(timestamp: number) {
    return dayjs.unix(timestamp).toDate();
}

export function fromNow(date: Date) {
    return dayjs(date).fromNow();
}

export function fromNowShort(date: Date) {
    return dayjs(date).fromNow(true);
}

export function fromNowDays(date: Date) {
    return dayjs().diff(dayjs(date), 'day');
}

export function toNow(date: Date) {
    return dayjs(date).toNow();
}

export function formatDate(date: Date, format = 'DD/MM/YYYY') {
    return dayjs(date).format(format);
}

export function formatIsoDate(date: string, format = 'DD/MM/YYYY') {
    return dayjs(date).format(format);
}

export function fromUtcDate(date: string) {
    return dayjs.utc(date).toDate();
}

export function formatDateTime(date: Date) {
    return dayjs(date).format('DD/MM/YYYY HH:mm');
}

export function formatTime(date: Date) {
    return dayjs(date).format('HH:mm');
}

export function formatCellphone(number: string) {
    return number.replace(/^(\d{2})[- ]?(\d{5})[- ]?(\d{4})$/, '($1) $2-$3');
}

export function formatCpf(cpf: string) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function formatCnpj(cnpj: string) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

export const cnpjFormatter = (cnpj: string): string => {
    // Remover todos os caracteres não numéricos
    const cleanCNPJ = cnpj.replace(/\D/g, '');

    // Adicionar pontuações conforme a quantidade de dígitos
    let formattedCNPJ = cleanCNPJ;

    if (cleanCNPJ.length > 2) {
        formattedCNPJ = `${cleanCNPJ.slice(0, 2)}.${cleanCNPJ.slice(2)}`;
    }

    if (cleanCNPJ.length > 5) {
        formattedCNPJ = `${formattedCNPJ.slice(0, 6)}.${cleanCNPJ.slice(5)}`;
    }

    if (cleanCNPJ.length > 8) {
        formattedCNPJ = `${formattedCNPJ.slice(0, 10)}/${cleanCNPJ.slice(8)}`;
    }

    if (cleanCNPJ.length > 12) {
        formattedCNPJ = `${formattedCNPJ.slice(0, 15)}-${cleanCNPJ.slice(12)}`;
    }
    formattedCNPJ = `${formattedCNPJ.slice(0, 18)}`;

    return formattedCNPJ;
};

export const cpfFormatter = (cpf: string): string => {
    // Remover todos os caracteres não numéricos
    let cleanCPF = cpf.replace(/\D/g, '');

    // Limitar a quantidade máxima de dígitos para 11
    cleanCPF = cleanCPF.slice(0, 11); // CPF deve ter 11 dígitos no máximo

    // Adicionar pontuações conforme a quantidade de dígitos
    let formattedCPF = cleanCPF;

    if (cleanCPF.length > 3) {
        formattedCPF = `${cleanCPF.slice(0, 3)}.${cleanCPF.slice(3, 6)}`;
    }

    if (cleanCPF.length > 6) {
        formattedCPF = `${formattedCPF.slice(0, 7)}.${cleanCPF.slice(6, 9)}`;
    }

    if (cleanCPF.length > 9) {
        formattedCPF = `${formattedCPF.slice(0, 11)}-${cleanCPF.slice(9, 11)}`;
    }

    return formattedCPF;
};

export const phoneFormatter = (phone: string): string => {
    // Remover todos os caracteres não numéricos
    let cleanPhone = phone.replace(/\D/g, '');

    // Limitar a quantidade de dígitos para 11 (celular) ou 10 (fixo)
    cleanPhone = cleanPhone.slice(0, 11); // Limita para um máximo de 11 dígitos

    let formattedPhone = cleanPhone;

    // Adicionar parênteses ao DDD
    if (cleanPhone.length > 2) {
        formattedPhone = `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 7)}`;
    }

    // Adicionar traço após o quinto dígito para telefones fixos (DDD + número)
    if (cleanPhone.length > 7) {
        formattedPhone = `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 7)}-${cleanPhone.slice(7, 11)}`;
    }

    return formattedPhone;
};

export function formatCep(cep: string) {
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
}

export function formatPhone(phone: string) {
    return phone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
}

export function formatRg(rg: string) {
    return rg.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
}

export function capitalize(value: string | null | undefined): string | null | undefined {
    if (typeof value !== 'string' || value === null || value === undefined) {
        return value;
    }

    const words = value.split('_');

    const capitalizedWords = words.map((word) => {
        if (typeof word !== 'string' || word === null || word === undefined) {
            return word;
        }

        const firstChar = word.charAt(0).toUpperCase();
        const restOfWord = word.slice(1).toLowerCase();

        return firstChar + restOfWord;
    });

    const capitalizedValue = capitalizedWords.join(' ');

    return capitalizedValue;
}

export function generateUUID() {
    // Cria um array de 16 bytes
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);

    // Modifica os bytes para corresponder à especificação UUID v4
    array[6] = (array[6] & 0x0f) | 0x40;  // Define a versão para 4
    array[8] = (array[8] & 0x3f) | 0x80;  // Define o variante para RFC 4122

    // Converte os bytes para uma string UUID
    const uuid = Array.from(array).map((byte, index) => {
        const hex = byte.toString(16).padStart(2, '0');
        return (index === 4 || index === 6 || index === 8 || index === 10) ? '-' + hex : hex;
    }).join('');

    return uuid;
}

/**
 * Mescla dois arrays de objetos JSON usando uma chave comum.
 * Se um objeto no segundo array tiver uma chave que já existe no primeiro array, adiciona um sufixo '2' para evitar conflito.
 * @param array1 - Primeiro array de objetos
 * @param array2 - Segundo array de objetos
 * @param key - Chave comum usada para combinar objetos
 * @returns Array de objetos mesclados
 */
export function mergeJsonArrays<T extends Record<string, any>, U extends keyof T>(
    array1: T[],
    array2: T[],
    key: U,
): T[] {
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
export function replaceKeys<T extends Record<U, unknown>, U extends keyof T>(
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
