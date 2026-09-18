import { Image, View } from "react-native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, type DrawerContentComponentProps } from "@react-navigation/drawer";
import { useTheme } from "@/src/contexts/ThemeContext";
import { BooksIcon, ReceiptIcon, SignOutIcon, StorefrontIcon, UserCircleIcon, UserIcon } from "phosphor-react-native";
import { useAuth } from "@/src/hooks/auth/useAuth";
import { useRouter } from "expo-router";
import { WarmWelcomeTime } from "./components/WarmWelcomeTime";
import { CustomDrawerItem } from "../../CustomDrawerItem";

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { currentColor, theme, space, font, radius } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const moonlightIcon =
    currentColor === "dark" ? require("@/src/styles/MoonlightMenor.png")
                            : require("@/src/styles/MoonlightMenor_black.png");

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const protectedItemStyle = { borderRadius: radius.md };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: theme.base, flex: 1 }}>
      <View style={{ padding: space[2], marginBottom: space[4] }}>
        <View style={{ padding: space[2], marginBottom: space[4] }}>
          <Image
            source={moonlightIcon}
            style={{ width: 200, height: 75 }}
            resizeMode="contain"
          />
        </View>
      </View>

      {isAuthenticated && user && (
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          gap: space[3],
          paddingHorizontal: space[3],
          paddingVertical: space[3],
          marginBottom: space[6],
          borderRadius: radius.md,
          backgroundColor: theme.opacityBase,
          borderWidth: 1,
          borderColor: theme.borderBase,
        }}>
          <View style={{ flex: 1 }}>
            <WarmWelcomeTime/>
          </View>
        </View>
      )}

      <DrawerItemList {...props} />

      {isAuthenticated && (
        <>
          <CustomDrawerItem
            label="Perfil"
            href="/profile"
            icon={({ size, color }) => <UserIcon size={size} color={color} />}
          />
          <CustomDrawerItem
            label="Biblioteca"
            href="/library"
            icon={({ size, color }) => <BooksIcon size={size} color={color} />}
          />
          <CustomDrawerItem
            label="Meus Pedidos"
            href="/orders"
            icon={({ size, color }) => <ReceiptIcon size={size} color={color} />}
          />

          <CustomDrawerItem
            label="Loja"
            href="/"
            icon={({ size, color }) => <StorefrontIcon size={size} color={color} />}
          />

          <DrawerItem
            label="Sair"
            icon={({ size }) => <SignOutIcon size={size} color={theme.iconBase} />}
            labelStyle={{ color: theme.textPrimary, fontFamily: font.base }}
            onPress={handleLogout}
          />
        </>
      )}
    </DrawerContentScrollView>
  );
}
