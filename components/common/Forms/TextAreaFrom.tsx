import type { ComponentPropsWithoutRef, ReactNode } from "react";

type TextAreaFormProps = ComponentPropsWithoutRef<"textarea"> & {
    onChangeState?: (value: string) => void;
    icon?: ReactNode;
    label: string;
};

export function TextAreaForm(props : TextAreaFormProps){
    const {className = "", onChange, onChangeState, icon, label = "...:", id, disabled, ...rest } = props;

    const classPattern = `${className}`.trim();

    return(
        <>
            <label htmlFor={id} className={`text-sm ${disabled ? "opacity-50" : ""}`}>{label}</label>
            <div className={`${disabled ? "opacity-50 cursor-not-allowed" : ""} flex items-center gap-3 bg-white/5 border rounded-md px-4 py-3 transition-all duration-300 focus-within:border-white/40 focus-within:bg-white/8`}>
                {icon}
                <textarea
                    className={`${classPattern} ${disabled ? "cursor-not-allowed" : ""} w-full pl-2 bg-white/5 border rounded-md transition-all duration-300 focus-within:border-white/40 focus-within:bg-white/8`}
                    onChange={(event) => {
                        onChange?.(event); // comportamento padrão
                        onChangeState?.(event.target.value); // comportamento simplificado
                    }}
                    disabled={disabled}
                    id={id}
                    {...rest}
                />
            </div>
        </>
    )
}
