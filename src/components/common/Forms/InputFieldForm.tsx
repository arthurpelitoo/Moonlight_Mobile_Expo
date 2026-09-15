import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import type { ReactNode } from "react";
import type { TextInputProps } from "react-native";
import { InputBar } from "@/src/components/common/Generic/InputBar";
import { useTheme } from "@/src/contexts/ThemeContext";

type InputFieldFormProps = TextInputProps & {
    onChangeState?: (value: string) => void;
    icon?: ReactNode;
    rightElement?: ReactNode;
    label: string;
};

export function InputFieldForm(props: InputFieldFormProps) {
    const { theme, font, fontSize } = useTheme();
    const { onChangeText, onChangeState, icon, rightElement, label, editable = true, ...rest } = props;
    const [focused, setFocused] = useState(false);

    const styles = StyleSheet.create({
        wrapper: { gap: 6 },
        label: { fontSize: fontSize.sm },
        container: { flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12 },
        dimmed: { opacity: 0.5 },
        input: { flex: 1 },
    });


    return (
        <View style={styles.wrapper}>
            <Text style={[styles.label, { color: theme.textPrimary, fontFamily: font.base }, !editable && styles.dimmed]}>
                {label}
            </Text>
            <View style={[
                styles.container,
                { backgroundColor: theme.opacityBase, borderColor: theme.borderBase },
                focused && { borderColor: theme.secondaryColor },
                !editable && styles.dimmed,
            ]}>
                {icon}
                <InputBar
                    variant="terciary"
                    editable={editable}
                    onChangeText={(value) => { onChangeText?.(value); onChangeState?.(value); }}
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
