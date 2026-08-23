import type { ValidationRule } from "../ValidationRule";

export const passwordRules: ValidationRule[] = [
    { label: "Mínimo 8 caracteres", test: (password) => password.length >= 8},
    { label: "Máximo de 16 caracteres", test: (password) => password.length <= 16 && password.length != 0},
    { label: "Letra maiúscula", test: (password) => /[A-Z]/.test(password) },
    { label: "Letra minúscula", test: (password) => /[a-z]/.test(password) },
    { label: "Número", test: (password) => /\d/.test(password) }
];
 
export function getPasswordVerifiedLevel(password: string): number {
    return passwordRules.filter((rule) => rule.test(password)).length; // nivel devolve do 0 até 5.
}
