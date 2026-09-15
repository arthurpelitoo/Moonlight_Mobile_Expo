import { CartItemsQuantity } from "./sections/CartItemsQuantity";
import { useCart } from "../../../hooks/cart/useCart";
import { CartData } from "./sections/CartData";
import { useAuth } from "../../../hooks/auth/useAuth";
import { GradientBackground } from "@/src/components/common/Generic/GradientBackground";
import { SafeAreaView } from "react-native-safe-area-context";
import { Animated, ScrollView } from "react-native";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useFadeIn } from "@/src/hooks/animation/useFadeIn";


function CartPage() {
  const fadeIn = useFadeIn(600, true);
  const {space} = useTheme()
  const {items, removeItemFromCart, clearUpCart, totalPrice} = useCart();
  const { isAuthenticated } = useAuth();

  return (
  <GradientBackground>
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Animated.View style={{padding: space[7], position: "relative", width: "100%", gap: space[7], opacity: fadeIn.opacity, transform: fadeIn.transform}}>
          <CartItemsQuantity quantity={items.length}/>
          {items.length > 0 &&
            <CartData
              isAuthenticated={isAuthenticated}
              items={items}
              onRemove={removeItemFromCart}
              onClear={clearUpCart}
              totalPrice={totalPrice}
            />
          }
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  </GradientBackground>
  )
}


export default CartPage;
