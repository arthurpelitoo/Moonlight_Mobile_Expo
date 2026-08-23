//cart
export interface CartItem {
  id_game: number;
  title: string;
  price: number;
  image?: string;
  categories?: string[];
}