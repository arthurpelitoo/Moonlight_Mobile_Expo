import { CircleNotchIcon } from "@phosphor-icons/react";

const variantClass = {
    primary: "text-white",
    secondary: "text-night",
    soft: "text-night-soft",
};

type SpinnerProps = {
    variant: "primary" | "secondary" | "soft";
}

export function Spinner({variant} : SpinnerProps){
    return <CircleNotchIcon size={64} className={`animate-spin ${variantClass[variant]}`} />
}