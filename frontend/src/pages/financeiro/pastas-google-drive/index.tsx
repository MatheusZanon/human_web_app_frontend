import { useState, useEffect } from 'react';
import { Content } from "@/components/layout/content";
import { useGetArquivos } from "@/api/http/google_drive";
import { Link } from 'react-router-dom';
import LoadingScreen from "@/components/loading-screen";
import {Table, TableBody, TableData, TableHeader, TableRow, TableHead} from "@/components/table";
import { AlertTriangle } from 'lucide-react';
import { MdOutlineFolder, MdImage, MdPictureAsPdf, MdEditDocument } from 'react-icons/md';
import { BsFiletypeDoc, BsFileEarmarkZip, BsFiletypeTxt } from 'react-icons/bs';
import { FaFileExcel} from 'react-icons/fa';

function PastasGoogleDrive() {
    const initialFolderId = import.meta.env.VITE_FOLDER_ID;
    const [ url, setUrl ] = useState<string>(`google_drive/listar_arquivos?folder_id=${initialFolderId}`);
    const { data } = useGetArquivos(url);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (data) {
            setIsLoading(false);
        }
    })

    if (isLoading) return <LoadingScreen />
    if (error) return <div>{`Error: ${error}`}</div>

    if (data?.length === 0) {
        return (
            <Content title="Arquivos Drive Financeiro">
                <h6 className='text-center align-self-center'>
                    Nenhum arquivo encontrado{' '}
                    <p className='mt-2'>
                        <AlertTriangle />
                    </p>
                </h6>
            </Content>
        )
    } else {
        return (
            <Content title="Arquivos Drive Financeiro">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Nome</TableHeader>
                            <TableHeader>Ações</TableHeader>
                            <TableHeader>Última Modificação</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((arquivo) => (
                            <TableRow key={arquivo.id}>
                                <TableData>
                                    {arquivo.mimeType === "application/vnd.google-apps.folder" && <MdOutlineFolder/>}
                                    {arquivo.mimeType === "application/x-zip-compressed" && <BsFileEarmarkZip/>} 
                                    {arquivo.mimeType === "image/png" && <MdImage/>}
                                    {arquivo.mimeType === "application/vnd.google-apps.document" && <MdEditDocument/>}
                                    {arquivo.mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && <BsFiletypeDoc/>}
                                    {arquivo.mimeType === "application/pdf" && <MdPictureAsPdf/>} 
                                    {arquivo.mimeType === "text/plain" && <BsFiletypeTxt/>}
                                    {arquivo.mimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && <FaFileExcel/>} {arquivo.name}
                                </TableData>
                                <TableData>
                                    {arquivo.mimeType === "application/vnd.google-apps.folder" ? <Link to={`${arquivo.webViewLink}`} target='_blank'>Visualizar</Link> : <Link to={`${arquivo.webViewLink}`} target='_blank'>Visualizar</Link>}
                                </TableData>
                                <TableData>{arquivo.modifiedTime}</TableData>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Content>      
        )
    }
}


export default PastasGoogleDrive;