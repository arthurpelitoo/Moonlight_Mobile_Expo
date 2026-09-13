import { Image, View } from "react-native";
import { DrawerContentScrollView, DrawerItemList, type DrawerContentComponentProps } from "@react-navigation/drawer";
import { useTheme } from "@/src/contexts/ThemeContext";

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { theme, space } = useTheme();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: theme.base, flex: 1 }}>
      <View style={{ padding: space[2], marginBottom: space[4] }}>
        <View style={{ padding: space[2], marginBottom: space[4] }}>
          <Image
            source={require("@/src/styles/MoonlightMenor.png")}
            style={{ width: "auto", height: 100 }}
            resizeMode="cover"
          />
        </View>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
