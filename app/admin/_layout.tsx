import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuth } from "@/src/hooks/auth/useAuth";
import { useTheme } from "@/src/contexts/ThemeContext";
import { CustomDrawerContent } from "@/src/components/layout/Admin/Header/CustomDrawerContent";
import { AdminHeader } from "@/src/components/layout/Admin/Header/AdminHeader";
import { GaugeIcon } from "phosphor-react-native";

export default function AdminLayout() {
  const { theme, radius } = useTheme();
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  const isAdmin = user?.roles.includes("admin") ?? false;

  if (!isAdmin) {
    return <Redirect href="/" />; // cliente vai pra home se não for admin
  }

  const visibleItemStyle = { borderRadius: radius.md };
  const hiddenItemStyle = { display: "none" as const };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          header: () => <AdminHeader />,
          drawerStyle: { backgroundColor: theme.base, width: "75%" },
          drawerActiveTintColor: theme.inverseBase,
          drawerInactiveTintColor: theme.textPrimary,
          drawerItemStyle: visibleItemStyle,
        }}
      >

        <Drawer.Screen name="(tabs)" options={{
            title: "Painel Administrativo",
            drawerIcon: ({ color, size }) => <GaugeIcon size={size} color={color} />,
          }}
        />

        {/* telas ocultas — acessadas via router.push nos botões de criar/editar das tabelas, não pelo menu */}
        <Drawer.Screen name="categories/create" options={{ title: "Criar Categoria", drawerItemStyle: hiddenItemStyle }} />
        <Drawer.Screen name="categories/edit/[id_category]" options={{ title: "Editar Categoria", drawerItemStyle: hiddenItemStyle }} />
        <Drawer.Screen name="games/create" options={{ title: "Criar Jogo", drawerItemStyle: hiddenItemStyle }} />
        <Drawer.Screen name="games/edit/[id_game]" options={{ title: "Editar Jogo", drawerItemStyle: hiddenItemStyle }} />
        <Drawer.Screen name="users/create" options={{ title: "Criar Usuário", drawerItemStyle: hiddenItemStyle }} />
        <Drawer.Screen name="users/edit/[id_user]" options={{ title: "Editar Usuário", drawerItemStyle: hiddenItemStyle }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
