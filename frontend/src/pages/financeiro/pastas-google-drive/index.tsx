import api from '@/utils/axios';
import { useState, useEffect } from 'react';
import { useGetArquivos } from "@/api/http/google_drive";
import { useAuthenticatedUser } from "@/contexts/AuthenticatedUser/AuthenticatedUserProvider";
import { Content } from "@/components/layout/content";
import AlertMessage from '@/components/alert-message';
import LoadingScreen from "@/components/loading-screen";
import {Table, TableBody, TableData, TableHeader, TableRow, TableHead} from "@/components/table";
import ArquivoPreview from '@/components/google-drive/google-drive-preview';
import ArquivoUpload from '@/components/google-drive/google-drive-upload';
import CriarPasta from '@/components/google-drive/google-drive-criar-pasta';
import {ContextMenu, ContextMenuButton} from '@/components/context-menu';
import { useContextMenu } from '@/contexts/ContextMenu/ContextMenuProvider';
import { ArrowBigLeftDash, Search } from 'lucide-react';
import { MdArchive, MdFolder, MdImage, MdPictureAsPdf, MdEditDocument, MdVideoLibrary, MdUpload, MdDownload } from 'react-icons/md';
import { BsFiletypeDoc, BsFileEarmarkZip, BsFiletypeTxt } from 'react-icons/bs';
import { FaFileExcel} from 'react-icons/fa';
import { formatDateTime } from '@/libs';
import {BaseModalProvider,BaseModalTrigger} from '@/components/baseModal';

