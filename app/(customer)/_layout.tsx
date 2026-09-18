import { CustomDrawerContent } from "@/src/components/layout/Customer/Header/CustomDrawerContent";
import { CustomerHeader } from "@/src/components/layout/Customer/Header/CustomerHeader";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useAuth } from "@/src/hooks/auth/useAuth";
import { Drawer } from "expo-router/drawer";
import { HouseIcon, SignInIcon} from "phosphor-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function CustomerLayout() {
  const { theme, radius } = useTheme();
  const { isAuthenticated } = useAuth();

  const visibleItemStyle = { borderRadius: radius.md };
  const hiddenItemStyle = { display: "none" as const };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          header: () => <CustomerHeader />,
          drawerStyle: { backgroundColor: theme.base, width: "75%" },
          drawerActiveTintColor: theme.inverseBase,
          drawerInactiveTintColor: theme.textPrimary,
          drawerItemStyle: visibleItemStyle
        }}
      >
        {/* aponta pro GRUPO de tabs inteiro, não pra uma tela individual */}
        <Drawer.Screen name="(tabs)" options={{
            title: "Home",
            drawerIcon: ({ color, size }) => <HouseIcon size={size} color={color} />,
          }}
        />

        <Drawer.Screen name="register" options={{
            title: "Fazer Cadastro ou Login",
            drawerIcon: ({ color, size }) => <SignInIcon size={size} color={color} />,
            drawerItemStyle: isAuthenticated ? hiddenItemStyle : visibleItemStyle,
          }}
        />

        <Drawer.Screen name="(protected)" options={{ drawerItemStyle: hiddenItemStyle }} />

        <Drawer.Screen name="(protected)/checkout/success" options={{ title: "Checkout", drawerItemStyle: hiddenItemStyle }} />
        <Drawer.Screen name="(protected)/checkout/pending" options={{ title: "Checkout Pendente", drawerItemStyle: hiddenItemStyle }} />
        <Drawer.Screen name="(protected)/checkout/failure" options={{ title: "Falha de Checkout", drawerItemStyle: hiddenItemStyle }} />
        <Drawer.Screen name="(protected)/checkout" options={{ title: "Checkout", drawerItemStyle: hiddenItemStyle }} />
        <Drawer.Screen name="login" options={{ title: "Login", drawerItemStyle: hiddenItemStyle }} />
        <Drawer.Screen name="categories/[id]" options={{ title: "Categoria", drawerItemStyle: hiddenItemStyle }} />
        <Drawer.Screen name="games/[id]" options={{ title: "Jogo", drawerItemStyle: hiddenItemStyle }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
