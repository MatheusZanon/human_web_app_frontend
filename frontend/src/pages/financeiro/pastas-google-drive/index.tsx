import { useState, useEffect } from 'react';
import { useGetArquivos } from "@/api/http/google_drive";
import { Content } from "@/components/layout/content";
import AlertMessage from '@/components/alert-message';
import LoadingScreen from "@/components/loading-screen";
import {Table, TableBody, TableData, TableHeader, TableRow, TableHead} from "@/components/table";
import { ArrowBigLeftDash, Search, Download } from 'lucide-react';
import { MdFolder, MdImage, MdPictureAsPdf, MdEditDocument } from 'react-icons/md';
import { BsFiletypeDoc, BsFileEarmarkZip, BsFiletypeTxt } from 'react-icons/bs';
import { FaFileExcel} from 'react-icons/fa';
import { formatDateTime } from '@/libs';


function PastasGoogleDrive() {
    const initialFolderId = import.meta.env.VITE_FOLDER_ID;
    const [currentFolderId, setCurrentFolderId] = useState(initialFolderId);
    const [ url, setUrl ] = useState<string>(`google_drive/listar_arquivos?folder_id=${initialFolderId}`);
    const arquivosDrive  = useGetArquivos(url);
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        setUrl(`google_drive/listar_arquivos?folder_id=${currentFolderId}`);
    }, [currentFolderId]);

    const handleClick = (folderId: string) => {
        setHistory(prev => [...prev, currentFolderId]);
        setCurrentFolderId(folderId);
    }

    const handleBackClick = () => {
        setHistory(prev => {
            const newHistory = [...prev];
            const previousFolderId = newHistory.pop(); // Remove e obtém o último ID do histórico
            setCurrentFolderId(previousFolderId);
            return newHistory;
        });
    }
    
    if (arquivosDrive.isLoading) return <LoadingScreen />
    if (arquivosDrive.error) return (<Content title=""><AlertMessage message="Erro ao buscar arquivos!" /></Content>)

    if (arquivosDrive.data?.length === 0) {
        return (
            <Content title="Arquivos Drive Financeiro">
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => handleBackClick()}
                    >
                    <ArrowBigLeftDash />
                </button>  
                <AlertMessage message="Nenhum arquivo encontrado!" />
            </Content>
        )
    } else {
        return (
            <Content title="Arquivos Drive Financeiro">
                {currentFolderId !== initialFolderId &&
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={() => {handleBackClick();}}
                    >
                        <ArrowBigLeftDash />
                    </button>      
                }
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Nome</TableHeader>
                            <TableHeader>Ações</TableHeader>
                            <TableHeader>Última Modificação</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {arquivosDrive.data?.map((arquivo) => (
                            <TableRow key={arquivo.id}>
                                <TableData>
                                    {arquivo.mimeType === "application/vnd.google-apps.folder" && 
                                        <button 
                                        type="button" className='btn' onClick={() => handleClick(arquivo.id)} style={{margin: 0, padding: 0, border: 'none'}}>
                                            <div className='d-flex align-items-center gap-2'>
                                                <MdFolder size={22}/> {arquivo.name}
                                            </div>
                                        </button>
                                    }
                                    {arquivo.mimeType === "application/x-zip-compressed" && 
                                        <div className='d-flex align-items-center gap-2'>
                                            <BsFileEarmarkZip color="#88770D" size={22}/> {arquivo.name}
                                        </div>
                                    } 
                                    {(arquivo.mimeType === "image/png" || arquivo.mimeType === "image/jpeg") && 
                                        <div className='d-flex align-items-center gap-2'>
                                            <MdImage color='#EF3232' size={22}/> {arquivo.name}
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
                                <TableData>
                                    {arquivo.mimeType === "application/vnd.google-apps.folder" ? 
                                    <div className='justify-content-center align-items-center'>
                                        - 
                                    </div>
                                    : 
                                    <div className='d-flex justify-content-center align-items-center gap-2'>
                                        <button
                                            className='btn btn-warning btn-sm p-1 d-flex justify-content-center align-items-center'
                                        >
                                            <Search width={16} height={16} />
                                        </button>
                                        <button
                                            className='btn btn-sm p-1 d-flex justify-content-center align-items-center'
                                        >
                                            <Download width={16} height={16} />
                                        </button>
                                    </div>
                                    }
                                </TableData>
                                <TableData>{formatDateTime(new Date(arquivo.modifiedTime))}</TableData>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Content>      
        )
    }
}


export default PastasGoogleDrive;