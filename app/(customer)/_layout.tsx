import { CustomDrawerContent } from "@/src/components/layout/Customer/Header/CustomDrawerContent";
import { CustomerHeader } from "@/src/components/layout/Customer/Header/CustomerHeader";
import { useTheme } from "@/src/contexts/ThemeContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function CustomerLayout() {
  const { theme, radius } = useTheme();

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
            borderRadius: radius.md, // troca o "pill" (raio bem alto, padrão da lib) por um raio mais sutil
          },
        }}
      >
        {/* aponta pro GRUPO de tabs inteiro, não pra uma tela individual */}
        <Drawer.Screen name="(tabs)" options={{
            title: "Home",
            drawerIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
          }}
        />

        {/* telas de detalhe: existem, navegáveis, mas escondidas da lista do menu */}
        <Drawer.Screen name="categories/[id]" options={{ title: "Categoria", drawerItemStyle: { display: "none" } }} />
        <Drawer.Screen name="games/[id]" options={{ title: "Jogo", drawerItemStyle: { display: "none" } }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
