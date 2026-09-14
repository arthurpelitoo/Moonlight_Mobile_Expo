import { TextInput, StyleSheet } from "react-native";
import type { TextInputProps } from "react-native";
import { DARK, FONT, FONT_SIZE } from "@/src/style/theme-pattern";

type InputBarStyle = "primary" | "secondary" | "terciary";

type InputBarProps = TextInputProps & {
    variant?: InputBarStyle;
};

const variantStyles = {
    primary:   { backgroundColor: DARK.secondaryBg, borderWidth: 1, borderColor: DARK.borderColor },
    secondary: { backgroundColor: DARK.bodyBg,      borderWidth: 1, borderColor: DARK.primary },
    terciary:  { backgroundColor: "transparent",    borderWidth: 0 },
};

export function InputBar({ variant = "primary", style, ...rest }: InputBarProps) {
    return (
        <TextInput
            style={[styles.base, variantStyles[variant], style]}
            placeholderTextColor={DARK.tertiaryColor}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        fontFamily: FONT.base,
        fontSize: FONT_SIZE.base,
        color: DARK.primaryText,
        paddingVertical: 0,
    },
});