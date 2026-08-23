export interface OrderResponseDTO {
  id_order: number;
  order_date: Date;
  total: number;
  status: "approved" | "pending" | "canceled";
  games: {
      title: string;
      image: string;
      price: number;
  }[];
}

export type OrderResponseLibraryDTO = {
  title: string,
  price: number,
  launch_date: Date,
  active: boolean,
  id_game: number,
  description?: string | undefined,
  image?: string | undefined,
  banner_image?: string | undefined,
  link?: string | undefined,
  categories: string[];
}