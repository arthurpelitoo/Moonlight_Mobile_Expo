import type { Category } from "./Category";
import type { Game } from "./Game";
import type { Order } from "./Order";
import type { User } from "./User";

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    totalPages: number;
}

//auth
export type AuthUser = Omit<User, "password" | "created_at">; // autenticação no useAuth (ao fazer login, não precisa pegar password e created_at pra guardar);

//user
export type CreateUserPayload = Omit<User, 'id_user' | 'created_at'>;
export type CreateUserResponse = {message: string};

export type UpdateUserPayload = Omit<User, 'id_user' | 'created_at'>;
export type UpdateUserResponse = {message: string};

export type DeleteUserPayload = Pick<User, 'id_user'>;
export type DeleteUserResponse = {message: string};

export type UpdateMePayload = Omit<User, 'id_user' | 'email' | 'type' | 'created_at'>;
export type UpdateMeResponse = { message: string; user: AuthUser }

//game
export type CreateGamePayload = Omit<Game, 'id_game'>;
export type CreateGameResponse = {message: string};

export type UpdateGamePayload = Game;
export type UpdateGameResponse = {message: string};

export type DeleteGamePayload = Pick<Game, 'id_game'>;
export type DeleteGameResponse = {message: string};

//category
export type CreateCategoryPayload = Omit<Category, 'id_category'>;

//order
export type CreateOrderPayload = Omit<Order, 'id_order'>;


// Resposta genérica do backend (message: '...')
export interface ApiMessage {
  message: string;
}