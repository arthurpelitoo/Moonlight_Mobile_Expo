import { View } from "react-native";
import { BlurView } from "expo-blur";
import { useTheme } from "@/src/contexts/ThemeContext";
import type { CardProps, CardVariant } from "./Card.types";
import { hexToRgb } from "@/src/utils/hexToRgb";

export function Card({ children, variant = "primary", style }: CardProps) {
  const { theme, currentColor, radius, space } = useTheme();

  const variantStyle: Record<CardVariant, { bg: string; border?: string; blur?: boolean }> = {
    primary: {
      bg: `rgba(${hexToRgb(theme.inverseBase)}, 0.05)`,
      border: `rgba(${hexToRgb(theme.inverseBase)}, 0.08)`,
      blur: true,
    },
    container: { bg: "transparent" },
    solid: {
      bg: theme.baseSoft,
      border: theme.borderBase,
      blur: false,
    },
  };

  const { bg, border, blur } = variantStyle[variant];

  const cardStyle = [
    {
      borderRadius: radius.xl,
      paddingVertical: space[3],
      paddingHorizontal: space[3],
      justifyContent: "center" as const,
      alignItems: "center" as const,
      overflow: "hidden" as const,
      ...(border && { borderWidth: 1, borderColor: border }),
    },
    style,
  ];

  if (blur) {
    return (
      <BlurView intensity={20} tint={currentColor} style={[cardStyle, { backgroundColor: bg }]}>
        {children}
      </BlurView>
    );
  }

  return <View style={[cardStyle, { backgroundColor: bg }]}>{children}</View>;
}
