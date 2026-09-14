import { useEffect, useRef, useState } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { getPasswordVerifiedLevel } from "@/src/utils/Validation/dataRules/User/userPassword";
import { PasswordCheckList } from "./section/PasswordCheckList";
import { StrengthBar } from "./section/StrengthBar";

type PasswordStrengthProps = {
    password: string;
    showError: boolean;
};

function getStrengthLabelText(level: number): { labelText: string; color: string } {
    if (level === 0) return { labelText: "Insira uma senha", color: "#E24B4A" };
    if (level <= 2) return { labelText: "Fraca",            color: "#E24B4A" };
    if (level === 3) return { labelText: "Razoável",        color: "#EF9F27" };
    if (level === 4) return { labelText: "Boa",             color: "#639922" };
    return             { labelText: "Forte",                color: "#1D9E75" };
}

export function PasswordStrength({ password, showError }: PasswordStrengthProps) {
    const level = getPasswordVerifiedLevel(password);
    const { labelText, color } = getStrengthLabelText(level);
    const [visible, setVisible] = useState(false);
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (showError) setVisible(true);
    }, [showError]);

    useEffect(() => {
        if (level === 5 && visible) {
            const timer = setTimeout(() => {
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 700,
                    useNativeDriver: true,
                }).start(() => setVisible(false));
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [level, visible]);

    if (!visible) return null;

    return (
        <Animated.View style={[styles.container, { opacity }]}>
            <StrengthBar color={color} level={level} />
            <View style={styles.labelRow}>
                <Text style={[styles.label, { color }]}>{labelText}</Text>
            </View>
            <PasswordCheckList password={password} />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 8,
        marginTop: 4,
    },
    labelRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    label: {
        fontSize: 11,
    },
});