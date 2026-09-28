import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { uploadCategoryImage, uploadGameImage } from "../../services/realServices/upload.service";

type ResourceType = 'category' | 'game';

const uploadersByResource: Record<ResourceType, (file: { uri: string; name: string; type: string }) => Promise<string>> = {
  game: uploadGameImage,
  category: uploadCategoryImage,
};

export function useImageUpload(resource: ResourceType, onUploaded: (url: string) => void) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function validateFile(file: ImagePicker.ImagePickerAsset): boolean {
    const fileMimeType = file.mimeType ?? "";
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
    const maxSize = 5 * 1024 * 1024; //5MB

    if (!file) return false;

    if (file.fileSize && file.fileSize > maxSize) {
      Toast.show({ type: "error", text1: 'Arquivo muito grande. Tamanho máximo: 5MB'});
      return false;
    }
    if (!allowedTypes.includes(fileMimeType)) {
      Toast.show({ type: "error", text1: 'Tipo de arquivo não permitido. Apenas JPEG, PNG, GIF, AVIF e WebP são aceitos.' });
      return false;
    }

    return true;
  }

  async function handleMediaPermission(): Promise<boolean> {
    const permission : ImagePicker.MediaLibraryPermissionResponse = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Toast.show({ type: "error", text1: "Permissão de acesso às fotos negada." });
      return false;
    }
    return true;
  }

  async function handleFileUpload(): Promise<void>{
    if (!await handleMediaPermission()) return;

    const result : ImagePicker.ImagePickerResult  = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (result.canceled || !result.assets[0]) return;

    const file : ImagePicker.ImagePickerAsset = result.assets[0];
    if (!validateFile(file)) return;

    setPreviewUrl(file.uri); // preview local, igual ao URL.createObjectURL do web
    setUploading(true);

    try {
      const url : string = await uploadersByResource[resource]({
        uri: file.uri,
        name: file.fileName ?? `${resource}-${Date.now()}.jpg`,
        type: file.mimeType ?? "",
      });
      onUploaded(url); // avisa o formulário: "a imagem está pronta, aqui está a URL"
    } catch {
      Toast.show({ type: "error", text1: "Erro ao enviar imagem." });
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  return { handleFileUpload, uploading, previewUrl };
}
