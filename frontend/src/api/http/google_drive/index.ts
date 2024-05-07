import { useQuery } from '@tanstack/react-query';
import { getArquivos } from "./getArquivos";

export function useGetArquivos(url: string) {
    return useQuery({
        queryKey: ["arquivos"],
        queryFn: () => getArquivos(url),
    });
}