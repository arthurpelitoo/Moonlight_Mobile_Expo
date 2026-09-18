import { useTheme } from "@/src/contexts/ThemeContext";
import type { OrderResponseDTO } from "../../../../../@types/order/order.dto";
import { formatCurrency } from "../../../../../utils/currencyFormatter/formatCurrency";
import { resolveImageUrl } from "../../../../../utils/resolveImage/resolveImageUrl";
import { Image, View } from "react-native";
import { P } from "@/src/components/common/Generic/Text";

export function ExpandedOrderItems({ order }: { order: OrderResponseDTO }) {
  const { theme, space, font, fontSize } = useTheme();

  return (
    <View
      style={{
        borderLeftWidth: 2,
        borderLeftColor: theme.blueCta, // equivalente ao border-primary do web
        paddingLeft: space[4],
        paddingVertical: space[3],
        gap: space[2],
      }}
    >
      <P style={{
        color: theme.secondaryColor,
        fontSize: fontSize.sm,
        fontFamily: font.baseMedium,
        textTransform: "uppercase",
        letterSpacing: 1,
      }}>
        Itens do Pedido
      </P>

      {/* cabeçalho da "tabela", igual ao <thead> do web */}
      <View style={{
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: theme.borderBase,
        paddingBottom: space[2],
      }}>
        <P style={{ flex: 2, color: theme.textPrimary, fontSize: fontSize.sm }}>Título</P>
        <P style={{ flex: 1, color: theme.textPrimary, fontSize: fontSize.sm }}>Imagem</P>
        <P style={{ flex: 1, color: theme.textPrimary, fontSize: fontSize.sm, textAlign: "right" }}>Preço</P>
      </View>

      {/* corpo da "tabela", igual ao <tbody>: um .map() por item, igual ao web */}
      {order.games?.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: space[2],
            borderBottomWidth: 1,
            borderBottomColor: theme.opacityBase,
          }}
        >
          <P style={{ flex: 2, color: theme.textPrimary, fontSize: fontSize.sm }} numberOfLines={1}>
            {item.title}
          </P>
          <Image
            source={{ uri: resolveImageUrl(item.image) }}
            style={{ flex: 1, height: 45, borderRadius: 4 }}
            resizeMode="cover"
          />
          <P style={{ flex: 1, color: theme.textPrimary, fontSize: fontSize.sm, textAlign: "right" }}>
            {formatCurrency(item.price)}
          </P>
        </View>
      ))}
    </View>
  );
};
