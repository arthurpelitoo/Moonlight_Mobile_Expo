import { Pressable, Text, StyleSheet, Linking } from "react-native";
import { Link } from "expo-router";
import { DARK } from "@/src/style/theme-pattern";
import type { ButtonProps, ButtonVariant } from "./Button.types";

const BG: Record<ButtonVariant, string> = {
    primary:     DARK.secondaryBg,
    secondary:   DARK.tertiaryBg,
    cta:         DARK.cta,
    transparent: "transparent",
    danger:      DARK.danger,
};

const TEXT_COLOR: Record<ButtonVariant, string> = {
    primary:     DARK.primaryText,
    secondary:   DARK.primaryText,
    cta:         DARK.ctaText,
    transparent: DARK.primaryText,
    danger:      "#FFFFFF",
};

export function Button(props: ButtonProps) {
    const { children, icon, variant = "transparent" } = props;

    const bg        = BG[variant];
    const textColor = TEXT_COLOR[variant];

    const inner = (
        <>
            {icon}
            {typeof children === "string"
                ? <Text style={[styles.label, { color: textColor }]}>{children}</Text>
                : children}
        </>
    );

    // Navegação interna (expo-router)
    if (props.as === "link") {
        return (
            <Link href={props.href as any} asChild>
                <Pressable style={({ pressed }) => [styles.base, { backgroundColor: bg, opacity: pressed ? 0.8 : 1 }]}>
                    {inner}
                </Pressable>
            </Link>
        );
    }

    // Link externo
    if (props.as === "a") {
        return (
            <Pressable
                style={({ pressed }) => [styles.base, { backgroundColor: bg, opacity: pressed ? 0.8 : 1 }]}
                onPress={() => Linking.openURL(props.href)}
            >
                {inner}
            </Pressable>
        );
    }

    // Botão padrão
    const { as: _as, href: _href, ...rest } = props as any;
    return (
        <Pressable
            {...rest}
            style={({ pressed }) => [
                styles.base,
                { backgroundColor: bg, opacity: pressed ? 0.8 : 1 },
                typeof rest.style === "function" ? rest.style({ pressed }) : rest.style,
            ]}
        >
            {inner}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    label: {
        fontFamily: "Poppins_500Medium",
        fontSize: 13,
    },
});