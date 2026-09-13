import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { LibraryContext } from "../hooks/library/useLibrary";
import { AuthContext } from "../hooks/auth/useAuth";
import type { OrderResponseLibraryDTO } from "../@types/order/order.dto";
import { fetchUserLibrary } from "../services/realServices/order.service";
import { AppState, AppStateStatus } from "react-native";


export function LibraryProvider({children}: { children: React.ReactNode }){
    const [isLoading, setIsLoading] = useState(true);
    const [library, setLibrary] = useState<OrderResponseLibraryDTO[]>([]);
    const {isAuthenticated} = useContext(AuthContext);
    const appState = useRef(AppState.currentState);

    const refreshLibrary = async () => {
        if(!isAuthenticated) return setIsLoading(false); //se nao logou nem faz refresh por nada

        try {
          const data = await fetchUserLibrary();
          setLibrary(data || []);
        } catch(error){
            console.error("Erro ao carregar biblioteca", error);
        } finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            refreshLibrary();
        } else {
            setLibrary([]); // Limpa a biblioteca ao deslogar
            setIsLoading(false);
        }

        const subscription = AppState.addEventListener("change", (nextState: AppStateStatus) => {
            if (appState.current.match(/inactive|background/) && nextState === "active") {
              refreshLibrary();
            }
            appState.current = nextState;
          });

          return () => subscription.remove();
    }, [isAuthenticated]);

    /**
     * Memoriza um Set contendo apenas os IDs dos jogos que o usuário possui.
     * * Por que usar Set em vez de Array?
     * - Busca em Array (.includes): O(n) - percorre o item um por um.
     * - Busca em Set (.has): O(1) - busca instantânea via hash, não importa o tamanho da biblioteca.
     * * useMemo garante que esse processamento só ocorra quando a 'library' mudar.
     */
    const ownedIdSet = useMemo(() => {
        return new Set(
            library
                .map(game => game.id_game) // Extrai apenas o ID de cada objeto da biblioteca
                .filter((id_game): id_game is number => id_game !== undefined) // Type Guard: Remove nulos/undefined e garante ao TS que o resultado é number[]
        );
    }, [library]); // Dependência: só reprocessa se a biblioteca vinda da API mudar

    const isOwned = (id_game: number) => ownedIdSet.has(id_game);


    return(
        <LibraryContext.Provider value={{ library, isOwned, isLoading, refreshLibrary }}>
            {children}
        </LibraryContext.Provider>
    );
}
