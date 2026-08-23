import type { PaginatedQuery } from "../common/pagination";

export type GamePayload = {
  title: string;
  description?: string;
  price: number;
  image?: string;
  banner_image?: string;
  link?: string;
  launch_date: Date | string;
  active: boolean;
  categories?: number[]
}

/***
 * Payload de Query Paginada de Jogos
 *
 * vai poder usar nas paginas de categoria, em filtro de jogos ou para a pagina principal por exemplo.
 * admin poderá usar a variavel de active pra ver os jogos desativados
 */
export interface GamePaginatedQueryPayload extends PaginatedQuery{
  title?: string | undefined,
  category?: string | undefined,
  launch_date_from?: string | undefined;  // ex: de '2024-01-01'
  launch_date_to?: string | undefined;    // ex: até '2024-12-31'
  price_min?: number | undefined;
  price_max?: number | undefined;
  random?: boolean;
  random_seed?: number;
  active?: boolean | undefined;
  admin?: boolean;
}
