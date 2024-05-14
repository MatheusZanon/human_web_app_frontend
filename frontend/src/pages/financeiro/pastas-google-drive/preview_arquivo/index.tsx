import React from "react";
import { Content } from "@/components/layout/content";
import { useParams } from "react-router-dom";
import { useGetArquivoById } from "@/api/http/google_drive";

function PreviewArquivo() {
    const arquivo_id = useParams();
    console.log(arquivo_id);

    return (
        <div>
            <Content title="Preview de Arquivos">
                <h1>Preview Arquivo</h1>
            </Content>
        </div>
    )
}

export default PreviewArquivo;