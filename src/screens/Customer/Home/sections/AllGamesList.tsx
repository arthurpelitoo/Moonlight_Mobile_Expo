import { useMemo } from "react";
import { Button } from "../../../../components/common/Generic/Button/Button";
import { useFetchPaginatedGames } from "../../../../hooks/fetchItems/store/useFetchPaginatedGames";
import { getRandomSeed } from "../../../../utils/getRandomSeed";
import type { GamePaginatedQueryPayload } from "../../../../@types/game/game.payload";
import { Spinner } from "../../../../components/common/Generic/Spinner";
import { GameList } from "../../../../components/common/Generic/GameList/GameList";
import { useCart } from "@/src/hooks/cart/useCart";
import { Animated, View } from "react-native";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useFadeIn } from "@/src/hooks/animation/useFadeIn";
import { H1, P } from "@/src/components/common/Generic/Text";

export function AllGamesList() {
    const { theme } = useTheme()
    const fadeIn = useFadeIn(600, true);

    const query: GamePaginatedQueryPayload = useMemo(() => ({
        page: 1,
        limit: 8,
        random: true,
        random_seed: getRandomSeed(),
        title: undefined,
        category: undefined,
        launch_date_from: undefined,
        launch_date_to: undefined,
        price_min: undefined,
        price_max: undefined
    }), [])

    const {games, hasMore, loadMore, isLoading: queryIsLoading} = useFetchPaginatedGames(query);
    const { isLoaded: cartIsLoaded } = useCart();

    let conteudo;
    if (queryIsLoading && games.length === 0 || !cartIsLoaded) {
      conteudo = <Spinner />;
    } else if (games.length === 0) {
      conteudo = <P>Nenhum jogo encontrado.</P>
    } else {
      conteudo = <GameList games={games}/>
    }

    return(
        <View style={{ paddingTop: 32, width: "100%", backgroundColor: theme.baseSoft}}>
            <Animated.View style={{ justifyContent: "center", width: "100%", padding: 24, opacity: fadeIn.opacity, transform: fadeIn.transform}}>
                <View style={{marginBottom: 20}}>
                    <H1>Todos os Jogos disponiveis no catálogo:</H1>
                </View>
                {conteudo}
                <View style={{padding: 32, width: "100%"}}>
                    {hasMore && games.length > 0 &&(
                        <Button variant="cta" style={{padding: 16, justifyContent: "center"}} onPress={loadMore}>
                          Ver mais
                        </Button>
                    )}
                </View>
            </Animated.View>
        </View>
    )
}
