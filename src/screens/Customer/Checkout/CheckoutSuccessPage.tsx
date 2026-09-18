import { useEffect } from "react";
import { Animated, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { GradientBackground } from "@/src/components/common/Generic/GradientBackground";
import { Card } from "@/src/components/common/Generic/Card/Card";
import { CardHeader } from "@/src/components/common/Generic/Card/CardHeader";
import { CardContent } from "@/src/components/common/Generic/Card/CardContent";
import { H1, P } from "@/src/components/common/Generic/Text";
import { Button } from "@/src/components/common/Generic/Button/Button";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useFadeIn } from "@/src/hooks/animation/useFadeIn";
import { useCart } from "@/src/hooks/cart/useCart";

export default function CheckoutSuccessPage() {
  const { space, font } = useTheme();
  const fadeIn = useFadeIn();
  const router = useRouter();
  const { clearUpCart } = useCart();

  useEffect(() => {
    clearUpCart();
  }, []);

  return (
    <GradientBackground style={{ justifyContent: "center", alignItems: "center" }}>
      <SafeAreaView style={{ flex: 1, width: "100%" }} edges={["left", "right"]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
          <Animated.View style={{ opacity: fadeIn.opacity, transform: fadeIn.transform, paddingHorizontal: space[5] }}>
            <Card variant="primary" style={{ padding: space[6] }}>
              <CardHeader>
                <H1 style={{ textAlign: "center", fontFamily: font.baseSemibold }}>🥳 Compra Aprovada!</H1>
              </CardHeader>
              <CardContent style={{ gap: space[5] }}>
                <P style={{ textAlign: "center" }}>Seus jogos já estão disponíveis na sua biblioteca.</P>
                <Button variant="cta" style={{ padding: space[2] }} onPress={() => router.replace("/orders")}>
                  Ver Meus Pedidos
                </Button>
                <Button variant="primary" style={{ padding: space[2] }} onPress={() => router.replace("/")}>
                  Continuar Comprando
                </Button>
              </CardContent>
            </Card>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}
