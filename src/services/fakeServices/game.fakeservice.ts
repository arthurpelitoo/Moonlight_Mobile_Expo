
import type { PaginatedResponse } from "../../@types/common/pagination";
import type { GameResponseDTO } from "../../@types/game/game.dto";
import { mockGameItems } from "./mockItems/mockGameItems";

// apenas para questão de minha burrice esquecedora, 
// offset é quantos registros o sql pula pra continuar trazendo dados diferentes.

export async function fetchGamesPaginatedMock(page: number, limit: number): Promise<PaginatedResponse<GameResponseDTO>>{
    await new Promise(resolve => setTimeout(resolve, 500));
    const offset = (page - 1) * limit;
    const paginated = mockGameItems.slice(offset, offset + limit); // fatia o array igual o OFFSET do SQL

    return {
        data: paginated,
        total: mockGameItems.length,
        page,
        totalPages: Math.ceil(mockGameItems.length / limit)
    };
}

export async function fetchGameByIdMock(id_game: number): Promise<GameResponseDTO> {
  await new Promise(resolve => setTimeout(resolve, 500));

    const game = mockGameItems.find(game => game.id_game === id_game);

    if(!game){
      throw new Error("Game não encontrado");
    }

    return game;
}

export async function fetchGamesPaginatedTableMock(page: number, limit: number): Promise<PaginatedResponse<GameResponseDTO>>{
    await new Promise(resolve => setTimeout(resolve, 500));
    const offset = (page - 1) * limit;
    const paginated = mockGameItems.slice(offset, offset + limit); // fatia o array igual o OFFSET do SQL

    return {
        data: paginated,
        total: mockGameItems.length,
        page,
        totalPages: Math.ceil(mockGameItems.length / limit)
    };
}

