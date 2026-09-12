import { useRef } from "react";
import { Animated, Image, Pressable, PressableProps, View } from "react-native";
import type { CategoryResponseDTO } from "@/src/@types/category/category.dto";
import { Card } from "../Card/Card";
import { P } from "../Text";
import { resolveImageUrl } from "@/src/utils/resolveImage/resolveImageUrl";

type CategoryCardProps = {
  category: CategoryResponseDTO;
} & Pick<PressableProps, "onPress">;

export function CategoryCard({ category, onPress }: CategoryCardProps) {
  const pressAnim = useRef(new Animated.Value(0)).current;

  function animateTo(value: number) {
    Animated.timing(pressAnim, {
      toValue: value,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  const scale = pressAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.05] });
  const translateY = pressAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -4] });

  return (
    <Pressable onPress={onPress} onPressIn={() => animateTo(1)} onPressOut={() => animateTo(0)}>
      <Card variant="container" style={{ width: "100%", position: "relative", overflow: "hidden" }}>
        <Animated.View style={{ transform: [{ scale }, { translateY }], width: "100%" }}>
          <Image
            source={{ uri: resolveImageUrl(category.image) }}
            resizeMode="contain"
            style={{ height: 256, width: "100%", borderRadius: 8 }}
          />

          <View style={{ position: "absolute", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
            <P style={{ backgroundColor: "rgba(17,24,39,0.8)", fontWeight: "bold", fontSize: 20, borderRadius: 8, padding: 8 }}>
              {category.name}
            </P>
          </View>
        </Animated.View>
      </Card>
    </Pressable>
  );
}
