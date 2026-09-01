import type { ComponentPropsWithoutRef } from "react"

type CardHeaderProps = ComponentPropsWithoutRef<"div"> & {
  children: React.ReactNode
}

export function CardHeader(props: CardHeaderProps) {
  
  const {children, className, ...rest} = props;

  const classPattern = `mb-2 ${className ?? ""}`;

  return (
    <div className={classPattern} {...rest}>
      {children}
    </div>
  )
}