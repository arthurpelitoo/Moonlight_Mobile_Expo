# Button do mobile não replica o polimorfismo (as="a"/"link"/"button") do web

**Status:** Aceito
**Data:** 2026-09-10

## Contexto
O Button do web é polimórfico (`as="button"|"a"|"link"`) porque o DOM
distingue elementos clicáveis por tag semântica (`<button>` para ações,
`<a>`/`<Link>` para navegação), e o roteamento web historicamente
depende de interceptar cliques em `<a>`. O React Native não tem
elemento de navegação nativo — não existe `<a>` — e o Expo Router
resolve navegação por composição via `<Link href={...} asChild>`
envolvendo qualquer componente clicável, não por uma prop do próprio
botão.

## Decisão
O Button do mobile não recebe prop `as`/`href`. Ele só resolve
estilo (`variant`) e dispara `onPress`. Quando um botão precisa
navegar, o `Link` do `expo-router` o envolve no local de uso:
`<Link href="..." asChild><Button variant="cta">...</Button></Link>`.

O mapa de variantes de cor (`variantStyle`) é uma função declarada
dentro do componente, não um objeto estático fora dele como no web
— porque a cor de cada variante depende do `theme` ativo (JS puro),
enquanto no web a troca de tema é resolvida por CSS custom
properties sem o componente React precisar saber que mudou.

## Alternativas consideradas
- Replicar `as="button"|"a"|"link"` no Button do mobile, com um
  branch que retorna `<Link>` por dentro: descartado — adicionaria
  complexidade sem necessidade real, já que a composição via
  `asChild` já resolve o mesmo problema de forma mais alinhada ao
  padrão do Expo Router.
- Manter `variantStyle` como objeto estático fora do componente,
  igual ao web: descartado — exigiria o objeto ser recriado/importado
  com acesso a um `theme` fora de contexto React, perdendo a reatividade
  automática à troca de tema que `useTheme()` dá.

## Consequências
- Button do mobile fica mais simples que o do web (menos
  responsabilidade), com a navegação sendo responsabilidade de quem
  usa o componente, não dele mesmo.
- Toda vez que um botão precisar navegar, o local de uso precisa
  lembrar de envolver com `<Link asChild>` — pequeno custo de
  verbosidade em troca de manter o componente livre de acoplamento
  com roteamento.
