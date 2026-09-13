// components/common/Generic/GradientBackground.tsx
import { useTheme } from "@/src/contexts/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, ViewStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function GradientBackground({ children, style }: Props) {
  const {theme} = useTheme();
  return (
    <LinearGradient
      colors={[theme.baseSoft, theme.base, theme.base]} // reaproveita os tokens do theme-pattern.ts
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
