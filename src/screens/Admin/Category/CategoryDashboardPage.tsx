// import { CategoryDataTable } from "./sections/CategoryDataTable";

import { Card } from "@/src/components/common/Generic/Card/Card";
import { GradientBackground } from "@/src/components/common/Generic/GradientBackground";
import { H2 } from "@/src/components/common/Generic/Text";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryDataTable } from "./sections/CategoryDataTable";
import { useTheme } from "@/src/contexts/ThemeContext";

export default function CategoryDashboardPage(){
    const { space } = useTheme();

    return(
        <GradientBackground>
          <SafeAreaView style={{ flex: 1 }} edges={["right", "left"]}>
            <ScrollView contentContainerStyle={{ padding: space[5], gap: space[6], alignItems: "center" }}>
              <Card variant="solid"><H2>Tabela de Categorias</H2></Card>
              <CategoryDataTable/>
            </ScrollView>
          </SafeAreaView>
        </GradientBackground>
    )
}
