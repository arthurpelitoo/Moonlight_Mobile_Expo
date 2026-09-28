import { View, Pressable } from "react-native";
import { P } from "@/src/components/common/Generic/Text";
import { useTheme } from "@/src/contexts/ThemeContext";
import type { ReactNode } from "react";

type SelectOption = { value: string; label: string };

type SelectFormProps = {
  label: string;
  value: string;
  options: SelectOption[];
  onChangeState: (value: string) => void;
  icon?: ReactNode;
};

export function SelectForm({ label, value, options, onChangeState }: SelectFormProps) {
  const { theme, space, radius, font, fontSize } = useTheme();

  return (
    <View style={{ gap: space[2] }}>
      <P style={{ color: theme.textPrimary, fontSize: fontSize.sm, fontFamily: font.baseMedium }}>{label}</P>
      <View style={{ flexDirection: "row", gap: space[2], flexWrap: "wrap" }}>
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => onChangeState(opt.value)}
              style={{
                paddingVertical: space[2],
                paddingHorizontal: space[4],
                borderRadius: radius.md,
                borderWidth: 1,
                borderColor: active ? theme.blueCta : theme.borderBase,
                backgroundColor: active ? theme.blueCta : theme.base,
              }}
            >
              <P style={{ color: active ? "#FFFFFF" : theme.textPrimary, fontFamily: font.base, fontSize: fontSize.sm }}>
                {opt.label}
              </P>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
