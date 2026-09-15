import type {ComponentPropsWithoutRef, ReactNode} from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type CardContentProps = {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>;
}

export function CardContent(props: CardContentProps) {
  const { children, style } = props;
  return (
    <View style={[style]}>
      {children}
    </View>
  )
}
