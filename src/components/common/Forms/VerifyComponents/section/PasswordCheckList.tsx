import { View, Text, StyleSheet } from "react-native";
import { passwordRules } from "@/src/utils/Validation/dataRules/User/userPassword";

type PasswordRulesProps = {
    password: string;
};

export function PasswordCheckList({ password }: PasswordRulesProps) {
    return (
        <View style={styles.container}>
            {passwordRules.map((rule) => {
                const passed = rule.test(password);
                return (
                    <View key={rule.label} style={styles.row}>
                        <Text style={[styles.icon, passed ? styles.iconPassed : styles.iconFailed]}>
                            {passed ? "✓" : "✕"}
                        </Text>
                        <Text style={[styles.label, passed ? styles.labelPassed : styles.labelFailed]}>
                            {rule.label}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 4,
        marginTop: 4,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    icon: {
        fontSize: 12,
        fontWeight: "bold",
    },
    iconPassed: {
        color: "#00CC6A",
    },
    iconFailed: {
        color: "#4B5568",
    },
    label: {
        fontSize: 12,
    },
    labelPassed: {
        color: "rgba(255, 255, 255, 0.6)",
    },
    labelFailed: {
        color: "rgba(255, 255, 255, 0.25)",
    },
});