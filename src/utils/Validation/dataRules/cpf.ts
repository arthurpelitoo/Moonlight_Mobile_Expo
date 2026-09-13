import { cpf } from "cpf-cnpj-validator";

export function isCPFValid(cpfValue: string): boolean {
  return cpf.isValid(cpfValue);
}

export function formatCPF(value: string) {
  return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
