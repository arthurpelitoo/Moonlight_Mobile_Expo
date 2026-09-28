import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { appTableFeatures } from "@/src/utils/tableFeatures";
import { GameResponseDTO } from "@/src/@types/game/game.dto";
import { useRouter } from "expo-router";
import { deleteGame } from "@/src/services/realServices/game.service";
import Toast from "react-native-toast-message";
import { formatCurrency } from "@/src/utils/currencyFormatter/formatCurrency";
import { Image } from "react-native";
import { resolveImageUrl } from "@/src/utils/resolveImage/resolveImageUrl";
import { Button } from "@/src/components/common/Generic/Button/Button";
import { PencilIcon, TrashIcon } from "phosphor-react-native";
import { P } from "@/src/components/common/Generic/Text";

const columnHelper = createColumnHelper<typeof appTableFeatures, GameResponseDTO>();

export function useGameTable(refetch: () => void){
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
    const router = useRouter();

    const handleEdit = (row: GameResponseDTO) => {
        router.push(`/admin/games/edit/${row.id_game}`);
    }
    const handleDelete = async (id_game: number) => {
        try{
            await deleteGame(id_game);
            setConfirmDeleteId(null)
            refetch();
        } catch(err){
            const message = err instanceof Error ? err.message : "Erro inesperado.";
            Toast.show({ type: "error", text1: message })
        }
    }

    const GameColumns = columnHelper.columns([
      columnHelper.accessor("title", {
        header: "Título",
        cell: (info) => <P>{info.getValue()}</P>
      }),
      columnHelper.accessor("price", {
        header: "Preço",
        cell: (info) => <P>{formatCurrency(info.getValue())}</P>
      }),
      columnHelper.accessor("image", {
        header: "Imagem",
        cell: (info) => <Image style={{width: 200, height: 100}} resizeMode="contain" source={{ uri: resolveImageUrl(info.getValue())}}/>
      }),
      columnHelper.accessor("active", {
        header: "Ativo",
        cell: (info) => <P>{info.getValue() ? "Sim" : "Não"}</P>
      }),
      columnHelper.display({
        id: "actions",
        header: "Ações",
        cell: ({ row }) => (
          <>
            <Button variant="transparent" onPress={() => handleEdit(row.original)}>
              <PencilIcon size={32} />
            </Button>
            <Button variant="transparent" onPress={() => setConfirmDeleteId(row.original.id_game!)}>
              <TrashIcon size={32} />
            </Button>
          </>
        )
      })
    ])

    return {GameColumns, confirmDeleteId, setConfirmDeleteId, handleDelete};
}
