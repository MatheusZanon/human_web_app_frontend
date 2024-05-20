import React, { useState } from "react";
import { Content } from "@/components/layout/content";
import { useParams } from "react-router-dom";
import { useGetArquivoById } from "@/api/http/google_drive";

function PreviewArquivo() {
    const id = useParams();
    const [url, setUrl] = useState<string>(`/google_drive/preview_arquivo/?arquivo_id=${id.arquivoId}`);
    const arquivo = useGetArquivoById(url);

    return (
        <div>
            <Content title="Preview">
                <div className="d-flex gap-3 flex-wrap">
                    {arquivo.data &&
                    <>
                        <p>{arquivo.data.id}</p>
                        <p>{arquivo.data.name}</p>
                    </> 
                    }
                </div>
            </Content>
        </div>
    )
}

export default PreviewArquivo;