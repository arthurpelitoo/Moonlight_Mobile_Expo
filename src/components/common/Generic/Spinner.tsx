

const variantClass = {
    primary: "text-white",
    secondary: "text-night",
    soft: "text-night-soft",
};

type SpinnerProps = {
    variant: "primary" | "secondary" | "soft";
}

export function Spinner({variant} : SpinnerProps){
    return (<div className={`animate-spin ${variantClass[variant]}`}>-spinner</div>)