import { api } from "@/utils/axios";
import { ArquivosDrive } from "@/utils/types/google-drive/arquivos_drive";

export async function getArquivos(url: string) {
    const response = await api.get<ArquivosDrive[]>(url);
    return response.data;
}