import type { ComponentPropsWithoutRef } from "react";

    type InputBarStyle = "primary" | "secondary" | "terciary";

    type InputBarProps = ComponentPropsWithoutRef<"input"> & {
        variant?: InputBarStyle;
    };

    const variantClass = {
        primary: "bg-night-soft text-black border-3 rounded-md border-night",
        secondary: "bg-night text-white border-3 rounded-md border-white",
        terciary: "bg-white/5 border rounded-md transition-all duration-300 focus-within:border-white/40 focus-within:bg-white/8"
    };

export function InputBar(props : InputBarProps){
    const {className = "", variant = "primary", ...rest } = props;

    const classPattern = `${variantClass[variant]} ${className}`.trim();

    return(
        <input
            className={classPattern}
            {...rest}
        />
    )
}
