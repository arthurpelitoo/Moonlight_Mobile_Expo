export interface Category {
  id_category?: number;
  name: string;
  description: string;
  image?: string;
}
export {} // isso é necessário para que o arquivo seja tratado como módulo e não de escopo global puro