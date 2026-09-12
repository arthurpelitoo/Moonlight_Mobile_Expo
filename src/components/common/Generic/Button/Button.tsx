import { Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/src/contexts/ThemeContext";
import type { ButtonProps, ButtonVariant } from "./Button.types";

// O porque de estar diferente do web: ver ADR em docs/decisions/mobile/components/button
export function Button({ children, icon, onPress, variant = "transparent", disabled, style, onLayout }: ButtonProps) {
  const { theme, radius, space, font, fontSize } = useTheme();

  const variantStyle: Record<ButtonVariant, { bg: string; text: string }> = {
    primary: { bg: theme.base, text: theme.textPrimary },
    secondary: { bg: theme.baseSoft, text: theme.textPrimary },
    cta: { bg: theme.blueCta, text: theme.ctaText },
    transparent: { bg: "transparent", text: theme.textPrimary },
    danger: { bg: theme.danger, text: "#FFFFFF" },
  };

  const { bg, text } = variantStyle[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      onLayout={onLayout}
      disabled={disabled}
      activeOpacity={0.7} // equivalente ao active:scale-95/hover do web — feedback visual ao toque
      style={[
        {
          backgroundColor: bg,
          opacity: disabled ? 0.5 : 1,
          borderRadius: radius.md,
          paddingVertical: space[3],
          paddingHorizontal: space[3],
          justifyContent: "center",
          alignItems: "center",
        },
        style, // igual ao do frontweb, permite colocar estilização adicional.
      ]}
    >
      {icon}
      {typeof children === "string" ? (
        <Text style={{ color: text, fontFamily: font.baseSemibold, fontSize: fontSize.h4 }}>
          {children}
        </Text>
      ) : (
        children // JSX arbitrário (ex: CategoryCard) vai direto, sem passar por <Text>
      )}
    </TouchableOpacity>
  );
}
