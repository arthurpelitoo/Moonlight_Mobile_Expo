// import { useState } from "react";
// import type { TableColumn } from "react-data-table-component";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { formatCurrency } from "../../utils/currencyFormatter/formatCurrency";
// import { Button } from "../../components/common/Generic/Button/Button";
// import { PencilIcon, TrashIcon } from "@phosphor-icons/react";
// import { deleteGame } from "../../services/realServices/game.service";
// import type { GameResponseDTO } from "../../@types/game/game.dto";

// export function useGameTable(refetch: () => void){
//     const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
//     const navigate = useNavigate();

//     const GameColumns: TableColumn<GameResponseDTO>[] = [
//         { name: 'Titulo', selector: (row: GameResponseDTO) => row.title, sortable: true },
//         { name: 'Preço', selector: (row: GameResponseDTO) => formatCurrency(row.price) },
//         { name: 'Imagem', cell: (row: GameResponseDTO) => (<><img className="h-30" src={`${row.image}`}/></>)},
//         { name: 'Ativo', selector: (row: GameResponseDTO) => (row.active ? "Sim" : "Não") },
//         {
//             name: 'Ações',
//             cell: (row: GameResponseDTO, rowIndex: number) => (
//             <>
//                 <Button id={`game-edit-btn-${rowIndex}`} variant="transparent" onClick={() => handleEdit(row)}>{<PencilIcon size={32}/>}</Button>
//                 <Button id={`game-delete-btn-${rowIndex}`} variant="transparent" onClick={() => setConfirmDeleteId(row.id_game!)}>{<TrashIcon size={32}/>}</Button>
//             </>
//             ),
//         }
//     ]

//     const handleEdit = (row: GameResponseDTO) => {
//         navigate(`/admin/games/edit/${row.id_game}`, { state: {game: row} });
//     }
//     const handleDelete = async (id_game: number) => {
//         try{
//             await deleteGame(id_game);
//             setConfirmDeleteId(null)
//             refetch();
//         } catch(err){
//             const message = err instanceof Error ? err.message : "Erro inesperado.";
//             toast.error(message);
//         }
//     }

//     return {GameColumns, confirmDeleteId, setConfirmDeleteId, handleDelete};
// }
