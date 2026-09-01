import { passwordRules } from "..";

type PasswordRulesProps = { password: string; }

export function PasswordCheckList({password} : PasswordRulesProps) {
    return(
            <div className="grid grid-cols-1 gap-1 mt-1">
                {passwordRules.map((rule) => {
                    const passed = rule.test(password);
                    return (
                        <div key={rule.label} className="flex items-center gap-2">
                            <span className={`transition-colors duration-300 ${passed ? "text-emerald-400" : "text-white/20"}`}>
                                {passed ? <CheckIcon size={12} weight="bold" /> : <XIcon size={12} weight="bold" />}
                            </span>
                            <span className={`text-xs transition-colors duration-300 ${passed ? "text-white/60" : "text-white/25"}`}>
                                {rule.label}
                            </span>
                        </div>
                    );
                })}
            </div>
    )
}
