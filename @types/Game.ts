import type { Category } from "./Category";

export interface Game {
  id_game?: number;
  title: string;
  description?: string;
  price: number;
  image?: string;
  link?: string;
  launch_date: Date;
  active: boolean;
  stock_available: number;
}

export {} // isso é necessário para que o arquivo seja tratado como módulo e não de escopo global puro

// extendemos game para incluir as categorias (caso N para N)
export interface GameWithCategories extends Game {
  categories: Category[];
}