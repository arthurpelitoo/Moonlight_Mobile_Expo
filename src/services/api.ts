import axios from "axios";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { logoutFn } from "../utils/authBridge/logout";
import AsyncStorage from "@react-native-async-storage/async-storage";
let redirecting = false;

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 5000,
  headers: {"Content-Type": "application/json"}
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;

      if ((status === 401 || status === 403) && !redirecting) {
        redirecting = true;
        logoutFn?.();
        Toast.show({ type: "error", text1: "Sessão expirada. Faça login novamente."});
        // router.replace("/login");
      }

      const message = error.response?.data?.message || "Erro inesperado.";
      return Promise.reject(new Error(message));
    }
);
