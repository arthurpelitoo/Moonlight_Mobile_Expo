// import type { TableColumn } from "react-data-table-component";
// import { PencilIcon, TrashIcon } from "@phosphor-icons/react";
// import { Button } from "../../components/common/Generic/Button/Button";
import { useState } from "react";
import { deleteUser } from "../../../services/realServices/user.service";
import { router } from "expo-router";
import { formatCPF } from "../../../utils/Validation/dataRules/User/userCpf";
import Toast from "react-native-toast-message";
import type { UserResponseDTO } from "../../../@types/user/user.dto";

export function useUserTable(refetch: () => void){
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);


    // const UserColumns: TableColumn<UserResponseDTO>[] = [
    //     { name: 'Nome', selector: (row: UserResponseDTO) => row.name, sortable: true },
    //     { name: 'Email', selector: (row: UserResponseDTO) => row.email },
    //     { name: 'Cpf', selector: (row: UserResponseDTO) => formatCPF(row.cpf) },
    //     {
    //         name: 'Tipo',
    //         selector: (row: UserResponseDTO) => (
    //             row.type === "customer" ? 'Cliente': row.type === "admin" ? 'Admin' : ''
    //         )
    //     },
    //     {
    //         name: 'Ações',
    //         cell: (row: UserResponseDTO, rowIndex: number) => (
    //         <>
    //             <Button id={`user-edit-btn-${rowIndex}`} variant="transparent" onClick={() => handleEdit(row)}>{<PencilIcon size={32}/>}</Button>
    //             <Button id={`user-delete-btn-${rowIndex}`} variant="transparent" onClick={() => setConfirmDeleteId(row.id_user!)}>{<TrashIcon size={32}/>}</Button>
    //         </>
    //         ),
    //     }
    // ]

    const handleEdit = (row: UserResponseDTO) => {
        // router.push(`/admin/users/edit/${row.id_user}`, { state: {user: row} });
    }
    const handleDelete = async (id_user: number) => {
        try{
            await deleteUser(id_user);
            setConfirmDeleteId(null)
            refetch();
        } catch(err){
            const message = err instanceof Error ? err.message : "Erro inesperado.";
          Toast.show({ type: "error", text1: message});
        }
    }

    // return {UserColumns, confirmDeleteId, setConfirmDeleteId, handleDelete};
    return {confirmDeleteId, setConfirmDeleteId, handleDelete};
}
