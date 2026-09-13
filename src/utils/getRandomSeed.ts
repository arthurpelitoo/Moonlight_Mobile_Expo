let cachedSeed: number | null = null;

export function getRandomSeed(): number {
  if (cachedSeed !== null) return cachedSeed;

  cachedSeed = Math.floor(Math.random() * 1_000_000);
  return cachedSeed;
}

// Ao chamar a API:
// const params = {
//   page: 1,
//   limit: 10,
//   random: true,
//   random_seed: getRandomSeed(), // mesmo seed em todas as páginas
// };
