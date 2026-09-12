import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export function usePulse(minOpacity = 0.5, cycleDuration = 1000) {
  const pulseValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, { toValue: minOpacity, duration: cycleDuration, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulseValue, { toValue: 1, duration: cycleDuration, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return pulseValue;
}
