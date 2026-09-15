import { View, Text, StyleSheet } from "react-native";
import { passwordRules } from "@/src/utils/Validation/dataRules/User/userPassword";
import { useTheme } from "@/src/contexts/ThemeContext";

export function PasswordCheckList({ password }: { password: string }) {
    const { theme } = useTheme();
    return (
        <View style={styles.container}>
            {passwordRules.map((rule) => {
                const passed = rule.test(password);
                return (
                    <View key={rule.label} style={styles.row}>
                        <Text style={[styles.icon, { color: passed ? theme.success : theme.tertiaryColor }]}>
                            {passed ? "✓" : "✕"}
                        </Text>
                        <Text style={[styles.label, { color: passed ? theme.secondaryColor : theme.tertiaryColor }]}>
                            {rule.label}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { gap: 4, marginTop: 4 },
    row: { flexDirection: "row", alignItems: "center", gap: 8 },
    icon: { fontSize: 12, fontWeight: "bold" },
    label: { fontSize: 12 },
});
