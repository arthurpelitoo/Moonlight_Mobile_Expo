export function isPriceValid(price: string): boolean {
    const value = parseFloat(price);
    // O preço é válido se for um número real e não for negativo
    return !isNaN(value) && value >= 0;
}

export const maskPrice = (value: string) => {
    // Extrai só dígitos — "0.10" vira "010", "49.90" vira "4990"
    const onlyNumbers = value.replace(/\D/g, "");

    // Remove zeros à esquerda antes de calcular
    //    "010" → "10", "001" → "1", "000" → "0"
    const stripped = onlyNumbers.replace(/^0+/, "") || "0";

    // Se ficou só "0" (campo zerado ou vazio), retorna "0.00"
    if (stripped === "0") return "0.00";

    // Desloca como calculadora: "10" → 0.10, "4990" → 49.90
    const numberValue = Number(stripped) / 100;

    return numberValue.toFixed(2);
};

export const maskPriceFilter = (value: string): string => {
  const onlyNumbers = value.replace(/\D/g, "");
  const stripped = onlyNumbers.replace(/^0+/, "") || "0";

  if (stripped === "0") return ""; // ← única diferença: vazio em vez de "0.00"

  return (Number(stripped) / 100).toFixed(2);
};
