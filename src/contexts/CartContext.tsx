import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { CartItem } from "@/src/@types/common/cartItem";
import { CartContext } from "@/src/hooks/cart/useCart";
import { LibraryContext } from "@/src/hooks/library/useLibrary";

export function CartProvider({ children }: { children: React.ReactNode }) {
    // Fonte da verdade única
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      async function loadCart() {
        const stored = await AsyncStorage.getItem("cart");
        setItems(stored ? JSON.parse(stored) : []);
        setIsLoaded(true);
      }
      loadCart();
    }, []);

    const { isOwned } = useContext(LibraryContext);

    const router = useRouter();

    // Cálculo memorizado automaticamente por estar no corpo do provider
    const totalPrice = items.reduce((accumulator, item) => accumulator + Number(item.price), 0);
    // accumulator começa com o valor 0 inicialmente(aquele 0 no final) e vai iterando nele cada preço dos objetos.

    const addItemToCart = async (game: CartItem, redirect?: "cart"): Promise<void> => {
      if (isOwned(game.id_game)) {
          Toast.show({ type: "error", text1: "Você já possui este jogo na sua biblioteca!" })
          return;
      }

      const alreadyInCart = items.some(cartItem => cartItem.id_game === game.id_game);
      if (alreadyInCart) {
          Toast.show({ type: "error", text1: "Este jogo já está no seu carrinho." })
          return;
      };

      const newCart = [...items, { ...game, price: Number(game.price) }];

      // Atualiza os dois ao mesmo tempo
      setItems(newCart);
      await AsyncStorage.setItem("cart", JSON.stringify(newCart));
      Toast.show({ type: "success", text1: "Item adicionado ao carrinho!" })
      // if (redirect) router.push("/cart");
    };

    const removeItemFromCart = async (id_game: number): Promise<void> => {
      const newCart = items.filter(cartItem => cartItem.id_game !== id_game);

      setItems(newCart);
      await AsyncStorage.setItem("cart", JSON.stringify(newCart));
      Toast.show({ type: "success", text1: "Item removido do carrinho!" })
    };

    const clearUpCart = async (): Promise<void> => {
      setItems([]);
      await AsyncStorage.removeItem("cart");
    };

    return (
        <CartContext.Provider value={{ items, addItemToCart, removeItemFromCart, totalPrice, clearUpCart, isLoaded }}>
            {children}
        </CartContext.Provider>
    );
}
