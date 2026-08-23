import { useEffect, useState } from "react";
import { AuthContext } from "../hooks/auth/useAuth";
import { setLogoutFn } from "../utils/authBridge/logout";
import type { AuthUserResponseDTO } from "../@types/auth/auth.dto";


export function AuthProvider({children}: { children: React.ReactNode }){
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<AuthUserResponseDTO | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if(savedToken && savedUser){
             // eslint-disable-next-line react-hooks/exhaustive-deps
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        setLogoutFn(logout);
    }, [])

    const login = (token: string, user: AuthUserResponseDTO) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setToken(token);
        setUser(user);
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
