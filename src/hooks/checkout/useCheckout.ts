// import { useEffect, useRef, useState } from "react";
// import { useAuth } from "../auth/useAuth";
// import { useCart } from "../cart/useCart";
// import { createCheckoutPreference } from "../../services/realServices/checkout.service";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import type { CheckoutQueryPayload } from "../../@types/checkout/checkout.payload";

// export function useCheckout(){
//     const navigate = useNavigate()
//     const { items, totalPrice } = useCart();
//     const { user } = useAuth();
//     const [preferenceId, setPreferenceId] = useState<string | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const hasFetched = useRef(false);

//     useEffect(() => {

//         if (hasFetched.current) return;
//         if (!items.length){
//             navigate("/cart");
//             toast.error("Você não possui itens no carrinho.");
//             return;
//         }
//         hasFetched.current = true;

//         const query: CheckoutQueryPayload = { items, total: Number(totalPrice), user: user! };

//         createCheckoutPreference(query)
//             .then(({ preference_id }) => setPreferenceId(preference_id))
//             .catch((error) => {
//                 hasFetched.current = false; // Se der erro, permite tentar de novo
//                 const apiError = error.response?.data?.message;
//                 toast.error(apiError || "Erro ao processar seu pedido.");
//             })
//             .finally(() => setIsLoading(false));

//     }, []);

//     return { preferenceId, isLoading }
// }
