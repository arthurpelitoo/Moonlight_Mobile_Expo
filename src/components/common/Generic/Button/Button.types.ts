import type { ReactNode } from "react";
import type { PressableProps } from "react-native";

export type ButtonVariant = "primary" | "secondary" | "cta" | "transparent" | "danger";

type SharedProps = {
    children?: ReactNode;
    icon?: ReactNode;
    variant?: ButtonVariant;
};

type AsButton = SharedProps & PressableProps & {
    as?: "button";
    href?: never;
};

type AsLink = SharedProps & {
    as: "link";
    href: string;
};

type AsAnchor = SharedProps & {
    as: "a";
    href: string;
};

export type ButtonProps = AsButton | AsLink | AsAnchor;