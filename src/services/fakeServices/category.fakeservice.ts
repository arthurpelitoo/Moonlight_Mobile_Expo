import type { CategoryResponseDTO } from "../../@types/category/category.dto";
import type { PaginatedResponse } from "../../@types/common/pagination";
import { mockCategoryItems } from "./mockItems/mockCategoryItems";

export async function fetchCategoryMock(): Promise<CategoryResponseDTO[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCategoryItems;
}

export async function fetchPaginatedCategoryMock(page: number, limit: number): Promise<PaginatedResponse<CategoryResponseDTO>> {
  await new Promise(resolve => setTimeout(resolve, 500));
      const offset = (page - 1) * limit;
      const paginated = mockCategoryItems.slice(offset, offset + limit); // fatia o array igual o OFFSET do SQL
  
    return {
        data: paginated,
        total: mockCategoryItems.length,
        page,
        totalPages: Math.ceil(mockCategoryItems.length / limit)
    };
}

export async function fetchRandomCategoryMock(limit: number): Promise<CategoryResponseDTO[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const shuffled = [...mockCategoryItems].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
}

export async function fetchCategoryByIdMock(id: number): Promise<CategoryResponseDTO> {
  await new Promise(resolve => setTimeout(resolve, 500));

    const category = mockCategoryItems.find(cat => cat.id_category === id);

    if(!category){
      throw new Error("Categoria não encontrada");
    }

    return category;
}