import { useTheme } from "@/src/contexts/ThemeContext";
import { ActivityIndicator } from "react-native";

export function Spinner() {
  const {theme} = useTheme();
  return <ActivityIndicator size="large" color={theme.blueCta} />;
}
