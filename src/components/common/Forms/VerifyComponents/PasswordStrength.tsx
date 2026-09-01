import { useEffect, useState } from "react";
import { getPasswordVerifiedLevel} from "../../../../utils/Validation/dataRules/User/userPassword";
import { getAnimationState } from "../../../../utils/ui/animation/animationState";
import { StrengthBar } from "./section/StrengthBar";
import { PasswordCheckList } from "./section/PasswordCheckList";

type PasswordStrengthProps = {
    password: string;
    showError: boolean
}

function getStrengthLabelText(level: number): { labelText: string; color: string } {
    if (level === 0) return { labelText: "Insira uma senha", color: "#E24B4A" };
    if (level <= 2) return { labelText: "Fraca", color: "#E24B4A" };
    if (level === 3) return { labelText: "Razoável", color: "#EF9F27" };
    if (level === 4) return { labelText: "Boa", color: "#639922" };
    return { labelText: "Forte", color: "#1D9E75" };
}
 
export function PasswordStrength({ password, showError }: PasswordStrengthProps) {
    const level = getPasswordVerifiedLevel(password); // Level (devolve do 5 até 0)
    const { labelText, color } = getStrengthLabelText(level); 
    const [visible, setVisible] = useState(false);
    const [hidden, setHidden] = useState(false);
    const animHiddenBar = getAnimationState(hidden);

    useEffect(() => {
        if(showError) setVisible(true);
    }, [showError]);

    useEffect(() => {
        if (level === 5 && visible) {
            const timer = setTimeout(() => {
                setHidden(true); 
                setTimeout(() => setVisible(false), 700);
            }, 2000); 
            return () => clearTimeout(timer);
        } else{
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setHidden(false); 
        }
    }, [level, visible]);
 
    if (!visible) return null;

    return (
        <div className={`flex flex-col gap-2 mt-1 transition-all duration-700 ${animHiddenBar.styles.fadeOutOpacity} ${animHiddenBar.styles.heightZero} overflow-hidden`}>
            <StrengthBar color={color} level={level}/>
            <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color }}>
                    {labelText}
                </span>
            </div>
            <PasswordCheckList password={password}/>
        </div>
    );
}