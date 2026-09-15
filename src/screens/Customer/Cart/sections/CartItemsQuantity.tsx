import { Button } from "@/src/components/common/Generic/Button/Button"
import { Card } from "@/src/components/common/Generic/Card/Card"
import { CardContent } from "@/src/components/common/Generic/Card/CardContent"
import { CardHeader } from "@/src/components/common/Generic/Card/CardHeader"
import { H1, H2, H3} from "@/src/components/common/Generic/Text"
import { useTheme } from "@/src/contexts/ThemeContext"
import { useGlow } from "@/src/hooks/animation/useGlow"
import { Link } from "expo-router"
import { ShoppingCartIcon } from "phosphor-react-native"
import { Animated, View } from "react-native"

type CartItemsQuantityProps = {
    quantity: number
}

export function CartItemsQuantity({ quantity }: CartItemsQuantityProps) {
  const glowOpacity = useGlow();
  const { theme, space, radius } = useTheme();

    if(quantity > 0){
        return(
            <Card style={{gap: space[6], borderColor: theme.borderBase, padding: space[5]}}>
                <CardHeader><H2 style={{textAlign: "center"}}>Seu Carrinho</H2></CardHeader>
                <CardContent style={{ justifyContent: "center"}}>
                  <H3>
                    Tem {quantity} {quantity > 1 ? "itens" : "item"}
                  </H3>
                </CardContent>
            </Card>
        )
    } else{
        return(
            <Card style={{gap: space[7], borderColor: theme.borderBase, padding: space[9]}}>
                <CardHeader><H1 style={{textAlign: "center"}}>Seu carrinho está vazio.</H1></CardHeader>
                <CardContent style={{ justifyContent: "center"}}>
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
                      <Link href={`/home`} asChild>
                        <Button variant="cta" style={{padding: space[2], gap: space[1], alignItems: "center"}}>
                          <ShoppingCartIcon size={28}/> Ver jogos
                        </Button>
                      </Link>
                    </View>
                </CardContent>

            </Card>
        )
    }
}
