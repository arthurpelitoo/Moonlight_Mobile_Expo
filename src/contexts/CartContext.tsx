    // import toast from "react-hot-toast";
    // import { useNavigate } from "react-router-dom";
    import { useContext, useState } from "react";
    import { CartContext } from "../hooks/cart/useCart";
    import { LibraryContext } from "../hooks/library/useLibrary";
import type { CartItem } from "../@types/common/cartItem";

    export function CartProvider({ children }: { children: React.ReactNode }) {
        // Fonte da verdade única
        const [items, setItems] = useState<CartItem[]>(() =>
            JSON.parse(localStorage.getItem("cart") || "[]")
        );

        const { isOwned } = useContext(LibraryContext);
        // const navigate = useNavigate();

        // Cálculo memorizado automaticamente por estar no corpo do provider
        const totalPrice = items.reduce((accumulator, item) => accumulator + Number(item.price), 0);
        // accumulator começa com o valor 0 inicialmente(aquele 0 no final) e vai iterando nele cada preço dos objetos.

        const addItemToCart = (game: CartItem, redirect?: "cart"): void => {

            // if (isOwned(game.id_game)) {
            //     toast.error("Você já possui este jogo na sua biblioteca!");
            //     return;
            // }

            const alreadyInCart = items.some(cartItem => cartItem.id_game === game.id_game);
            // if (alreadyInCart) {
            //     toast.error("Este jogo já está no seu carrinho.");
            //     return;
            // };

            const newCart = [...items, { ...game, price: Number(game.price) }];

            // Atualiza os dois ao mesmo tempo
            setItems(newCart);
            localStorage.setItem("cart", JSON.stringify(newCart));
            // toast.success("Item adicionado ao carrinho!");

            // if (redirect) navigate("/cart");
        };

        const removeItemFromCart = (id_game: number) => {
            const newCart = items.filter(cartItem => cartItem.id_game !== id_game);

            setItems(newCart);
            localStorage.setItem("cart", JSON.stringify(newCart));
            // toast.success("Item removido do carrinho!");
        };

        const clearUpCart = () => {
            setItems([]);
            localStorage.removeItem("cart");
        };

        return (
            <CartContext.Provider value={{ items, addItemToCart, removeItemFromCart, totalPrice, clearUpCart }}>
                {children}
            </CartContext.Provider>
        );
    }
