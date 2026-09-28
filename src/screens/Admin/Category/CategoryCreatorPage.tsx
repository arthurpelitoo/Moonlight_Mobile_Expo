// import { ArrowLeftIcon } from "@phosphor-icons/react";
// import { Card, CardHeader } from "../../../components/common/Generic/Card";
// import { Button } from "../../../components/common/Generic/Button/Button";
// import { CategoryForm } from "./sections/CategoryForm";

import { Button } from "@/src/components/common/Generic/Button/Button";
import { Card } from "@/src/components/common/Generic/Card/Card";
import { GradientBackground } from "@/src/components/common/Generic/GradientBackground";
import { H1 } from "@/src/components/common/Generic/Text";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryForm } from "./sections/CategoryForm";

export default function CategoryCreatorPage() {
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
                <H1>Criar Categoria:</H1>
              </View>
              <CategoryForm mode="create" />
            </Card>
          </ScrollView>
        </SafeAreaView>
      </GradientBackground>
    )
}
