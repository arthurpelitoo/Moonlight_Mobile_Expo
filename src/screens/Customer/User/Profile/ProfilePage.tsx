import { GradientBackground } from "@/src/components/common/Generic/GradientBackground";
import { EditForm } from "./sections/EditForm";
import { ProfileData } from "./sections/ProfileData";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/src/components/common/Generic/Card/Card";
import { CardHeader } from "@/src/components/common/Generic/Card/CardHeader";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useFadeIn } from "@/src/hooks/animation/useFadeIn";
import { H1 } from "@/src/components/common/Generic/Text";
import { Animated, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Button } from "@/src/components/common/Generic/Button/Button";
import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "phosphor-react-native";


export default function ProfilePage() {
  const { space, theme } = useTheme();
  const fadeIn = useFadeIn();
  const router = useRouter();

  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, paddingVertical: 25}}>
            <Animated.View style={{paddingHorizontal: space[8], position: "relative", width: "100%", gap: space[8], opacity: fadeIn.opacity, transform: fadeIn.transform }}>
              <Button variant="primary" onPress={() => router.back()} style={{ alignSelf: "flex-start", padding: space[2], borderRadius: 12 }}>
                <ArrowLeftIcon size={24} color={theme.textPrimary} weight="thin" /> Voltar
              </Button>
              <ProfileData />
              <Card variant={"solid"} style={{ gap: space[8], padding: space[7] }}>
                <CardHeader>
                  <H1>Editar Usuario:</H1>
                </CardHeader>
                <EditForm/>
              </Card>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GradientBackground>
  )
}
