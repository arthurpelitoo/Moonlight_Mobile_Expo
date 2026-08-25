import { useState } from "react";
// import type { TableColumn } from "react-data-table-component";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
// import { Button } from "../../components/common/Generic/Button/Button";
// import { PencilIcon, TrashIcon } from "@phosphor-icons/react";
import { deleteCategory } from "../../../services/realServices/category.service";
import type { CategoryResponseDTO } from "../../../@types/category/category.dto";

export function useCategoryTable(refetch: () => void){
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    // const CategoryColumns: TableColumn<CategoryResponseDTO>[] = [
    //     { name: 'Nome', selector: (row: CategoryResponseDTO) => row.name, sortable: true },
    //     { name: 'Descrição', selector: (row: CategoryResponseDTO) => row.description },
    //     { name: 'Imagem', cell: (row: CategoryResponseDTO) => (<><img className="h-30" src={`${row.image}`}/></>)},
    //     {
    //         name: 'Ações',
    //         cell: (row: CategoryResponseDTO, rowIndex: number) => (
    //         <>
    //             <Button id={`cat-edit-btn-${rowIndex}`} variant="transparent" onClick={() => handleEdit(row)}>{<PencilIcon size={32}/>}</Button>
    //             <Button id={`cat-delete-btn-${rowIndex}`} variant="transparent" onClick={() => setConfirmDeleteId(row.id_category!)}>{<TrashIcon size={32}/>}</Button>
    //         </>
    //         ),
    //     }
    // ]

    const handleEdit = (row: CategoryResponseDTO) => {
        // router.push(`/admin/categories/edit/${row.id_category}`, { state: {category: row} });
    }
    const handleDelete = async (id_category: number) => {
        try{
            await deleteCategory(id_category);
            setConfirmDeleteId(null)
            refetch();
        } catch(err){
            const message = err instanceof Error ? err.message : "Erro inesperado.";
            Toast.show({ type: "error", text1: message});
        }
    }

    // return {CategoryColumns, confirmDeleteId, setConfirmDeleteId, handleDelete};
    return {confirmDeleteId, setConfirmDeleteId, handleDelete};
}
