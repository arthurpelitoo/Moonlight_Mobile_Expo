import { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type CardVariant = "primary" | "container";

export type CardProps = {
  children?: ReactNode // texto dentro do botão
  variant?: CardVariant // variantes de estilo
  style?: StyleProp<ViewStyle>; // "escape hatch" equivalente ao className extra do web
}
