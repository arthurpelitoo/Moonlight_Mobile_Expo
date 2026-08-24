export interface GameKey {
  id_key?: number;
  id_game: number;
  activation_key: string;
  status: 'available' | 'reserved' | 'sold' | 'out_of_stock';
  created_at?: Date;
}
