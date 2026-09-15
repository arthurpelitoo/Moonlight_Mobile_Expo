# Separação entre rotas (app/) e implementação de telas (src/screens/) no mobile

**Status:** Aceito
**Data:** 2026-09-10

## Contexto
O Expo Router usa roteamento file-based: todo arquivo `.tsx` dentro de
`app/` vira uma rota navegável automaticamente. O frontend web, por
outro lado, usa `react-router` com roteamento declarativo
(`AppRoutesCustomer.tsx`/`AppRoutesAdmin.tsx`), o que permite manter
`pages/Customer/Home/sections/` como pasta comum, sem risco de um
componente auxiliar virar rota por engano. Replicar a mesma estrutura
de pastas do web direto dentro de `app/` faria cada arquivo de
`sections/` (ex: `HeroSection.tsx`, `AllGamesList.tsx`) virar uma tela
navegável indevidamente.

## Decisão
Manter `app/` só com arquivos finos de rota, que apenas reexportam a
implementação real:

```tsx
// app/(customer)/home.tsx
export { default } from "@/src/screens/Customer/Home/HomeScreen";
```

A implementação de cada tela (equivalente ao `MainPage.tsx` do web) e
suas `sections/` ficam em `src/screens/`, espelhando a hierarquia de
`pages/Customer/...` do web, fora do escopo de roteamento do Expo
Router.

## Alternativas consideradas
- Prefixar pastas com `_` dentro de `app/` (ex: `home/_sections/`),
  convenção que o Expo Router reconhece como "ignorar para fins de
  rota" (herdada do Next.js): descartada — mantém a implementação
  dentro do diretório de rotas, criando dois padrões de pasta
  convivendo (rota normal vs. rota com `_`), e quebra o espelhamento
  1:1 com a estrutura já usada em `pages/` no web.

## Consequências
- `app/` passa a funcionar como um mapa de rotas só de nomes,
  papel equivalente ao que `AppRoutesCustomer.tsx`/`AppRoutesAdmin.tsx`
  cumprem no web, só que expresso via estrutura de pasta em vez de
  JSX de `<Route>`.
- Toda nova tela precisa de dois arquivos (rota fina em `app/` +
  implementação em `src/screens/`), pequeno custo de indireção em
  troca de manter paridade estrutural com o web e evitar rotas
  acidentais.
- Nenhuma mudança de schema/backend — decisão isolada de organização
  de frontend mobile.
