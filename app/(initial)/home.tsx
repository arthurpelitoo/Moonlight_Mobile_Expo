import { H3 } from "@/src/components/common/Generic/text";
import { useTheme } from "@/src/contexts/ThemeContext";
import { View } from "react-native";

export default function Home() {
  const { theme } = useTheme();

    return (
        <View style={{ backgroundColor: theme.bodyBg, flex: 1, justifyContent: "center", alignItems: "center" }}>
            <H3>Essa é a pagina home do app:</H3>
        </View>
    )
}
