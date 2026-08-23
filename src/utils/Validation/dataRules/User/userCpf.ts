import { cpf } from "cpf-cnpj-validator";

export function isCPFValid(cpfValue: string): boolean {
  return cpf.isValid(cpfValue);
}

/**
 * Formata uma string para o padrão de CPF (000.000.000-00)
 * utilizando substituições por expressões regulares.
 */
export function formatCPF(value: string) {
  return value
    // Remove tudo o que não for número (evita letras e símbolos)
    .replace(/\D/g, "") 
    
    // Coloca um ponto após os primeiros 3 dígitos
    .replace(/(\d{3})(\d)/, "$1.$2") 
    
    // Coloca um ponto após os próximos 3 dígitos (segundo bloco)
    .replace(/(\d{3})(\d)/, "$1.$2") 
    
    // Coloca um hífen antes dos últimos 2 dígitos
    // O $ garante que a regra se aplique ao final da string
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}