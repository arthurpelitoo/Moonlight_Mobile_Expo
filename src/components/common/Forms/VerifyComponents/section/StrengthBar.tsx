import { View, StyleSheet } from "react-native";

type StrengthBarProps = {
    level: number;
    color: string;
};

export function StrengthBar({ level, color }: StrengthBarProps) {
    return (
        <View style={styles.container}>
            {[1, 2, 3, 4, 5].map((i) => (
                <View
                    key={i}
                    style={[styles.bar, { backgroundColor: i <= level ? color : "rgba(255,255,255,0.1)" }]}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 4,
    },
    bar: {
        height: 2,
        flex: 1,
        borderRadius: 999,
    },
});