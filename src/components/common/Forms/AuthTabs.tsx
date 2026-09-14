import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT, FONT_SIZE } from "@/src/style/theme-pattern";

export function AuthTabs() {
    const router = useRouter();
    const pathname = usePathname();
    const { theme } = useTheme();

    const isLogin = pathname.includes("Login");
    const isRegister = pathname.includes("Register");

    return (
        <View style={[styles.wrap, { borderBottomColor: theme.borderColor }]}>
            <Pressable
                style={styles.tab}
                onPress={() => router.push("/(initial)/LoginPage")}
            >
                <Text style={[
                    styles.label,
                    { color: isLogin ? theme.primaryText : theme.tertiaryColor }
                ]}>
                    ENTRAR
                </Text>
                {isLogin && <View style={[styles.underline, { backgroundColor: theme.cta }]} />}
            </Pressable>

            <Pressable
                style={styles.tab}
                onPress={() => router.push("/(initial)/RegisterPage")}
            >
                <Text style={[
                    styles.label,
                    { color: isRegister ? theme.primaryText : theme.tertiaryColor }
                ]}>
                    CRIAR CONTA
                </Text>
                {isRegister && <View style={[styles.underline, { backgroundColor: theme.cta }]} />}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap:      { flexDirection: "row", borderBottomWidth: 1, marginBottom: 16 },
    tab:       { flex: 1, alignItems: "center", paddingBottom: 12, paddingTop: 4 },
    label:     { fontSize: FONT_SIZE.sm, fontFamily: FONT.baseMedium, letterSpacing: 1.5 },
    underline: { position: "absolute", bottom: -1, height: 2, width: "50%", borderRadius: 1 },
});
