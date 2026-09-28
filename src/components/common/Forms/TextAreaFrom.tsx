import { View, TextInput } from "react-native";
import { P } from "@/src/components/common/Generic/Text";
import { useTheme } from "@/src/contexts/ThemeContext";

type TextAreaFormProps = {
  label: string;
  value: string;
  onChangeState: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
};

export function TextAreaForm({ label, value, onChangeState, placeholder, maxLength }: TextAreaFormProps) {
  const { theme, space, font, fontSize } = useTheme();

  return (
    <View style={{ gap: space[2] }}>
      <P style={{ color: theme.textPrimary, fontSize: fontSize.md, fontFamily: font.baseMedium }}>{label}</P>
      <TextInput
        multiline
        numberOfLines={4}
        value={value}
        onChangeText={onChangeState}
        placeholder={placeholder}
        placeholderTextColor={theme.secondaryColor}
        maxLength={maxLength}
        style={{
          backgroundColor: theme.opacityBase,
          borderWidth: 1,
          borderColor: theme.borderBase,
          borderRadius: 8,
          padding: space[3],
          color: theme.textPrimary,
          fontFamily: font.base,
          textAlignVertical: "top",
          minHeight: 100,
        }}
      />
    </View>
  );
}
