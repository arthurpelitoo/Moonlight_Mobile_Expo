export type OrderPayload = {
  id_user: number;
  order_date: Date;
  total: number;
  preference_id: string;
  external_reference: string;
  status: 'pending' | 'approved' | 'canceled';
}