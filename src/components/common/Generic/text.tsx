import { useTheme } from "@/contexts/ThemeContext";
import { Text } from "react-native";

type Props = {
    children: React.ReactNode
}

export const P = (props: Props) => {
  const { theme, font, fontSize } = useTheme();
  return (
    <Text
      style={{
        color: theme.primaryText,
        fontSize: fontSize.base,
        fontFamily: font.base
      }}
    >
      {props.children}
    </Text>
  )
}

export const H1 = (props: Props) => {
  const { theme, font, fontSize } = useTheme();
  return (
      <Text
          style={{
              color: theme.primaryText,
              fontSize: fontSize.h1,
              fontFamily: font.baseSemibold,
          }}
      >{props.children}</Text>
  );
}

export const H2 = (props: Props) => {
  const { theme, font, fontSize } = useTheme();
  return (
      <Text
          style={{
              color: theme.primaryText,
              fontSize: fontSize.h2,
              fontFamily: font.baseSemibold,
          }}
      >{props.children}</Text>
  );
}

export const H3 = (props: Props) => {
  const { theme, font, fontSize } = useTheme();
  return (
    <Text
        style={{
            color: theme.primaryText,
            fontSize: fontSize.h3,
            fontFamily: font.base,
        }}
    >{props.children}</Text>
  );
}

export const H4 = (props: Props) => {
  const { theme, font, fontSize } = useTheme();
  return (
    <Text
      style={{
        color: theme.primaryText,
        fontSize: fontSize.h4,
        fontFamily: font.base
      }}
    >
      {props.children}
    </Text>
  )
}
