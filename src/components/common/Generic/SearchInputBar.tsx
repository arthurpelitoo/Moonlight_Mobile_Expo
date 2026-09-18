import { View, Pressable } from "react-native";
import { MagnifyingGlassIcon } from "phosphor-react-native";
import { InputBar } from "./InputBar";
import { useTheme } from "@/src/contexts/ThemeContext";

type SearchInputBarProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  onSearch?: (value: string) => void;
};

export function SearchInputBar({
  placeholder = "Pesquisar algum jogo...",
  value = "",
  onChangeText,
  onSearch,
}: SearchInputBarProps) {
  const { theme, radius } = useTheme();

  function handleSearch() {
    const valueTrimmed = value.trim();
    onSearch?.(valueTrimmed);
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: theme.borderBase,
        borderRadius: radius.md,
        backgroundColor: theme.base,
        overflow: "hidden",
        width: "100%",
      }}
    >
      <InputBar
        variant="secondary"
        style={{
          flex: 1,
          borderWidth: 0,
          backgroundColor: "transparent",
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      <Pressable
        onPress={handleSearch}
        style={({ pressed }) => ({
          width: 48,
          height: 48,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: pressed ? theme.blueCta : "transparent",
        })}
      >
        <MagnifyingGlassIcon size={22} color={theme.textPrimary} weight="thin" />
      </Pressable>
    </View>
  );
}
