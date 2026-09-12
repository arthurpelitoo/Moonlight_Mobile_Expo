
import { useTheme } from "@/src/contexts/ThemeContext";
import { Text, type TextProps } from "react-native";

type TypographyVariant = "p" | "h1" | "h2" | "h3" | "h4";

type TypographyProps = TextProps & {
  children: React.ReactNode;
  variant: TypographyVariant;
};

const variantConfig: Record<TypographyVariant, { fontSizeKey: "base" | "h1" | "h2" | "h3" | "h4"; fontKey: "base" | "baseSemibold" }> = {
  p: { fontSizeKey: "base", fontKey: "base" },
  h1: { fontSizeKey: "h1", fontKey: "baseSemibold" },
  h2: { fontSizeKey: "h2", fontKey: "baseSemibold" },
  h3: { fontSizeKey: "h3", fontKey: "base" },
  h4: { fontSizeKey: "h4", fontKey: "base" },
};

function Typography({ children, variant, style, ...rest }: TypographyProps) {
  const { theme, fontSize, font } = useTheme();
  const { fontSizeKey, fontKey } = variantConfig[variant];

  return (
    <Text
      style={[
        {
          color: theme.textPrimary,
          fontSize: fontSize[fontSizeKey],
          fontFamily: font[fontKey],
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}


export const P = (props: Omit<TypographyProps, "variant">) => <Typography variant="p" {...props} />;
export const H1 = (props: Omit<TypographyProps, "variant">) => <Typography variant="h1" {...props} />;
export const H2 = (props: Omit<TypographyProps, "variant">) => <Typography variant="h2" {...props} />;
export const H3 = (props: Omit<TypographyProps, "variant">) => <Typography variant="h3" {...props} />;
export const H4 = (props: Omit<TypographyProps, "variant">) => <Typography variant="h4" {...props} />;
