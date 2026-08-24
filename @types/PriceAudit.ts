export interface PriceAudit {
  id_audiprice?: number;
  id_game: number;
  price_old: number;
  price_new: number;
  altered_at?: Date;
  altered_byUser: string;
}