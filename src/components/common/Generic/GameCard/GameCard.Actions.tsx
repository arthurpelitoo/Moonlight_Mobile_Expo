import { useGlow } from "@/src/hooks/animation/useGlow";
import { Button } from "../Button/Button";
import type { GameCardProps } from "./GameCard.types";
import { Animated, Linking, View } from "react-native";
import { useTheme } from "@/src/contexts/ThemeContext";
import { ShoppingCartIcon, TrashSimpleIcon } from "phosphor-react-native";

export const RenderDefaultActions = (props: GameCardProps) => {
  const { radius, theme, space } = useTheme();
  const glowOpacity = useGlow()
  const {isAlreadyInCart, isOwned, gamePage, onCart, onBuy, game} = props;
  const showBuyButton = gamePage;
  const showCartButton = gamePage;

  if (isOwned) {
    return (
      <View>
        <Animated.View
          style={{
            position: "absolute",
            inset: -2,
            borderRadius: radius.md,
            backgroundColor: theme.blueCta,
            opacity: glowOpacity,
          }}
        />
        <Button variant="cta" style={{padding: space[2], width: "100%"}} onPress={() => game.link && Linking.openURL(game.link)}>
          Baixar
        </Button>
      </View>
    );
  }

  if(showBuyButton && props.game.price == 0){
    return(
      <>
        <View>
          <Animated.View
            style={{
              position: "absolute",
              inset: -2,
              borderRadius: radius.md,
              backgroundColor: theme.blueCta,
              opacity: glowOpacity,
            }}
          />
          <Button variant="cta" style={{padding: space[2], width: "100%"}} onPress={() => onBuy()}>
            Obter
          </Button>
        </View>
        <Button
          variant={isAlreadyInCart ? "danger" : "primary"}
          style={{padding: space[3], flexGrow: 0}}
          onPress={() =>
            onCart()
          }
        >
          {isAlreadyInCart ? <TrashSimpleIcon size={24} /> : <ShoppingCartIcon size={24}/>}
        </Button>
    </>
    )
  }

  return(
        <>

          {showBuyButton && (
            <View>
              <Animated.View
                style={{
                  position: "absolute",
                  inset: -2,
                  borderRadius: radius.md,
                  backgroundColor: theme.blueCta,
                  opacity: glowOpacity,
                }}
              />
              <Button variant="cta" style={{padding: space[1], width: "100%"}} onPress={() => onBuy()}>
                Comprar
              </Button>
            </View>
          )}


          {showCartButton && (
            <Button
              variant={isAlreadyInCart ? "danger" : "primary"}
              style={{padding: space[2], flexGrow: 0}}
              onPress={() => {
                onCart();
              }}
            >
              {isAlreadyInCart ? <TrashSimpleIcon size={24} /> : <ShoppingCartIcon size={24}/>}
            </Button>
          )}

        </>
  );
}
