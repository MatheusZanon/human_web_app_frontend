import React, { useState, useEffect } from 'react';
import api from '@/utils/axios';
import { useGetArquivoById } from '@/api/http/google_drive';

function ArquivoPreview ({ arquivo_id } :{arquivo_id: string}) {
    const [url, setUrl] = useState<string>(`google_drive/serve_file_preview?arquivo_id=${arquivo_id}`);
    const preview = useGetArquivoById(url);  
    const pdfData = `data:application/pdf;base64,${preview.data}`;

    return (
        <div>
            <iframe src={pdfData} width="100%" height="600px" style={{ border: 'none' }}></iframe>
        </div>
    )
}

export default ArquivoPreview;