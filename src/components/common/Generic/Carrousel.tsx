import React, { ReactNode, useRef, useState } from "react"
/*import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"*/
import { Button } from "./Button/Button"
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from "react-native"
import { CaretLeftIcon, CaretRightIcon } from "phosphor-react-native"
import { useTheme } from "@/src/contexts/ThemeContext"


type CarrouselProps = {
  children?: ReactNode
  cardsPerView?: number
  containerWidth: number;
}

const GAP = 16;

export function Carrousel({ children, cardsPerView = 3, containerWidth }: CarrouselProps) {
  const { theme, radius } = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const offsetX = useRef(0);
  const [buttonWidth, setButtonWidth] = useState(0);
  const itemWidth = buttonWidth > 0
    ? (containerWidth - buttonWidth * 2 - (cardsPerView - 1) * GAP) / cardsPerView
    : 0; // 0 só no primeiro frame, até o botão reportar sua largura real

  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
      offsetX.current = e.nativeEvent.contentOffset.x;
    }

  function scrollLeft() {
    scrollRef.current?.scrollTo({
      x: Math.max(0, offsetX.current - (itemWidth + GAP)),
      animated: true,
    });
  }

  function scrollRight() {
    scrollRef.current?.scrollTo({
      x: offsetX.current + (itemWidth + GAP),
      animated: true,
    });
  }

  return (
    <View style={{ position: "relative", flexDirection: "row", width: "100%"}}>

        {/* botão esquerda */}
        <Button
            onLayout={(e) => setButtonWidth(e.nativeEvent.layout.width)}
            onPress={scrollLeft}
            icon={<CaretLeftIcon size={24} weight="regular" color={theme.iconBase} />}
            variant="secondary"
            style={{ borderRadius: radius.circle, flex: 0, alignSelf: "center" }}
        />

        {/* conteúdo */}
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          decelerationRate={"fast"}
          snapToInterval={itemWidth + GAP}
          snapToAlignment="start"
          contentContainerStyle={{gap: GAP}}
          style={{ flex: 1 }}
        >
            {React.Children.map(children, (child) => (
                <View
                  style={{ width: itemWidth }}
                >
                    {child}
                </View>
            ))}
        </ScrollView>

        {/* botão direita */}
        <Button
            onPress={scrollRight}
            icon={<CaretRightIcon size={24} weight="regular" color={theme.iconBase} />}
            variant="secondary"
            style={{ borderRadius: radius.circle, flex: 0, alignSelf: "center" }}
        />
    </View>
  );
}
