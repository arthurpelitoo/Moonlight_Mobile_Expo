import { View, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListIcon } from "phosphor-react-native";
import { DrawerActions } from "@react-navigation/native";
import { Link, useNavigation } from "expo-router";
import { useTheme } from "@/src/contexts/ThemeContext";

export function CustomerHeader() {
  const { currentColor, theme, space } = useTheme();
  const moonlightIcon =
    currentColor === "dark" ? require("@/src/styles/MoonlightMenor.png")
                            : require("@/src/styles/MoonlightMenor_black.png");
  const navigation = useNavigation();

  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: theme.base }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: space[5],
          paddingVertical: space[4],
        }}
      >
        <View>
          <Link href={"/home"}>
            <Image
              source={moonlightIcon}
              style={{ width: 200, height: 75 }}
              resizeMode="cover"
            />
          </Link>
        </View>

        <Pressable onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <ListIcon size={28} color={theme.iconBase} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
