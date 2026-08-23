// import type { TableColumn } from "react-data-table-component";
// import { formatCurrency } from "../../../utils/currencyFormatter/formatCurrency";
// import { statusTranslation } from "./TraducaoDoStatus";
// import type { OrderResponseDTO } from "../../../@types/order/order.dto";


// export const OrderColumns: TableColumn<OrderResponseDTO>[] = [
//     {
//         name: "Data",
//         selector: (row: OrderResponseDTO) => new Date(row.order_date).toLocaleDateString('pt-BR'),
//         sortable: true,
//     },
//     {
//         name: "Status",
//         cell: (row: OrderResponseDTO) => {
//             const label = statusTranslation[row.status.toLowerCase()] || row.status;
//             return(
//                 <span className={`px-2 py-1 rounded-full text-xs ${
//                     row.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'
//                 }`}>
//                     {label.toUpperCase()}
//                 </span>
//             )
//         },
//     },
//     {
//         name: "Total",
//         selector: (row: OrderResponseDTO) => `${formatCurrency(row.total)}`,
//     }
// ];
