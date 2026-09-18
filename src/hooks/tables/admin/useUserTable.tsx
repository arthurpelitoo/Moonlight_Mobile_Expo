import { UserResponseDTO } from "@/src/@types/user/user.dto";
import { Button } from "@/src/components/common/Generic/Button/Button";
import { P } from "@/src/components/common/Generic/Text";
import { deleteUser } from "@/src/services/realServices/user.service";
import { appTableFeatures } from "@/src/utils/tableFeatures";
import { formatCPF } from "@/src/utils/Validation/dataRules/User/userCpf";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "expo-router";
import { PencilIcon, TrashIcon } from "phosphor-react-native";
import { useState } from "react";
import Toast from "react-native-toast-message";

const columnHelper = createColumnHelper<typeof appTableFeatures, UserResponseDTO>();

export function useUserTable(refetch: () => void){
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
    const router = useRouter();

    const handleEdit = (row: UserResponseDTO) => {
        router.push(`/admin/users/edit/${row.id_user}`);
    }
    const handleDelete = async (id_user: number) => {
        try{
            await deleteUser(id_user);
            setConfirmDeleteId(null)
            refetch();
        } catch(err){
            const message = err instanceof Error ? err.message : "Erro inesperado.";
            Toast.show({ type: "error", text1: message })
        }
    }

    const UserColumns = columnHelper.columns([
      columnHelper.accessor("name", {
        header: "Nome",
        cell: (info) => <P>{info.getValue()}</P>
      }),
      columnHelper.accessor("email", {
        header: "E-Mail",
        cell: (info) => <P>{info.getValue()}</P>
      }),
      columnHelper.accessor("cpf", {
        header: "Cpf",
        cell: (info) => <P>{formatCPF(info.getValue())}</P>
      }),
      columnHelper.accessor("roles", {
        header: "Cargos",
        cell: (info) => <P>{info.getValue().join(", ")}</P>
      }),
      columnHelper.display({
        id: "actions",
        header: "Ações",
        cell: ({ row }) => (
          <>
            <Button variant="transparent" onPress={() => handleEdit(row.original)}>
              <PencilIcon size={32} />
            </Button>
            <Button variant="transparent" onPress={() => setConfirmDeleteId(row.original.id_user!)}>
              <TrashIcon size={32} />
            </Button>
          </>
        ),
      }),
    ])

    return {UserColumns, confirmDeleteId, setConfirmDeleteId, handleDelete};
}
