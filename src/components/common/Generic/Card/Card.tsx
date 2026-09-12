import { View } from "react-native";
import { BlurView } from "expo-blur";
import { useTheme } from "@/src/contexts/ThemeContext";
import type { CardProps, CardVariant } from "./Card.types";

// converte hex ("#FFFFFF") pra "r, g, b", pra poder aplicar opacidade via rgba()
// necessário porque theme.inverseBase é hex fixo, não vem pronto em rgb
function hexToRgb(hex: string): string {
  const parsed = hex.replace("#", "");
  const r = parseInt(parsed.substring(0, 2), 16);
  const g = parseInt(parsed.substring(2, 4), 16);
  const b = parseInt(parsed.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

export function Card({ children, variant = "primary", style }: CardProps) {
  const { theme, currentColor, radius, space } = useTheme();

  const variantStyle: Record<CardVariant, { bg: string; border?: string; blur?: boolean }> = {
    primary: {
      bg: `rgba(${hexToRgb(theme.inverseBase)}, 0.05)`,
      border: `rgba(${hexToRgb(theme.inverseBase)}, 0.08)`,
      blur: true,
    },
    container: { bg: "transparent" },
  };

  const { bg, border, blur } = variantStyle[variant];

  const cardStyle = [
    {
      borderRadius: radius.xl,
      paddingVertical: space[4],
      paddingHorizontal: space[4],
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
