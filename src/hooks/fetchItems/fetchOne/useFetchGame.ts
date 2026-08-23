// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { fetchGameById } from "../../../services/realServices/game.service";
// import type { GameResponseDTO } from "../../../@types/game/game.dto";

// export function useFetchGame(id_game: number){
//     const [game, setGame] = useState<GameResponseDTO>();
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         fetchGameById(id_game)
//         .then(response => {
//             setGame(response);
//         }).catch(() =>
//             toast.error("Não foi possivel encontrar o jogo ou ele não existe.")
//         ).finally(() =>
//             setIsLoading(false)
//         );
//     }, [id_game]);

//     return { game, isLoading }
// }
