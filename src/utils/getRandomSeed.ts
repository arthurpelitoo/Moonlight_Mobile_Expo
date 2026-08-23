export function getRandomSeed(): number {
  const stored = sessionStorage.getItem('game_random_seed');
  if (stored) return Number(stored);
  
  const seed = Math.floor(Math.random() * 1_000_000);
  sessionStorage.setItem('game_random_seed', String(seed));
  return seed;
}

// Ao chamar a API:
// const params = {
//   page: 1,
//   limit: 10,
//   random: true,
//   random_seed: getRandomSeed(), // mesmo seed em todas as páginas
// };