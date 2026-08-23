export type GameResponseDTO = {
  id_game?: number;
  title: string;
  description?: string;
  price: number;
  image?: string;
  banner_image?: string;
  link?: string;
  launch_date: Date;
  active: boolean;
  categories?: string[]
}