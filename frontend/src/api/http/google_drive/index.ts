import { toast } from 'react-toastify';
import { queryClient } from '@/utils/queryClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getArquivos } from "./getArquivos";
import { getArquivoById } from "./getArquivoById";
import { getArquivoDownload } from './getArquivoDownload';

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

export function useGetArquivoDownload() {
    return useMutation({
        mutationKey: ["arquivo_download"],
        mutationFn: ({id, nome}: {id: string, nome: string}) => getArquivoDownload(id, nome),
        onSuccess: () => {
            toast("Download finalizado!", {type: "success", position: "bottom-right"});
        },

    });
}   