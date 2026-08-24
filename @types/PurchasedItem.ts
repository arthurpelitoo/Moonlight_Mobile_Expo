export interface PurchasedItem {
  id_order: number;
  id_game: number;
  id_key: number;
  price: number;
  created_at?: Date;
}