// app/(customer)/categories/[id].tsx
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { H1 } from "@/src/components/common/Generic/Text";

export default function CategoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <H1>Categoria {id}</H1>
    </View>
  );
}
