import { CategoryResponseDTO } from "@/src/@types/category/category.dto";
import { Button } from "@/src/components/common/Generic/Button/Button";
import { deleteCategory } from "@/src/services/realServices/category.service";
import { resolveImageUrl } from "@/src/utils/resolveImage/resolveImageUrl";
import { appTableFeatures } from "@/src/utils/tableFeatures";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "expo-router";
import { PencilIcon, TrashIcon } from "phosphor-react-native";
import { useState } from "react";
import { Image } from "react-native";
import Toast from "react-native-toast-message";

const columnHelper = createColumnHelper<typeof appTableFeatures, CategoryResponseDTO>();

export function useCategoryTable(refetch: () => void){
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
    const router = useRouter();

    const handleEdit = (row: CategoryResponseDTO) => {
        // router.push(`/admin/categories/edit/${row.id_category}`);
    }
    const handleDelete = async (id_category: number) => {
        try{
            await deleteCategory(id_category);
            setConfirmDeleteId(null)
            refetch();
        } catch(err){
            const message = err instanceof Error ? err.message : "Erro inesperado.";
            Toast.show({ type: "error", text1: message })
        }
    }

    const CategoryColumns = columnHelper.columns([
      columnHelper.accessor("name", { header: "Nome" }),
      columnHelper.accessor("description", { header: "Descrição" }),
      columnHelper.accessor("image", {
        header: "Imagem",
        cell: (info) => <Image style={{width: 30, height: "auto"}} src={resolveImageUrl(`${info.getValue()}`)}/>
      }),
      columnHelper.display({
        id: "actions",
        header: "Ações",
        cell: ({row}) => (
          <>
            <Button variant="transparent" onPress={() => handleEdit(row.original)}>
              <PencilIcon size={32} />
            </Button>
            <Button variant="transparent" onPress={() => setConfirmDeleteId(row.original.id_category!)}>
              <TrashIcon size={32} />
            </Button>
          </>
        ),
      }),
    ])

    return {CategoryColumns, confirmDeleteId, setConfirmDeleteId, handleDelete};
}
