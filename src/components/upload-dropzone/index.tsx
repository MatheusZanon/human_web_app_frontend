import { useState } from 'react';
import api from '@/utils/axios';
import styles from './upload-dropzone.module.scss';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

type UploadDropzoneProps = {
    url: string;
    parents: string;
    onUploadComplete: () => void;
}

const UploadDropzone: React.FC<UploadDropzoneProps> = ({url, parents, onUploadComplete}) => {
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
            const response = await api.post(url, formData, { withCredentials: true, onUploadProgress: (progressEvent) => {
                    { progressEvent.total && setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total))};
                }
            });
            if (response.status === 200) {
                toast("Upload de arquivos concluído!", { type: 'success', position: 'bottom-right', autoClose: 1000 });
                setTimeout(() => {
                    setIsUploading(false);
                    setProgress(0);
                    onUploadComplete();
                }, 200);
            }
        } catch (error: any) {
            toast("Ocorreu um erro ao realizar o upload de arquivos!", { type: 'error', position: 'bottom-right', autoClose: 1000 });
            setIsUploading(false);
            setProgress(0);
        }
      };

      const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    return (
        <>     
            <div {...getRootProps()} className={`${styles.dropzone} mb-2`}>
                <input {...getInputProps()} disabled={isUploading} />
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
        </>
    )
}

export default UploadDropzone;