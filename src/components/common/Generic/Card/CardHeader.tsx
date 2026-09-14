import type { ComponentPropsWithoutRef } from "react"
import { StyleProp, View, ViewStyle } from "react-native";

type CardHeaderProps = {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>;
}

export function CardHeader(props: CardHeaderProps) {
  const { children, style } = props;

  return (
    <View style={[style]}>
      {children}
    </View>
  )
}
