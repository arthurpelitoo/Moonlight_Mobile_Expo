import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function useGlow(cycleDuration: number = 1000) {
  const glowOpacity = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowOpacity, { toValue: 0.66, duration: cycleDuration, useNativeDriver: true }),
        Animated.timing(glowOpacity, { toValue: 0.2, duration: cycleDuration, useNativeDriver: true })
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return glowOpacity;
}
