import { formatCurrency } from "../../../utils/currencyFormatter/formatCurrency";
import { statusTranslation } from "./TraducaoDoStatus";
import type { OrderResponseDTO } from "../../../@types/order/order.dto";
import { createColumnHelper } from "@tanstack/react-table";
import type { appTableFeatures } from "../../../utils/tableFeatures";
import { Text } from "react-native";
import { useTheme } from "@/src/contexts/ThemeContext";
import { P } from "@/src/components/common/Generic/Text";

const columnHelper = createColumnHelper<typeof appTableFeatures, OrderResponseDTO>();

export function useMyOrdersTable() {
  const { space, radius, theme } = useTheme();

  const statusColorMap: Record<string, { bg: string; text: string }> = {
      approved: { bg: "rgba(0, 204, 106, 0.15)", text: theme.success },
      pending: { bg: "rgba(43, 127, 255, 0.15)", text: theme.blueCta },
      canceled: { bg: "rgba(255, 58, 45, 0.15)", text: theme.danger },
  };

  const OrderColumns = columnHelper.columns([
    columnHelper.accessor("order_date", {
      header: "Data",
      cell: (info) => <P>{new Date(info.getValue()).toLocaleDateString('pt-BR')}</P>
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue().toLowerCase(); // normaliza uma vez só, usa pros dois (label e cor)
        const label = statusTranslation[status] ?? status;
        const colors = statusColorMap[status] ?? { bg: theme.baseSoft, text: theme.textPrimary };

        return(
          <Text style={{
            paddingHorizontal: space[3],
            paddingVertical: space[1],
            borderRadius: radius.circle,
            backgroundColor: colors.bg,
            color: colors.text,
            alignSelf: "flex-start",
          }}>
            {label.toUpperCase()}
          </Text>
        )
      }
    }),
    columnHelper.accessor("total", {
      header: "Total",
      cell: (info) => <P>{formatCurrency(info.getValue())}</P>,
    })
  ])


  return { OrderColumns };
}
