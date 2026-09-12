// export async function fetchWithMinTime<Data>(
//     fetchFunction: () => Promise<Data>,
//     minTime: 600
// ): Promise<Data>{
//     const start = Date.now();
//     const data = await fetchFunction();
//     const gapElapsed = Date.now() - start;

//     new Promise(res => setTimeout(res, Math.max(minTime - gapElapsed, 0)));

//     return data;
// }


// O motivo de existir:
//  sem isso, o loading some tão rápido que parece um bug visual.
//  Com 600ms mínimo o usuário consegue ver o skeleton/spinner (de categorias e da tabela por exemplo.) por tempo suficiente 
//  pra não causar estranheza.

// atualmente, codigo morto que pode ser reutilizado em outro momento ou outro projeto;