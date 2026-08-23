import type { PaginatedQuery } from "../common/pagination"

export type CategoryPayload = {
  name: string;
  description: string;
  image?: string;
}

/***
 * Payload de Query Paginada de Categoria
 * 
 * vai usar nas tabelas de admin e carrousel de cards no site principal
 */

export interface CategoryPaginatedQueryPayload extends PaginatedQuery{
  name?: string | undefined
  random?: boolean
}