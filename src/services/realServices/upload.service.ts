import { api } from "../api";

type UploadContext = 'games' | 'categories' | 'studios';

async function uploadImage(file: { uri: string; name: string; type: string }, context: UploadContext): Promise<string> {
    const formData = new FormData();
    // no RN, o FormData espera esse formato { uri, name, type } em vez de um File real,
    // já que não existe File/Blob do jeito que o navegador tem
    formData.append('image', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    } as any); // 'image' precisa bater com upload.single('image') no backend

    const response = await api.post<{ url: string }>(`/api/uploads/${context}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    return response.data.url;
}

export const uploadGameImage = (file: { uri: string; name: string; type: string }): Promise<string> => uploadImage(file, 'games');
export const uploadCategoryImage = (file: { uri: string; name: string; type: string }): Promise<string> => uploadImage(file, 'categories');
