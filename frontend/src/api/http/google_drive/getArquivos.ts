import { api } from "@/utils/axios";

interface Arquivo {
    kind: string;
    id: string;
    name: string;
    mimeType: string;
    parents: string[];
    webViewLink: string;
    modifiedTime: string;
}

export async function getArquivos(url: string) {
    const response = await api.get<Arquivo[]>(url);
    return response.data;
}