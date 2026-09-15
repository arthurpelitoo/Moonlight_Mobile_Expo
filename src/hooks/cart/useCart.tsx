import { createContext, useContext } from "react";
import type { CartItem } from "../../@types/common/cartItem";

export type CartContextType = {
  items: CartItem[];
  addItemToCart: (game: CartItem, redirect?: "cart") => Promise<void>;
  removeItemFromCart: (id: number) => Promise<void>;
  clearUpCart: () => Promise<void>
  totalPrice: number;
  isLoaded: boolean;
}

export const CartContext = createContext({} as CartContextType);

export const useCart = () => useContext(CartContext);
