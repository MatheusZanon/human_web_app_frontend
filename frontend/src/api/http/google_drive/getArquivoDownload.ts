import api from "@/utils/axios";

export const getArquivoDownload = async (id: string, nome: string) => {
    const response = await api.get(`google_drive/download_arquivo?id=${id}&nome=${nome}`, {responseType: 'blob'});
    return response.data;
}