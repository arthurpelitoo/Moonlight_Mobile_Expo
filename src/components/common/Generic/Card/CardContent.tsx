import type {ComponentPropsWithoutRef, ReactNode} from "react";

type CardContentProps = ComponentPropsWithoutRef<"div"> & {
  children: React.ReactNode
}

export function CardContent(props: CardContentProps) {
  const { children, ...rest } = props;
  return (
    <div {...rest}>
      {children}
    </div>
  )
}