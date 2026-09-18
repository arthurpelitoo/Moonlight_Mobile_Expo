import React from "react";
import {
    View, Image, ScrollView,
    KeyboardAvoidingView, Platform, StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/src/contexts/ThemeContext";
import { GradientBackground } from "@/src/components/common/Generic/GradientBackground";
import { AuthTabs } from "@/src/components/common/Forms/AuthTabs";
import { LoginForm } from "./sections/LoginForm";

export default function LoginPage() {
    const { currentColor, theme } = useTheme();
    const moonlightIcon =
      currentColor === "dark" ? require("@/src/styles/MoonlightIcone.png")
                              : require("@/src/styles/MoonlightIcone_black.png");

    return (
        <GradientBackground>
            {/* Glow decorativo */}
            <View pointerEvents="none" style={[styles.glow, { backgroundColor: theme.blueCta }]} />

            <SafeAreaView style={styles.safe} edges={["left", "right", "bottom"]} >
                <KeyboardAvoidingView
                    style={styles.flex}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView
                        contentContainerStyle={styles.scroll}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.content}>
                            <View style={styles.logoRow}>
                                <Image source={moonlightIcon} style={styles.logo} resizeMode="contain" />
                            </View>

                            <View style={[styles.card, { backgroundColor: theme.baseSoft, borderColor: theme.borderBase }]}>
                                <AuthTabs />
                                <LoginForm />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    flex: { flex: 1 },
    glow: {
        position: "absolute",
        width: 380, height: 380,
        borderRadius: 190,
        opacity: 0.07,
        alignSelf: "center",
        top: -80,
    },
    scroll: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 64,
    },
    content: { width: "100%", maxWidth: 420, alignSelf: "center" },
    logoRow: { alignItems: "center", marginBottom: 36 },
    logo: { width: 70, height: 80 },
    card: { borderWidth: 1, borderRadius: 14, padding: 24, gap: 16 },
});
