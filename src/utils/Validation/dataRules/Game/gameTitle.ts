export function isTitleValid(title: string): boolean{
    return title.trim().length > 0 && title.trim().length <= 50; //(o titulo do jogo tem que ser maior que 0 caracteres) ou (menor ou igual a 50 caracteres)
}