export type ArquivosDrive = {
    kind: string;
    id: string;
    name: string;
    mimeType: string;
    parents: string;
    webViewLink: string;
    webContentLink: string;
    thumbnailLink: string;
    modifiedTime: string;
}

export type ArquivosDrivePreview = {
    base64: string;
}