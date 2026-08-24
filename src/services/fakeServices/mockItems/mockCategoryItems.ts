import type { CategoryResponseDTO } from "../../../@types/category/category.dto";

export const mockCategoryItems: CategoryResponseDTO[] = [
  {
    id_category: 1,
    name: "RPG",
    description: "Jogos de interpretação de papéis, evolução de personagens e histórias épicas.",
    // Imagem do The Witcher 3 (O rei dos RPGs)
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg"
  },
  {
    id_category: 2,
    name: "FPS",
    description: "Ação intensa e precisão em jogos de tiro em primeira pessoa.",
    // Imagem do Doom Eternal (Referência em FPS)
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/782330/header.jpg"
  },
  {
    id_category: 3,
    name: "Corrida",
    description: "Alta velocidade, simulação e arcade sobre quatro rodas.",
    // Imagem do Need for Speed Unbound
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1849540/header.jpg"
  },
  {
    id_category: 4,
    name: "Ação e Aventura",
    description: "Exploração, combate e jornadas cinematográficas inesquecíveis.",
    // Imagem do Red Dead Redemption 2
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg"
  },
  {
    id_category: 5,
    name: "Terror",
    description: "Sinta o medo com experiências imersivas de horror de sobrevivência e sustos garantidos.",
    // Resident Evil 4
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/header.jpg"
  },
  {
    id_category: 6,
    name: "Estratégia",
    description: "Planeje cada movimento, gerencie recursos e domine seus oponentes com inteligência.",
    // Civilization VI
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/289070/header.jpg"
  },
  {
    id_category: 7,
    name: "Luta",
    description: "Combates intensos um contra um, combos frenéticos e competições de alto nível.",
    // Street Fighter 6
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1364780/header.jpg"
  },
  {
    id_category: 8,
    name: "Simulação",
    description: "Experimente a vida real ou profissões inusitadas com o máximo de realismo possível.",
    // Microsoft Flight Simulator
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1250410/header.jpg"
  },
  {
    id_category: 9,
    name: "Indie",
    description: "Jogos desenvolvidos por estúdios independentes com propostas criativas e únicas.",
    // Terraria
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg"
  }
];
