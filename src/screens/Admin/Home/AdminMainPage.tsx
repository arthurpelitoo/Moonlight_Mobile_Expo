 import { GradientBackground } from "@/src/components/common/Generic/GradientBackground";
import { useAuth } from "../../../hooks/auth/useAuth";
 import { DASHBOARDS } from "./sections/dashboards";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import { Card } from "@/src/components/common/Generic/Card/Card";
import { H1, H2 } from "@/src/components/common/Generic/Text";
import WebView from "react-native-webview";
import { useTheme } from "@/src/contexts/ThemeContext";

export default function AdminMainPage() {

     function getGreeting(): string {
         const hour = new Date().getHours();
         if (hour >= 5 && hour < 12) return "manhã";
         if (hour >= 12 && hour < 18) return "tarde";
         return "noite";
     }

  const { user } = useAuth();
  const { space } = useTheme();

    return(
      <GradientBackground>
        <SafeAreaView style={{ flex: 1 }} edges={["right", "left"]}>
          <ScrollView contentContainerStyle={{ padding: space[5], gap: space[8] }}>
            <Card variant="solid" style={{ alignSelf: "center" }}>
              <H2 style={{ textAlign: "center" }}>
                Olá {user?.name}, como vai nessa {getGreeting()}?
              </H2>
            </Card>

            {DASHBOARDS.map((dashboard) => (
              <View key={dashboard.src} style={{ gap: space[3] }}>
                <H2 style={{ textAlign: "center" }}>{dashboard.title}</H2>
                <View style={{ height: 500, borderRadius: 12, overflow: "hidden" }}>
                  <WebView source={{ uri: dashboard.src }} />
                </View>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </GradientBackground>
    )
}
