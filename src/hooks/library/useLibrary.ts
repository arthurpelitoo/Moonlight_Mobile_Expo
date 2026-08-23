import { createContext } from "react";
import type { OrderResponseLibraryDTO } from "../../@types/order/order.dto";

export const LibraryContext = createContext<LibraryContextData>({} as LibraryContextData);

interface LibraryContextData {
    library: OrderResponseLibraryDTO[];
    isOwned: (id_game: number) => boolean;
    isLoading: boolean;
    refreshLibrary: () => Promise<void>;
}