import type { ReactNode } from "react";
import type { LayoutChangeEvent, StyleProp, ViewStyle } from "react-native";

export type ButtonVariant = "primary" | "secondary" | "cta" | "transparent" | "danger";

export type ButtonProps = {
  children?: ReactNode;
  icon?: ReactNode;
  onPress?: () => void;
  onLayout?: (e: LayoutChangeEvent) => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>; // "escape hatch" equivalente ao className extra do web
};
