import { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { DARK } from "@/src/style/theme-pattern";

interface LoadingDotsProps {
    color?: "light" | "dark";
}

export function LoadingDots({ color = "light" }: LoadingDotsProps) {
    const dotColor = color === "dark" ? DARK.bodyBg : DARK.tertiaryColor;
    const anims = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];

    useEffect(() => {
        const animations = anims.map((anim, i) =>
            Animated.loop(
                Animated.sequence([
                    Animated.delay(i * 150),
                    Animated.timing(anim, { toValue: -6, duration: 300, useNativeDriver: true }),
                    Animated.timing(anim, { toValue: 0,  duration: 300, useNativeDriver: true }),
                ])
            )
        );
        animations.forEach(a => a.start());
        return () => animations.forEach(a => a.stop());
    }, []);

    return (
        <View style={styles.container}>
            {anims.map((anim, i) => (
                <Animated.View
                    key={i}
                    style={[styles.dot, { backgroundColor: dotColor, transform: [{ translateY: anim }] }]}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 999,
    },
});