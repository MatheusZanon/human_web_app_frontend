import { api } from "@/utils/axios";
import { ArquivosDrivePreview } from "@/utils/types/google-drive/arquivos_drive";	

export async function getArquivoById(url: string) {
    const response = await api.get<ArquivosDrivePreview>(url, {responseType: 'blob'});
    return response.data;
}