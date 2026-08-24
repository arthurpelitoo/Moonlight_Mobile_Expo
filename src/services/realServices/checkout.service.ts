
import type { CheckoutQueryPayload } from "../../@types/checkout/checkout.payload";
import { api } from "../api";


export async function createCheckoutPreference(payload: CheckoutQueryPayload) {
    const response = await api.post('/api/checkout', payload);
    return response.data; // { preference_id }
}
