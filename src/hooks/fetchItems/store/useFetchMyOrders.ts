// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { fetchMyOrders } from "../../../services/realServices/order.service";
// import type { OrderResponseDTO } from "../../../@types/order/order.dto";

// export function useFetchMyOrders(){
//     const [orders, setOrders] = useState<OrderResponseDTO[]>([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         let isMounted = true;

//         // eslint-disable-next-line react-hooks/exhaustive-deps
//         setIsLoading(true)
//         fetchMyOrders()
//         .then(response => {
//             if(isMounted){
//                 setOrders(response || []);
//                 setIsLoading(false);
//             }

//         }).catch((error) => {
//             console.error(error);
//             toast.error("Não foi possivel carregar os Pedidos.")
//         }).finally(() => {
//             if(isMounted) setIsLoading(false)
//         });
//         return () => { isMounted = false; };
//     }, []);

//     return { orders, isLoading }
// }
