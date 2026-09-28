import { Button } from "../../../components/common/Generic/Button/Button";
import { GameForm } from "./sections/GameForm";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { GradientBackground } from "@/src/components/common/Generic/GradientBackground";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import { H1 } from "@/src/components/common/Generic/Text";
import { Card } from "@/src/components/common/Generic/Card/Card";
import { ArrowLeftIcon } from "phosphor-react-native";

export default function GameCreatorPage() {
  const { theme, space } = useTheme();
  const router = useRouter();
    return(
      <GradientBackground>
        <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
          <ScrollView contentContainerStyle={{ padding: space[5] }}>
            <Card variant="solid" style={{ alignItems: "stretch", gap: space[6], padding: space[6] }}>
              <View style={{ alignItems: "center", gap: space[3] }}>
                <Button variant="primary" onPress={() => router.back()} style={{ alignSelf: "flex-start", padding: space[2], borderRadius: 12 }}>
                  <ArrowLeftIcon size={24} color={theme.textPrimary} weight="thin" />
                </Button>
                <H1>Criar Jogo:</H1>
              </View>
              <GameForm mode="create" />
            </Card>
          </ScrollView>
        </SafeAreaView>
      </GradientBackground>
    )
}
