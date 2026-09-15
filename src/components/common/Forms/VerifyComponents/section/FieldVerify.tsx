import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/src/contexts/ThemeContext";

type FieldVerifyProps = { passed: boolean; showError: boolean; errorMessage: string; };

export function FieldVerify({ passed, showError, errorMessage }: FieldVerifyProps) {
    const { theme } = useTheme();
    if (!showError) return null;
    const color = passed ? theme.success : theme.danger;

    return (
        <View style={styles.container}>
            <View style={[styles.bar, { backgroundColor: color }]} />
            {!passed && <Text style={[styles.message, { color }]}>{errorMessage}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { gap: 6, marginTop: 4 },
    bar: { height: 2, borderRadius: 999 },
    message: { fontSize: 11 },
});
