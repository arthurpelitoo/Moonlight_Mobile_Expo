import { useCallback, useEffect, useState } from "react";
import { fetchGameById } from "../../../services/realServices/game.service";
import type { GameResponseDTO } from "../../../@types/game/game.dto";
import Toast from "react-native-toast-message";
import { UseFetchOptions } from "@/src/@types/common/useFetchOptions";

export function useFetchGame(id_game: number, options: UseFetchOptions = {}){
    const { enabled = true } = options;
    const [game, setGame] = useState<GameResponseDTO>();
    const [isLoading, setIsLoading] = useState(enabled);
    const [version, setVersion] = useState(0);

    useEffect(() => {
      if (!enabled) return;
      let cancelled = false;
      setIsLoading(true);
      fetchGameById(id_game)
        .then(response => { if (!cancelled) setGame(response); })
        .catch(() => { if (!cancelled) Toast.show({ type: "error", text1: "Não foi possivel encontrar o jogo ou ele não existe." }) })
        .finally(() => { if (!cancelled) setIsLoading(false) });
      return () => { cancelled = true; }
    }, [id_game, enabled, version]);

    const refetch = useCallback(() => setVersion(v => v + 1), []);

    return { game, isLoading, refetch }
}
