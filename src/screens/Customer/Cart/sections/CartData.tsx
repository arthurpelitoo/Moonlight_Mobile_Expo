import { CartItem } from "@/src/@types/common/cartItem";
import { Button } from "@/src/components/common/Generic/Button/Button";
import { P } from "@/src/components/common/Generic/Text";
import { useTheme } from "@/src/contexts/ThemeContext";
import { formatCurrency } from "@/src/utils/currencyFormatter/formatCurrency";
import { resolveImageUrl } from "@/src/utils/resolveImage/resolveImageUrl";
import { Link, useRouter } from "expo-router";
import { TrashIcon } from "phosphor-react-native";
import { Image, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";


// CartData.tsx
type CartDataProps = {
    items: CartItem[];
    onRemove: (id_game: number) => void;
    onClear: () => void;
    totalPrice: number;
    isAuthenticated: boolean;

}

export function CartData({ items, onRemove, onClear, totalPrice, isAuthenticated }: CartDataProps) {
    const {space, theme, radius} = useTheme()
    const router = useRouter();

    function handleCheckout() {
        if (!isAuthenticated) {
            Toast.show({ type: "info", text1: "Faça login para finalizar a compra."});
            router.push("/login");
            return;
        }
    }

  return (
    <View style={{gap: space[2]}}>
      {items.map(item => (
        <View key={item.id_game} style={{ backgroundColor: theme.opacityBase, flexDirection: "row", gap: space[2], alignItems: "center", borderColor: theme.borderBase, borderWidth: 1, borderRadius: radius.xl, padding: space[2]}}>
          <Image source={{ uri: resolveImageUrl(item.image) }} style={{width: 96, height: 64, borderRadius: radius.lg, flexShrink: 0}} resizeMode="contain" />
          <View style={{flex: 1, minWidth: 0}}>
            <P numberOfLines={1} ellipsizeMode="tail">{item.title}</P>
            <P numberOfLines={1} ellipsizeMode="tail" style={{ color: theme.secondaryColor, fontSize: 12 }}>{item.categories?.join(", ")}</P>
          </View>
          <View style={{ alignItems: "center", flexDirection: "row", gap: space[4] }}>
            <P style={{ fontWeight: "500" }}>
              {item.price === 0 ? "Grátis" : `${formatCurrency(item.price)}`}
            </P>
            <Button variant="danger" style={{padding: space[2]}} onPress={() => onRemove(item.id_game)}>
              <TrashIcon size={18} color={theme.textPrimary} />
            </Button>
          </View>
        </View>
      ))}

      <View style={{ gap: space[6], justifyContent: "space-between", borderTopWidth: 1, borderTopColor: theme.borderBase, paddingTop: space[4], marginTop: space[2]}}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: space[6], justifyContent: "space-between" }}>
          {isAuthenticated
              ? <Link href={`/(customer)/(protected)/checkout`} asChild>
                  <Button variant="cta" style={{padding: space[2]}}>
                    Finalizar compra
                  </Button>
                </Link>
              : <Button variant="cta" onPress={handleCheckout} style={{padding: space[2]}}>
                  Finalizar compra
                </Button>
          }
          <View style={{ alignItems: "flex-end" }}>
            <P style={{ color: theme.secondaryColor, fontSize: 12 }}>Total</P>
            <P style={{ fontSize: 18, fontWeight: "500" }}>{totalPrice === 0 ? 'Gratuito' : `${formatCurrency(totalPrice)}`}</P>
          </View>
        </View>
        <View>
          <Button variant="danger" style={{padding: space[2]}} onPress={onClear}>
            Limpar carrinho
          </Button>
        </View>
      </View>
    </View>
  );
}
