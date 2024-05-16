import { api } from "@/utils/axios";
import { ArquivoDrivePreview } from "@/utils/types/arquivos_drive";	

export async function getArquivoById(id: string) {
    const response = await api.get<ArquivoDrivePreview>(`/gooogle_drive/preview_arquivo/${id}`);
    return response.data;
}