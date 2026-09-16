import React from "react";
import { View, Pressable } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { useTheme } from "@/src/contexts/ThemeContext";
import { P } from "@/src/components/common/Generic/Text";

export function AuthTabs() {
    const router = useRouter();
    const pathname = usePathname();
    const { theme, space, font } = useTheme();

    const isLogin = pathname.includes("/login");
    const isRegister = pathname.includes("/register");

    return (
        <View style={{ flexDirection: "row", borderBottomWidth: 1, borderBottomColor: theme.tertiaryColor, marginBottom: space[4] }}>
            <Pressable
                style={{ flex: 1, alignItems: "center", paddingBottom: space[3], paddingTop: space[1] }}
                onPress={() => router.push("/login")}
            >
                <P style={{
                    fontFamily: font.baseMedium,
                    letterSpacing: 1.5,
                    color: isLogin ? theme.textPrimary : theme.tertiaryColor
                }}>
                    ENTRAR
                </P>
                {isLogin && (
                    <View style={{
                        position: "absolute", bottom: -1, height: 2, width: "50%",
                        borderRadius: 1, backgroundColor: theme.blueCta
                    }} />
                )}
            </Pressable>

            <Pressable
                style={{ flex: 1, alignItems: "center", paddingBottom: space[3], paddingTop: space[1] }}
                onPress={() => router.push("/register")}
            >
                <P style={{
                    fontFamily: font.baseMedium,
                    letterSpacing: 1.5,
                    color: isRegister ? theme.textPrimary : theme.tertiaryColor
                }}>
                    CRIAR CONTA
                </P>
                {isRegister && (
                    <View style={{
                        position: "absolute", bottom: -1, height: 2, width: "50%",
                        borderRadius: 1, backgroundColor: theme.blueCta
                    }} />
                )}
            </Pressable>
        </View>
    );
}
