import { Image, Text, View } from "react-native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, type DrawerContentComponentProps } from "@react-navigation/drawer";
import { useTheme } from "@/src/contexts/ThemeContext";
import { SignOutIcon, UserCircleIcon } from "phosphor-react-native";
import { useAuth } from "@/src/hooks/auth/useAuth";
import { useRouter } from "expo-router";

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { currentColor, theme, space, font, fontSize } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const moonlightIcon =
    currentColor === "dark" ? require("@/src/styles/MoonlightMenor.png")
                            : require("@/src/styles/MoonlightMenor_black.png");

  const handleLogout = async () => {
      await logout();
      router.replace("/login");
  };
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: theme.base, flex: 1 }}>
      <View style={{ padding: space[2], marginBottom: space[4] }}>
        <View style={{ padding: space[2], marginBottom: space[4] }}>
          <Image
            source={moonlightIcon}
            style={{ width: "auto", height: 100 }}
            resizeMode="cover"
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
          borderRadius: 12,
          backgroundColor: theme.opacityBase,
          borderWidth: 1,
          borderColor: theme.borderBase,
        }}>
          <UserCircleIcon size={36} color={theme.secondaryColor} weight="fill" />
          <View style={{ flex: 1 }}>
            <Text style={{ color: theme.textPrimary, fontFamily: font.baseMedium, fontSize: fontSize.md }} numberOfLines={1}>
              {user.name}
            </Text>
            <Text style={{ color: theme.success, fontFamily: font.base, fontSize: fontSize.sm }}>
              ● Autenticado
            </Text>
          </View>
        </View>
      )}

      <DrawerItemList {...props} />

      {isAuthenticated && (
        <DrawerItem
          label="Sair"
          icon={({ color, size }) => <SignOutIcon size={size} color={theme.iconBase} />}
          labelStyle={{ color: theme.textPrimary, fontFamily: font.base }}
          onPress={handleLogout}
        />
      )}
    </DrawerContentScrollView>
  );
}
