import { useEffect, useRef, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { useCart } from "../cart/useCart";
import { createCheckoutPreference } from "../../services/realServices/checkout.service";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import type { CheckoutQueryPayload } from "../../@types/checkout/checkout.payload";

export function useCheckout(){
    const { items, totalPrice } = useCart();
    const { user } = useAuth();
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const hasFetched = useRef(false);

    useEffect(() => {

        if (hasFetched.current) return;
        if (!items.length){
            // router.replace("/cart");
            Toast.show({ type: "error", text1: "Você não possui itens no carrinho."})
            return;
        }
        hasFetched.current = true;

        const query: CheckoutQueryPayload = { items, total: Number(totalPrice), user: user! };

        createCheckoutPreference(query)
            .then(({ preference_id }) => setPreferenceId(preference_id))
            .catch((error) => {
                hasFetched.current = false; // Se der erro, permite tentar de novo
                const apiError = error.response?.data?.message;
                Toast.show({ type: "error", text1: apiError || "Erro ao processar seu pedido."})
            })
            .finally(() => setIsLoading(false));

    }, []);

    return { preferenceId, isLoading }
}
