import { createContext, useContext } from "react";
import type { AuthUserResponseDTO } from "../../@types/auth/auth.dto";

export type AuthContextType = {
    user: AuthUserResponseDTO | null;
    token: string | null;
    login: (token: string, user: AuthUserResponseDTO) => void;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

export const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);
