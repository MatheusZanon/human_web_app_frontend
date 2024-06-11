import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { getArquivos } from "./getArquivos";
import { getArquivoById } from "./getArquivoById";

export function useGetArquivos(url: string) {
    return useQuery({
        queryKey: ["arquivos", url],
        queryFn: () => getArquivos(url),
    });
}

export function useGetArquivoById(url: string) {
    return useQuery({
        queryKey: ["arquivo_preview"],
        queryFn: () => getArquivoById(url),
    });
}