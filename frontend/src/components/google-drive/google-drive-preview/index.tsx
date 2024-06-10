import React, {useEffect} from 'react';
import {
    BaseModalBody,
    BaseModalContent,
    BaseModalHeader,
    BaseModalProvider,
    BaseModalRoot,
    BaseModalTitle,
} from '@/components/baseModal';
import LoadingScreen from '@/components/loading-screen';
import { MdDownload } from 'react-icons/md';
import AlertMessage from '@/components/alert-message';

type ArquivoPreviewProps = {
    id: string;
    url: string;
    name: string;
    tipo: string;
    isOpen: number;
    onDismiss: () => void;
};

const ArquivoPreview: React.FC<ArquivoPreviewProps> = ({ id, url, name, tipo, isOpen, onDismiss }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    useEffect(() => {
        if (isOpen !== -1) {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
    }, [isOpen]);

    const handleDownloadClick = (id: string, nome: string) => {
        const url = `http://localhost:8000/api/google_drive/download_file?arquivo_id=${id}`;
        const link = document.createElement('a');
        link.href = url;
        link.download = nome;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isOpen === -1) {
        return null;
    }
    return (
        <BaseModalProvider>
            <BaseModalRoot defaultOpen={isModalOpen} modalKey='arquivo_preview' onClose={onDismiss}>
                <BaseModalContent styles={{maxWidth:'1200px', width: '100%', height: '100%'}}>
                    <BaseModalHeader>
                        <BaseModalTitle styles={{minWidth:'95%'}}>
                           {name}
                        </BaseModalTitle>
                        {tipo !== 'application/pdf' && <button className="btn btn-sm btn-secondary" onClick={ () => handleDownloadClick(id, name)}><MdDownload size={20} /></button>}
                    </BaseModalHeader>
                    <BaseModalBody>
                        {!url ? <LoadingScreen /> : 
                            tipo === 'application/pdf' ? 
                                <iframe src={`${url}#navpanes=0`} width="100%" height="600px" style={{ border: 'none' }}></iframe>
                            : tipo === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                            tipo === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? 
                                <AlertMessage message="Formato de arquivo não suportado para visualização." />
                            : tipo === 'text/plain' ? 
                                <iframe src={url} width="100%" height="500" />
                            : tipo === 'image/png' || tipo === 'image/jpeg' ? 
                                <img src={url} alt="Imagem" className="img-fluid align-self-center" width="50%" height="500" />
                            : tipo === 'image/gif' ? 
                                <img src={url} alt="Gif" className="img-fluid align-self-center" width="50%" height="500" />
                            : tipo === 'video/mp4' ? 
                                <video src={url} className="img-fluid align-self-center" width="100%" height="500" controls />
                            : 
                                <p>Formato de arquivo não suportado para visualização.</p>
                        }
                    </BaseModalBody>
                </BaseModalContent>
            </BaseModalRoot>
        </BaseModalProvider>
    );
}

export default ArquivoPreview;
