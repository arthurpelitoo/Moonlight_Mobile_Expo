import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import type { ReactNode } from "react";
import type { TextInputProps } from "react-native";
import { InputBar } from "@/src/components/common/Generic/InputBar";
import { DARK, FONT, FONT_SIZE } from "@/src/style/theme-pattern";

type InputFieldFormProps = TextInputProps & {
    onChangeState?: (value: string) => void;
    icon?: ReactNode;
    rightElement?: ReactNode;
    label: string;
};

export function InputFieldForm(props: InputFieldFormProps) {
    const { onChangeText, onChangeState, icon, rightElement, label, editable = true, ...rest } = props;

    const [focused, setFocused] = useState(false);

    return (
        <View style={styles.wrapper}>
            <Text style={[styles.label, !editable && styles.dimmed]}>
                {label}
            </Text>
            <View style={[
                styles.container,
                focused   && styles.containerFocused,
                !editable && styles.dimmed,
            ]}>
                {icon}
                <InputBar
                    variant="terciary"
                    editable={editable}
                    onChangeText={(value) => {
                        onChangeText?.(value);
                        onChangeState?.(value);
                    }}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={styles.input}
                    {...rest}
                />
                {rightElement}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        gap: 6,
    },
    label: {
        fontSize: FONT_SIZE.sm,
        color: DARK.primaryText,
        fontFamily: FONT.base,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        backgroundColor: "rgba(255,255,255,0.05)",
        borderWidth: 1,
        borderColor: DARK.borderColor,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    containerFocused: {
        borderColor: "rgba(255,255,255,0.4)",
        backgroundColor: "rgba(255,255,255,0.08)",
    },
    dimmed: {
        opacity: 0.5,
    },
    input: {
        flex: 1,
    },
});