# Refetch explícito via `useFocusEffect` para compensar telas que não desmontam no Expo Router

**Status:** Aceito
**Data:** 2026-09-24

## Contexto

No fluxo de admin (Jogos, e por extensão Usuários/Categorias), editar um
registro e voltar pra tabela não refletia a mudança: a tabela continuava
mostrando o dado antigo, e reabrir o formulário de edição do mesmo registro
trazia os campos desatualizados, exigindo reload manual do app pra ver o
dado certo. No web (React Router) isso nunca foi um problema, porque cada
navegação de rota tende a remontar o componente do zero.

Investigação mostrou a causa raiz: o Expo Router (React Navigation por
baixo) **não desmonta telas ao navegar de volta** — elas ficam vivas na
pilha de navegação, só perdendo o foco. Qualquer fetch amarrado só a
`useEffect` na montagem (dependente de `id_game`, que não muda entre duas
edições do mesmo registro) nunca dispara de novo, porque a tela nunca
remonta pra disparar esse efeito outra vez.

## Decisão

Adotar `useFocusEffect` (React Navigation, reexportado pelo Expo Router)
como gatilho explícito de refetch em toda tela que exibe dado que pode ter
mudado desde a última vez que foi vista — tabelas administrativas e
formulários de edição — em vez de depender só de `useEffect` na montagem.

Padrão aplicado, em três pontas por entidade (jogo, usuário, categoria):

1. **Hook de fetch individual** (`useFetchGame`, e equivalentes) expõe um
   `refetch` memoizado com `useCallback`, não só uma busca amarrada à
   montagem.
2. **Formulário de edição** (`GameForm`, e equivalentes) chama
   `refetchGame()` dentro de um `useFocusEffect` toda vez que a tela ganha
   foco, e sincroniza os campos do formulário (`resetForm()`) num
   `useEffect` separado, reagindo à chegada do dado novo (`[getInitialData]`) — não
   ao evento de foco em si. Essa separação existe porque um único efeito
   misturando "buscar" e "preencher formulário" causava corrida entre a
   requisição de rede (assíncrona) e o preenchimento dos campos
   (síncrono).
3. **Tabela administrativa** (`GameDataTable`, e equivalentes) chama
   `refetch()` da lista dentro do próprio `useFocusEffect`, sem
   depender de nenhum evento de submit do formulário pra saber que precisa
   reler os dados.

## Alternativas consideradas

- **Forçar desmontagem da tela a cada navegação** (ex: usar `key` dinâmica
  na rota, ou trocar `Stack` por uma abordagem que remonta). Descartado:
  contraria o próprio propósito de performance do React Navigation
  (reaproveitar telas montadas), e resolveria o sintoma trocando-o por
  perda de qualquer estado local que devesse persistir entre navegações
  (ex: posição de scroll, filtros abertos).
- **Lib de data-fetching com cache/invalidação automática** (React Query/
  TanStack Query), que resolveria isso de forma mais robusta e com menos
  código manual por hook. Descartado por escopo/tempo — trocar a estratégia
  de fetch de todo o projeto no fim do semestre era risco maior do que o
  ganho, com o prazo de apresentação já em cima. Fica registrado como
  candidato real de melhoria futura.

## Consequências

- Resolve o bug de dado desatualizado sem re-arquitetar a navegação nem
  introduzir uma lib nova sob prazo apertado.
- Introduz um padrão repetitivo: toda entidade nova (jogo, usuário,
  categoria, e futuras como `studio`) precisa desse mesmo trio de efeitos
  (fetch com `refetch` estável, `useFocusEffect` de busca, `useEffect` de
  sincronização) — não existe abstração compartilhada ainda; cada hook de
  fetch reimplementa o padrão manualmente.
- Depende de disciplina com arrays de dependência (`useCallback`) —
  esquecer de memoizar `refetch` corretamente reintroduz o mesmo bug de
  forma silenciosa, já que o React Navigation dispara o listener de foco
  independente da referência da função, mascarando o problema até um caso
  de borda expor a closure obsoleta.
- Dívida técnica assumida conscientemente: a substituição por uma lib de
  cache/invalidação automática (candidata: TanStack Query) fica como
  trabalho futuro, fora do escopo deste semestre.
