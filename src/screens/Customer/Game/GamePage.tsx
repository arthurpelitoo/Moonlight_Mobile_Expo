import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { GradientBackground } from "@/src/components/common/Generic/GradientBackground";
import { GameDetail } from "./sections/GameDetail";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GameScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const id_game = Number(id);

  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <GameDetail id_game={id_game} />
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}
