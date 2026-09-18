import { useEffect, useState } from "react";
import { fetchGameById } from "../../../services/realServices/game.service";
import type { GameResponseDTO } from "../../../@types/game/game.dto";
import Toast from "react-native-toast-message";

type UseFetchGameOptions = {
  enabled?: boolean;
};

export function useFetchGame(id_game: number, options: UseFetchGameOptions = {}){
    const { enabled = true } = options;
    const [game, setGame] = useState<GameResponseDTO>();
    const [isLoading, setIsLoading] = useState(enabled);

    useEffect(() => {
        if (!enabled) return;

        fetchGameById(id_game)
        .then(response => {
            setGame(response);
        }).catch(() =>
            Toast.show({ type: "error", text1: "Não foi possivel encontrar o jogo ou ele não existe."})
        ).finally(() =>
            setIsLoading(false)
        );
    }, [id_game]);

    return { game, isLoading }
}
