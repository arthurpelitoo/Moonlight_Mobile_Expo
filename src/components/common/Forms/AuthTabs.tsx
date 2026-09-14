
import { useRouter } from "expo-router";
import { Button } from "../";
import { View } from "react-native";

export function AuthTabs() {
    const router = useRouter();
    const navigate = useNavigate();

    return(
        <View>
            <Button
                onPress={() => (router.push("/home"))}
                variant="primary"
                className={`flex-1 pb-3 pt-3 text-xs tracking-widest uppercase transition-all duration-300
                    ${pathname === "/login" ? "text-white border-b border-white -mb-px" : "text-white/30 hover:text-white/60 mb-0"}`}
            >
                Entrar
            </Button>
            <Button
                onPress={() => (router.push("/home"))}
                variant="primary"
                className={`flex-1 pb-3 pt-3 text-xs tracking-widest uppercase transition-all duration-300
                    ${pathname === "/register" ? "text-white border-b border-white -mb-px" : "text-white/30 hover:text-white/60 mb-0"}`}
            >
                Criar conta
            </Button>
        </View>
    )
}
