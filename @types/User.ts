
export interface User {
  id_user?: number;
  name: string;
  email: string;
  password: string; 
  cpf: string;
  type: "admin" | "customer";
  created_at?: Date;
}


export {}