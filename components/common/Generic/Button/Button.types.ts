import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonStyle = "primary" | "secondary" | "cta" | "transparent" | "danger";

type SharedProps = {
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
  variant?: ButtonStyle;
};

type AsButton = SharedProps &
  ComponentPropsWithoutRef<"button"> & {
    as?: "button";
    href?: never;
  };

type AsAnchor = SharedProps &
  ComponentPropsWithoutRef<"a"> & {
    as: "a";
    href: string;
  };

type AsLink = SharedProps &
  ComponentPropsWithoutRef<"a"> & {
  as: "link";
  href: string;
};

export type ButtonProps = AsButton | AsAnchor | AsLink;
