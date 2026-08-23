export type AuthUserResponseDTO = {
    id_user: number,
    name: string,
    email: string,
    cpf: string,
    type: 'customer' | 'admin';
}; // autenticação no useAuth (ao fazer login, não precisa pegar password e created_at pra guardar no localstorage);