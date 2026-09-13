import { Button } from "@/src/components/common/Generic/Button/Button";
import { Collapse } from "@/src/components/common/Generic/Collapse";
import { Spinner } from "@/src/components/common/Generic/Spinner";
import { H1, H2, P } from "@/src/components/common/Generic/Text";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useGlow } from "@/src/hooks/animation/useGlow";
import { useCart } from "@/src/hooks/cart/useCart";
import { useFetchGame } from "@/src/hooks/fetchItems/fetchOne/useFetchGame";
import { LibraryContext } from "@/src/hooks/library/useLibrary";
import { formatCurrency } from "@/src/utils/currencyFormatter/formatCurrency";
import { resolveImageUrl } from "@/src/utils/resolveImage/resolveImageUrl";
import { useRouter } from "expo-router";
import { ShoppingCartIcon } from "phosphor-react-native";
import { useContext, useEffect } from "react";
import { Animated, Image, Linking, View } from "react-native";

type GameDetailProps = {
    id_game: number;
}

export function GameDetail({id_game} : GameDetailProps){
    const router = useRouter();
    const glowOpacity = useGlow();
    const {theme, space, fontSize, radius} = useTheme();
    const {game, isLoading} = useFetchGame(id_game);
    const {addItemToCart, removeItemFromCart, items} = useCart();
    const alreadyInCart = items.some(cartItem => cartItem.id_game === id_game);
    const { isOwned } = useContext(LibraryContext);

    useEffect(() => {
      if (!isLoading && !game) {
        router.replace("/home");
      }
    }, [isLoading, game]);

    if (isLoading) {
        return (
            <View className="w-full h-screen bg-gradient-to-b from-base-soft via-base-soft to-base flex items-center justify-center">
                <Spinner />
            </View>
        );
    }

    if (!game) return null;

    const cartItem = { id_game: game.id_game!, title: game.title, price: game.price, image: game.image, categories: game.categories}

    return(
        <View style={{ gap: space[7], paddingHorizontal: space[5], paddingTop: space[6], position: "relative", width: "100%", overflow: "hidden"}}>
          <H1 style={{textAlign: "center"}}>{game.title}</H1>

          <Image source={{ uri: resolveImageUrl(game.banner_image) }} resizeMode="contain" style={{ width: "100%", height: 220, borderRadius: radius.lg}}/>

          <View style={{ alignItems: "center", gap: space[3]}}>
            {!isOwned(id_game) && (
              <P>
                {game.price === 0 ? "Grátis" : formatCurrency(game.price)}
              </P>
            )}
            {isOwned(game.id_game!) ? (
              <Button variant="cta" style={{ width: "100%"}} onPress={() => game.link && Linking.openURL(game.link)}>
                Baixar Jogo
              </Button>
            ) : (
              <>
                <View style={{alignSelf: "center"}}>
                  <Animated.View
                    style={{
                      position: "absolute",
                      inset: -2,
                      borderRadius: radius.md,
                      backgroundColor: theme.blueCta,
                      opacity: glowOpacity,
                      marginBottom: space[2]
                    }}
                  />
                    <Button
                      variant="cta"
                      style={{ padding: space[2], marginBottom: space[2] }}
                      onPress={() => addItemToCart(cartItem, "cart")}
                    >
                      {game.price === 0 ? "Adicionar à Biblioteca" : "Comprar Agora"}
                    </Button>
                </View>

                <Button
                  variant={alreadyInCart ? "danger" : "primary"}
                  icon={<ShoppingCartIcon size={18} color={theme.textPrimary} />}
                  style={{ padding: space[2], marginBottom: space[2], alignSelf: "center", flexDirection: "row", gap: space[2] }}
                  onPress={() =>
                    alreadyInCart ? removeItemFromCart(game.id_game!) : addItemToCart(cartItem)
                  }
                >
                  {alreadyInCart ? "Remover do carrinho" : "Adicionar ao Carrinho"}
                </Button>
              </>
            )}

            <P>{game.categories!.join(", ")}</P>
          </View>

          <Collapse label="Ver descrição do jogo aqui">
            <View style={{ gap: space[4], padding: space[3], alignItems: "center" }}>
              <P>{game.description}</P>
              <H2>Categorias:</H2>
              <P>{game.categories!.join(", ")}</P>
            </View>
          </Collapse>
        </View>
    )
}
