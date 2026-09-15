import { TextInput, StyleSheet } from "react-native";
import type { TextInputProps } from "react-native";
import { useTheme } from "@/src/contexts/ThemeContext";

type InputBarStyle = "primary" | "secondary" | "terciary";

type InputBarProps = TextInputProps & {
    variant?: InputBarStyle;
};

export function InputBar({ variant = "primary", style, ...rest }: InputBarProps) {
  const {theme, font, fontSize} = useTheme()

  const styles = StyleSheet.create({
      base: {
          flex: 1,
          fontFamily: font.base,
          fontSize: fontSize.base,
          color: theme.textPrimary,
          paddingVertical: 0,
      },
  });

  const variantStyles = {
      primary:   { backgroundColor: theme.baseSoft, borderWidth: 1, borderColor: theme.surfaceCard },
      secondary: { backgroundColor: theme.base,      borderWidth: 1, borderColor: theme.borderBase },
      terciary:  { backgroundColor: "transparent",    borderWidth: 0 },
  };

  return (
      <TextInput
          style={[styles.base, variantStyles[variant], style]}
          placeholderTextColor={theme.secondaryColor}
          {...rest}
      />
  );
}