function PastasGoogleDrive() {
    const { hasRole } = useAuthenticatedUser();
    const initialFolderId = import.meta.env.VITE_FOLDER_ID;
    const [currentFolderId, setCurrentFolderId] = useState(initialFolderId);
    const [ url, setUrl ] = useState<string>(`google_drive/listar_arquivos?folder_id=${initialFolderId}`);
    const arquivosDrive  = useGetArquivos(url);
    const [navegationHistory, setnavegationHistory] = useState<string[]>([]);
    const [fileHistory, setfileHistory] = useState<string[]>([]);
    const [prevUrl, setPrevUrl] = useState<string>('');
    const [arquivoParentId, setArquivoParentId] = useState('');
    const [arquivoPrevId, setArquivoPrevId] = useState('');
    const [arquivoPrevName, setArquivoPrevName] = useState('');
    const [arquivoPrevUrl, setArquivoPrevUrl] = useState('');
    const [arquivoPrevTipo, setArquivoPrevTipo] = useState('');
    const [arquivoPrevIndex, setArquivoPrevIndex] = useState(-1);
    const [isModalPrevOpen, setIsModalPrevOpen] = useState(-1);
    const [isModalUploadOpen, setIsModalUploadOpen] = useState(false);
    const {type, showContextMenu} = useContextMenu();


    useEffect(() => {
        setUrl(`google_drive/listar_arquivos?folder_id=${currentFolderId}`);
        setArquivoParentId(currentFolderId);
    }, [currentFolderId]);
    
    useEffect(() => {
        const fetchArquivoInfo = async () => {
            if (isModalPrevOpen === -1) {
                return null
            }
            try {
                const response = await api.get(prevUrl, {responseType: 'blob'});
                setArquivoPrevUrl(URL.createObjectURL(response.data));
                setArquivoPrevTipo(response.headers['content-type']);
            } catch (error) {
                console.log('Erro ao carregar o arquivo: ', error);
            }
        };

        fetchArquivoInfo();
    }, [isModalPrevOpen]);

    const handleClick = (folderId: string, fileName: string) => {
        setnavegationHistory(prev => [...prev, currentFolderId]);
        setfileHistory(prev => [...prev, fileName]);
        setCurrentFolderId(folderId);
    }

    const handleBackClick = () => {
        setnavegationHistory(prev => {
            const newHistory = [...prev];
            const previousFolderId = newHistory.pop(); // Remove e obtém o último ID do histórico
            setCurrentFolderId(previousFolderId);
            return newHistory;
        });
        setfileHistory(prev => {
            const newHistory = [...prev];
            newHistory.pop();
            return newHistory;
        });
    }

    const handlePreviewClick = (id: string, nome: string, index: number) => {
        setPrevUrl(`http://localhost:8000/api/google_drive/serve_file_preview?arquivo_id=${id}`);
        setArquivoPrevName(nome);
        setIsModalPrevOpen(index);
    }

    function resetPreview() {
        // Ajuste os estados conforme necessário
        setArquivoPrevUrl('');
        setArquivoPrevName('');
        setArquivoPrevTipo('');
        setIsModalPrevOpen(-1);
    }

    const handleTableRoWClick = (id: string, nome: string, mimeType: string, index: number) => {
        setArquivoPrevId(id);
        setArquivoPrevName(nome);
        setArquivoPrevTipo(mimeType);
        setArquivoPrevIndex(index);
    }

    const handleDownloadClick = (id: string, nome: string) => {
        const url = `http://localhost:8000/api/google_drive/download_file?arquivo_id=${id}`;
        const link = document.createElement('a');
        link.href = url;
        link.download = nome;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const closeUploadModal = () => {
        setIsModalUploadOpen(false);
    }

    if (arquivosDrive.isLoading) {
        return <LoadingScreen />
    } else {
        return (
            <Content title="Arquivos">
                <BaseModalProvider>
                <div className='row align-items-center'>
                    <div className='d-flex gap-3 align-items-center mb-3'>
                        {currentFolderId === initialFolderId ?
                                <button
                                type='button'
                                className='btn btn-primary disabled'
                                >
                                    <ArrowBigLeftDash />
                                </button> 
                            :
                            <>         
                                <button
                                    type='button'
                                    className='btn btn-primary'
                                    onClick={() => {handleBackClick()}}
                                    >
                                    <ArrowBigLeftDash />
                                </button>
                                <div className='d-flex align-items-center gap-2'>
                                    <MdFolder size={22}/>
                                    {fileHistory.map( (file, index) => (
                                        <span>{file}{index !== fileHistory.length - 1 && ' > '}</span>
                                    ))}
                                </div>    
                            </>
                        }
                    </div>
                    <div className='d-flex gap-2 align-items-end'>
                        <ContextMenu>
                            <ContextMenuButton type={'head'} onClick={() => {setIsModalUploadOpen(true)}}>
                                <BaseModalTrigger modalKey='arquivo_upload' 
                                    styles={{ width: '100%', border: 'none', justifyContent: 'center' }}
                                >
                                    <MdUpload size={22} /> Upload
                                </BaseModalTrigger>
                            </ContextMenuButton >
                            <ContextMenuButton type={'head'}>
                                <BaseModalTrigger modalKey='criar_pasta' styles={{ width: '100%', border: 'none', justifyContent: 'center' }}>
                                    <MdFolder size={22} /> Criar Pasta
                                </BaseModalTrigger>
                            </ContextMenuButton>
                            {arquivoPrevTipo === 'application/vnd.google-apps.folder' && 
                                <>
                                    <ContextMenuButton type={'row'} onClick={() => {setIsModalUploadOpen(true)}}>
                                        <BaseModalTrigger modalKey='arquivo_upload' 
                                            styles={{ width: '100%', border: 'none', justifyContent: 'center' }}            
                                        >
                                            <MdUpload size={22} /> Upload
                                        </BaseModalTrigger>
                                    </ContextMenuButton >
                                    <ContextMenuButton type={'row'}>
                                        <BaseModalTrigger modalKey='criar_pasta' 
                                            styles={{ width: '100%', border: 'none', justifyContent: 'center' }}
                                        >
                                            <MdFolder size={22} /> Criar Pasta
                                        </BaseModalTrigger>
                                    </ContextMenuButton>
                                </>
                            }
                            {arquivoPrevTipo !== 'application/vnd.google-apps.folder' && 
                                <>
                                    <ContextMenuButton type={'row'} onClick={() => {handlePreviewClick(arquivoPrevId, arquivoPrevName, arquivoPrevIndex)}}>
                                        <Search size={20} /> Visualizar
                                    </ContextMenuButton>
                                    <ContextMenuButton type={'row'} onClick={() => {handleDownloadClick(arquivoPrevId, arquivoPrevName)}}><MdDownload size={22} /> Download</ContextMenuButton>
                                </>
                            }
                        </ContextMenu>
                    </div>  
                    <ArquivoUpload 
                        parents={arquivoParentId} 
                        isOpen={isModalUploadOpen}
                        onClose={closeUploadModal}
                    />

                    <ArquivoPreview 
                        id={arquivoPrevId}
                        url={arquivoPrevUrl} 
                        name={arquivoPrevName} 
                        tipo={arquivoPrevTipo} 
                        isOpen={isModalPrevOpen} 
                        onDismiss={resetPreview}
                    />

                    <CriarPasta />
                </div>

                {arquivosDrive.error && <AlertMessage message="Erro ao buscar arquivos!" />}
                {arquivosDrive.data?.length === 0 && 
                    <div className='d-flex flex-column align-items-center'>
                        <AlertMessage message="Nenhum arquivo encontrado!" />
                        <BaseModalTrigger variant='secondary' modalKey='arquivo_upload' onClick={() => {setIsModalUploadOpen(true)}}>
                            <MdUpload size={22} /> Upload
                        </BaseModalTrigger>
                    </div>
                }
                </BaseModalProvider>                

                {arquivosDrive.data && arquivosDrive.data.length > 0 && !arquivosDrive.error && (
                    <Table>
                        <TableHead onContextMenu={(e) => {showContextMenu(e, 'head'), type=='head'}}>
                            <TableRow>
                                <TableHeader>Nome</TableHeader>
                                <TableHeader>Última Modificação</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {arquivosDrive.data?.map((arquivo, index) => (
                                <TableRow key={arquivo.id} onContextMenu={(e) => {
                                        showContextMenu(e, 'row'); type=='row'; 
                                        handleTableRoWClick(arquivo.id, arquivo.name, arquivo.mimeType, index);
                                    }}
                                >
                                    <TableData>
                                        {arquivo.mimeType === "application/vnd.google-apps.folder" && 
                                            <button 
                                            type="button" className='btn' onClick={() => handleClick(arquivo.id, arquivo.name)} style={{margin: 0, padding: 0, border: 'none'}}>
                                                <div className='d-flex align-items-center gap-2'>
                                                    <MdFolder size={22}/> {arquivo.name}
                                                </div>
                                            </button>
                                        }
                                        {arquivo.mimeType === "application/x-msdownload" && 
                                            <div className='d-flex align-items-center gap-2'>
                                                <MdArchive color="#626D0A" size={22}/> {arquivo.name}
                                            </div>
                                        } 
                                        {arquivo.mimeType === "application/x-zip-compressed" && 
                                            <div className='d-flex align-items-center gap-2'>
                                                <BsFileEarmarkZip color="#88770D" size={22}/> {arquivo.name}
                                            </div>
                                        } 
                                        {(arquivo.mimeType === "image/png" || arquivo.mimeType === "image/jpeg" || arquivo.mimeType === "image/gif") && 
                                            <div className='d-flex align-items-center gap-2'>
                                                <MdImage color='#EF3232' size={22}/> {arquivo.name}
                                            </div>
                                        }
                                        {(arquivo.mimeType === "video/mp4" || arquivo.mimeType === "image/jpeg") && 
                                            <div className='d-flex align-items-center gap-2'>
                                                <MdVideoLibrary color='#EF3232' size={22}/> {arquivo.name}
                                            </div>
                                        }
                                        {arquivo.mimeType === "application/vnd.google-apps.document" && 
                                            <div className='d-flex align-items-center gap-2'>
                                                <MdEditDocument color="#0D3FB0" size={22}/> {arquivo.name}
                                            </div>
                                        }
                                        {arquivo.mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && 
                                            <div className='d-flex align-items-center gap-2'>
                                                <BsFiletypeDoc color="#2370D1" size={22}/> {arquivo.name} 
                                            </div>
                                        }
                                        {arquivo.mimeType === "application/pdf" &&
                                            <div className='d-flex align-items-center gap-2'>
                                                <MdPictureAsPdf color='#FF0000' size={22}/> {arquivo.name}
                                            </div>
                                        } 
                                        {arquivo.mimeType === "text/plain" && 
                                            <div className='d-flex align-items-center gap-2'>
                                                <BsFiletypeTxt size={22}/> {arquivo.name}
                                            </div>
                                        }
                                        {arquivo.mimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && 
                                            <div className='d-flex align-items-center gap-2'>
                                                <FaFileExcel color='#106C05' size={22}/> {arquivo.name}
                                            </div>
                                        }
                                    </TableData>
                                    <TableData>{formatDateTime(new Date(arquivo.modifiedTime))}</TableData>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Content>  
        )
    }
}

export default PastasGoogleDrive;