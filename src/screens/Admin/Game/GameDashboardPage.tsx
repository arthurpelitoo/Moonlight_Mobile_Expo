import { Card } from "@/src/components/common/Generic/Card/Card";
import { GradientBackground } from "@/src/components/common/Generic/GradientBackground";
import { H2 } from "@/src/components/common/Generic/Text";
import { useTheme } from "@/src/contexts/ThemeContext";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameDataTable } from "./sections/GameDataTable";

export default function GameDashboardPage(){
  const { space } = useTheme();

  return(
    <GradientBackground>
      <SafeAreaView style={{ flex: 1 }} edges={["right", "left"]}>
        <ScrollView contentContainerStyle={{ padding: space[5], gap: space[6], alignItems: "center" }}>
          <Card variant="solid"><H2>Tabela de Jogos</H2></Card>
          <GameDataTable/>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  )
}
