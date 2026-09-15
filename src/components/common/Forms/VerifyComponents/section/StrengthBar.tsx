import { View, StyleSheet } from "react-native";
import { useTheme } from "@/src/contexts/ThemeContext";

export function StrengthBar({ level, color }: { level: number; color: string }) {
    const { theme } = useTheme();
    return (
        <View style={styles.container}>
            {[1, 2, 3, 4, 5].map((i) => (
                <View key={i} style={[styles.bar, { backgroundColor: i <= level ? color : theme.opacityBase }]} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: "row", gap: 4 },
    bar: { height: 2, flex: 1, borderRadius: 999 },
});
