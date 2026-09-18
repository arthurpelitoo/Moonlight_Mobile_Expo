import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GradientBackground } from "@/src/components/common/Generic/GradientBackground";
import { Card } from "@/src/components/common/Generic/Card/Card";
import { H2 } from "@/src/components/common/Generic/Text";
import { useTheme } from "@/src/contexts/ThemeContext";
import { UserDataTable } from "./sections/UserDataTable";

export default function UserDashboardPage() {
  const { space } = useTheme();

  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1 }} edges={["right", "left"]}>
        <ScrollView contentContainerStyle={{ padding: space[5], gap: space[6], alignItems: "center" }}>
          <Card variant="solid"><H2>Tabela de Usuários</H2></Card>
          <UserDataTable/>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}
