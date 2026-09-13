import { useContext } from "react";
import { GameCard } from "../GameCard/GameCard";
import { useCart } from "@/src/hooks/cart/useCart";
import { LibraryContext } from "@/src/hooks/library/useLibrary";
import { GameResponseDTO } from "@/src/@types/game/game.dto";
import { FlatList, View } from "react-native";
import { H3 } from "../Text";

type GameListProps = {
  games: GameResponseDTO[]
}

export function GameList(props: GameListProps) {
  const { addItemToCart, removeItemFromCart, items } = useCart();
  const { isOwned } = useContext(LibraryContext);

  if (props.games.length == 0) {
    return <H3>Nenhum jogo encontrado.</H3>
  }

  return (
    <FlatList
      data={props.games}
      numColumns={2}
      columnWrapperStyle={{ gap: 16 }}
      contentContainerStyle={{ gap: 16 }}
      keyExtractor={(game) => String(game.id_game)}
      scrollEnabled={false}
      renderItem={({ item }) => {
        const alreadyInCart = items.some((cartItem) => cartItem.id_game === item.id_game);
        const cartItem = {
          id_game: item.id_game!,
          title: item.title,
          price: item.price,
          image: item.image,
          categories: item.categories,
        };

        return (
          <View style={{ flex: 1 }}>
            <GameCard
              game={item}
              onCart={() =>
                alreadyInCart ? removeItemFromCart(item.id_game!) : addItemToCart(cartItem)
              }
              onBuy={() => addItemToCart(cartItem, "cart")}
              gamePage={{ pathname: "/games/[id]", params: { id: String(item.id_game) } }}
              isAlreadyInCart={alreadyInCart}
              isOwned={isOwned(item.id_game!)}
            />
          </View>
        );
      }}
    />
  );
}
