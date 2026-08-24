import { api } from "../api";


export async function fetchMyOrders() {
    const response = await api.get('/api/orders/my-orders');
    return response.data;
}

export async function fetchUserLibrary(){
    const response = await api.get('/api/orders/my-library');
    return response.data;
}