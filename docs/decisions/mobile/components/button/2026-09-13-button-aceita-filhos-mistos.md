# Adendo: Button aceita filhos mistos (ícone + texto em qualquer ordem)

**Status:** Aceito
**Data:** 2026-09-13
**Relacionado a:** ADR original "Button do mobile não replica o polimorfismo (as='a'/'link'/'button') do web"

## Contexto
A implementação original decidia como renderizar `children` checando o
*pacote inteiro* (`typeof children === "string" ? <Text> : children`).
Isso funcionava para um botão só-texto ou só-ícone (via prop `icon`
separada), mas não suportava o padrão comum do web de misturar ícone e
texto como filhos diretos, na ordem desejada pelo autor
(`<ShoppingCartIcon /> Ver jogos` ou `Remover <TrashIcon />`) — a
checagem via `typeof` via `children` como uma unidade só, não elemento
por elemento.

## Decisão
Trocar a checagem de "children inteiro é string?" por
`React.Children.map`, avaliando cada filho individualmente: strings e
números são embrulhados em `<Text>`; qualquer outro tipo (ícones, JSX
arbitrário) passa direto. O container ganhou `flexDirection: "row"` e
`gap` para que múltiplos filhos fiquem lado a lado, na ordem em que
foram declarados, em vez de empilhados verticalmente.

A prop `icon` (do design original) foi mantida por compatibilidade —
código já escrito com `icon={<X />}` continua funcionando sem
alteração — mas deixa de ser a via recomendada: novo código deve
preferir children mistos diretos, que dão controle de ordem que `icon`
(sempre fixo antes do texto) não oferecia.

## Alternativas consideradas
- Manter `icon` como única via e adicionar uma segunda prop
  `iconPosition: "before" | "after"`: descartado — mais complexo de
  usar do que simplesmente escrever os filhos na ordem desejada, que é
  como o autor já pensava naturalmente ao escrever o JSX.

## Consequências
- Button agora aceita qualquer combinação de filhos (texto sozinho,
  ícone sozinho, ou os dois em qualquer ordem) sem prop extra.
- `icon` continua funcionando para código legado, mas é considerada
  redundante para código novo.
- Nenhuma mudança de assinatura quebra chamadas existentes — só a
  lógica interna de renderização mudou.
