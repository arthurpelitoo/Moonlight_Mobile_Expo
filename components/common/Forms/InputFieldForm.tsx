import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { InputBar } from "../";

type InputFieldFormProps = ComponentPropsWithoutRef<"input"> & {
    onChangeState?: (value: string) => void;
    icon?: ReactNode;
    rightElement?: ReactNode;
    label: string;
};

export function InputFieldForm(props : InputFieldFormProps){
    const {className = "", onChange, onChangeState, icon, rightElement, label = "...:", id, disabled, ...rest } = props;

    const classPattern = `${className}`.trim();

    return(
        <>
            <label htmlFor={id} className={`text-sm ${disabled ? "opacity-50" : ""}`}>{label}</label>
            <div className={`${disabled ? "opacity-50 cursor-not-allowed" : ""} flex items-center gap-3 bg-white/5 border rounded-md px-4 py-3 transition-all duration-300 focus-within:border-white/40 focus-within:bg-white/8`}>
                {icon}
                <InputBar
                    className={`${classPattern} ${disabled ? "cursor-not-allowed" : ""} w-full pl-2`}
                    onChange={(event) => {
                        onChange?.(event); // comportamento padrão
                        onChangeState?.(event.target.value); // comportamento simplificado
                    }}
                    variant="terciary"
                    disabled={disabled}
                    id={id}
                    {...rest}
                />
                {rightElement}
            </div>
        </>
    )
}
