import type { CartItem } from "../common/cartItem";

export interface CheckoutQueryPayload{
  items: CartItem[];
  total: number;
  user: {
    id_user: number,
    name: string
  }
}
