import { Animated, View } from "react-native";
import { Card } from "../Card/Card";
import { P } from "../Text";
import { usePulse } from "@/src/hooks/animation/usePulse";

export function CategoryCardSkeleton() {
  const pulseValue = usePulse();

  return (
    <Card variant="primary" style={{ height: 256, width: "100%", position: "relative", overflow: "hidden" }}>
      <Animated.View style={{ opacity: pulseValue, backgroundColor: "#4B5568", height: "100%", width: "100%", borderRadius: 8 }} />
      <View style={{ position: "absolute", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
        <P style={{ backgroundColor: "rgba(17,24,39,0.6)", fontWeight: "bold", fontSize: 20, borderRadius: 8, padding: 8 }}>
          ...
        </P>
      </View>
    </Card>
  );
}
