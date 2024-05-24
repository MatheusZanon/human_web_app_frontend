import { api } from "@/utils/axios";
import { ArquivosDrivePreview } from "@/utils/types/arquivos_drive";	

export async function getArquivoById(url: string) {
    const response = await api.get<ArquivosDrivePreview>(url);
    return response.data;
}