import { useEffect, useState } from "react";
import { AuthContext } from "../hooks/auth/useAuth";
import { setLogoutFn } from "../utils/authBridge/logout";
import type { AuthUserResponseDTO } from "../@types/auth/auth.dto";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export function AuthProvider({children}: { children: React.ReactNode }){
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUserResponseDTO | null>(null);

  useEffect(() => {
      (async () => {
        try {
          const [savedToken, savedUser] = await Promise.all([
            SecureStore.getItemAsync(TOKEN_KEY),
            SecureStore.getItemAsync(USER_KEY)
          ])

          if(savedToken && savedUser){
              setToken(savedToken);
              setUser(JSON.parse(savedUser));
          }

        } catch (error) {
          console.error("Erro ao carregar sessão do SecureStore:", error);
        } finally {
          setLoading(false);
        }
      })
    }, []);

    useEffect(() => {
        setLogoutFn(logout);
    }, [])

    const login = async (newToken: string, newUser: AuthUserResponseDTO) => {
        await Promise.all([
            SecureStore.setItemAsync(TOKEN_KEY, newToken),
            SecureStore.setItemAsync(USER_KEY, JSON.stringify(newUser)),
        ]);
        setToken(newToken);
        setUser(newUser);
    };

    const logout = async () => {
        await Promise.all([
            SecureStore.deleteItemAsync(TOKEN_KEY),
            SecureStore.deleteItemAsync(USER_KEY),
        ]);
        setToken(null);
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
