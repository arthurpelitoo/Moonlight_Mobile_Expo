import { CustomDrawerContent } from "@/src/components/layout/Customer/Header/CustomDrawerContent";
import { CustomerHeader } from "@/src/components/layout/Customer/Header/CustomerHeader";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useAuth } from "@/src/hooks/auth/useAuth";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Drawer } from "expo-router/drawer";
import { BooksIcon, HouseIcon, ReceiptIcon, SignInIcon, UserIcon } from "phosphor-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function CustomerLayout() {
  const { theme, radius } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          header: () => <CustomerHeader />,
          drawerStyle: { backgroundColor: theme.base, width: "75%" },
          drawerActiveTintColor: theme.inverseBase,
          drawerInactiveTintColor: theme.textPrimary,
          drawerItemStyle: {
            borderRadius: radius.md,
          },
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
            drawerItemStyle: isAuthenticated
              ? { display: "none" }
              : { borderRadius: radius.md },
          }}
        />

        <Drawer.Screen name="profile" options={{
            title: "Perfil",
            drawerIcon: ({ color, size }) => <UserIcon size={size} color={color} />,
            drawerItemStyle: isAuthenticated
              ? { borderRadius: radius.md }
              : { display: "none" },
          }}
        />

        <Drawer.Screen name="library" options={{
            title: "Biblioteca",
            drawerIcon: ({ color, size }) => <BooksIcon size={size} color={color} />,
            drawerItemStyle: isAuthenticated
              ? { borderRadius: radius.md }
              : { display: "none" },
          }}
        />

        <Drawer.Screen name="orders" options={{
            title: "Meus Pedidos",
            drawerIcon: ({ color, size }) => <ReceiptIcon size={size} color={color} />,
            drawerItemStyle: isAuthenticated
              ? { borderRadius: radius.md }
              : { display: "none" },
          }}
        />
        {/* Telas Ocultas do Menu Lateral */}

        <Drawer.Screen name="login" options={{ title: "Login", drawerItemStyle: { display: "none" } }}/>
        <Drawer.Screen name="checkout" options={{ title: "Checkout", drawerItemStyle: { display: "none" } }} />
        <Drawer.Screen name="categories/[id]" options={{ title: "Categoria", drawerItemStyle: { display: "none" } }} />
        <Drawer.Screen name="games/[id]" options={{ title: "Jogo", drawerItemStyle: { display: "none" } }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
