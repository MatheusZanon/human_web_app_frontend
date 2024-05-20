import { api } from "@/utils/axios";
import { ArquivoDrivePreview } from "@/utils/types/arquivos_drive";	

export async function getArquivoById(url: string) {
    const response = await api.get<ArquivoDrivePreview>(url);
    return response.data;
}