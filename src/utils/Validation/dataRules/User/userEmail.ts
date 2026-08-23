/**
 * Valida se uma string segue o formato básico de e-mail.
 * Formato esperado: texto@texto.texto
 */

export function isEmailValid(email: string): boolean {
    // ^         : Início da string
    // [^\s@]+   : Um ou mais caracteres que NÃO sejam espaço ou '@'
    // @         : Caractere '@' obrigatório
    // [^\s@]+   : Um ou mais caracteres (domínio) que NÃO sejam espaço ou '@'
    // \.        : Um ponto real (escapado com contra-barra)
    // [^\s@]+   : Um ou mais caracteres (extensão como .com, .br, etc)
    // $         : Fim da string
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return regex.test(email);
}