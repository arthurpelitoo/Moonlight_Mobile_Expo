import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { fetchUserLibrary } from "../../../services/realServices/order.service";
import type { OrderResponseLibraryDTO } from "../../../@types/order/order.dto";

export function useFetchLibrary(){
    const [games, setGames] = useState<OrderResponseLibraryDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        // eslint-disable-next-line react-hooks/exhaustive-deps
        setIsLoading(true)
        fetchUserLibrary()
        .then(response => {
            if (isMounted) {
                setGames(response || []);
                setIsLoading(false);
            }
        }).catch(() =>
          Toast.show({ type: "error", text1: "Você não tem jogos na biblioteca ainda."})
        ).finally(() => {
            if(isMounted) setIsLoading(false)
        });
        return () => { isMounted = false; };
    }, []);

    return { games, isLoading}
}
