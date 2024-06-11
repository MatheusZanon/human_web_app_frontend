import { useState } from 'react';
import api from '@/utils/axios';
import styles from './arquivoUpload.module.scss';
import {
    BaseModalBody,
    BaseModalContent,
    BaseModalHeader,
    BaseModalRoot,
    BaseModalTitle,
} from '@/components/baseModal';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

type ArquivoUploadProps = {
    parents: string;
    isOpen: boolean;
    onClose: () => void;
}

const ArquivoUpload = ( { parents, isOpen, onClose }: ArquivoUploadProps) => { 
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const onDrop = async (acceptedFiles: File[]) => {
        const formData = new FormData();
        acceptedFiles.forEach(file => {
          formData.append('files', file);
          formData.append('mime_types', file.type);
        });

        formData.append('parents', parents);
        
        try {
            setIsUploading(true);
            const response = await api.post('google_drive/upload_arquivo/', formData, { withCredentials: true, onUploadProgress: (progressEvent) => {
                    { progressEvent.total && setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total))};
                }
            });
            if (response.status === 200) {
                toast("Upload de arquivos concluído!", { type: 'success', position: 'bottom-right', autoClose: 1000 });
                setTimeout(() => {
                    setIsUploading(false);
                    setProgress(0);
                    onClose();
                }, 200);
            } else {
                toast("Ocorreu um erro ao realizar o upload de arquivos!", { type: 'error', position: 'bottom-right', autoClose: 1000 });
            }
        } catch (error) {
            toast("Ocorreu um erro ao realizar o upload de arquivos!", { type: 'error', position: 'bottom-right', autoClose: 1000 });
            setIsUploading(false);
            setProgress(0);
        }
      };
    
      const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    
      if (!isOpen) {
        return null;
      }
      return (
        <BaseModalRoot defaultOpen={isOpen} modalKey='arquivo_upload' onClose={onClose}>
            <BaseModalContent>
                <BaseModalHeader>
                    <BaseModalTitle>Upload de Arquivos</BaseModalTitle>
                </BaseModalHeader>
                <BaseModalBody>
                    <div {...getRootProps()} className={`${styles.dropzone} mb-2`}>
                        <input {...getInputProps()} />
                        { !isDragActive && <p>Arraste os arquivos para esta caixa, ou clique para seleciona-los</p>}
                    </div>
                    { isUploading && 
                        <>
                            <div className={`${styles.progress_bar}`}>
                                <div className={`${styles.progress_bar_fill}`} style={{ width: `${progress}%` }}></div>
                            </div>
                            <div className='progress-label text-center'><b>{progress}%</b></div>
                        </>
                    }
                </BaseModalBody>
            </BaseModalContent>
        </BaseModalRoot>
      );
};
    
export default ArquivoUpload;