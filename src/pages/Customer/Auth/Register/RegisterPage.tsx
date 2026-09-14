import React from "react";
import {
    View, Image, ScrollView,
    KeyboardAvoidingView, Platform, StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/src/contexts/ThemeContext";
import { AuthTabs } from "@/src/components/common/Forms/AuthTabs";
import { RegisterForm } from "./sections/RegisterForm";

const moonlightIcon = require("@/src/pages/img/MoonlightIcon.png");

export default function RegisterPage() {
    const { theme } = useTheme();

    return (
        <View style={styles.root}>
            {/* Gradiente de fundo */}
            <LinearGradient
                colors={["#000000", "#060D1F", "#000000"]}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
            />

            {/* Glow decorativo */}
            <View pointerEvents="none" style={[styles.glow, { backgroundColor: theme.cta }]} />

            <SafeAreaView style={styles.safe}>
                <KeyboardAvoidingView
                    style={styles.flex}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <ScrollView
                        contentContainerStyle={styles.scroll}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.content}>
                            {/* Logo */}
                            <View style={styles.logoRow}>
                                <Image
                                    source={moonlightIcon}
                                    style={styles.logo}
                                    resizeMode="contain"
                                />
                            </View>

                            {/* Card */}
                            <View style={[styles.card, {
                                backgroundColor: theme.secondaryBg,
                                borderColor: theme.borderColor,
                            }]}>
                                <AuthTabs />
                                <RegisterForm />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    root:    { flex: 1, backgroundColor: "#000000" },
    safe:    { flex: 1 },
    flex:    { flex: 1 },
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
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    content: { width: "100%", maxWidth: 420, alignSelf: "center" },
    logoRow: { alignItems: "center", marginBottom: 28 },
    logo:    { width: 70, height: 80 },
    card: {
        borderWidth: 1,
        borderRadius: 14,
        padding: 24,
        gap: 16,
    },
});
